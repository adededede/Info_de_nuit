import { g_ctx } from "./global_context.js";
import { Point, Line, Circle, Label, Polygon, Rectangle, Button, Square, Triangle, TileWithSections, Player } from "./game_objects.js";

const eps = 0.0000001;

function point_circle(obj1, obj2){
    let distX = obj1.x - obj2.x;
    let distY = obj1.y - obj2.y;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
    if (distance <= obj2.r) {
        return true;
    }
    return false;
}

function point_line(obj1, obj2){
    let lineLen = Math.hypot(obj2.x2 - obj2.x, obj2.y2 - obj2.y)

    let d1 = Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y)
    let d2 = Math.hypot(obj1.x - obj2.x2, obj1.y - obj2.y2)

    let buffer = 0.1;

    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
    }
    return false;
}

function line_circle(obj1, obj2){
    let inside1 = point_circle(new Point(obj1.p1.x, obj1.p1.y), obj2)
    let inside2 = point_circle(new Point(obj1.p2.x, obj1.p2.y), obj2)

    if (inside1 || inside2) return true

    let distX = obj1.x - obj1.x1
    let distY = obj1.y - obj1.y1
    let len = Math.sqrt( (distX*distX) + (distY*distY) )

    let dot = ( ((obj2.x-obj1.x)*(obj1.x1-obj1.x)) + ((obj2.y-obj1.y)*(obj1.y1-obj1.y)) ) / Math.pow(len,2)

    let closestX = obj1.x + (dot * (obj1.x1-obj1.x))
    let closestY = obj1.y + (dot * (obj1.y1-obj1.y))

    let onSegment = point_line(new Point(closestX, closestY), obj1)

    if (!onSegment) return false

    distX = closestX - obj2.x;
    distY = closestY - obj2.y;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
        return true;
    }
    return false;
}

function line_line(obj1, obj2){
    let output = null
    output = segment_intersection(obj1.p1.x, obj1.p1.y, obj1.p2.x, obj1.p2.y, obj2.p1.x, obj2.p1.y, obj2.p2.x, obj2.p2.y) 
    return output
}

const between = (a, b, c) => a - eps <= b && b <= c + eps;
const segment_intersection = (x1, y1, x2,y2, x3, y3, x4, y4) => {
    var x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
            ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

    var y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
            ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

    if(
        (isNaN(x) || isNaN(y)) ||
        (x1>=x2 && !between(x2, x, x1) || !between(x1, x, x2)) ||
        (y1>=y2 && !between(y2, y, y1) || !between(y1, y, y2)) ||
        (x3>=x4 && !between(x4, x, x3) || !between(x3, x, x4)) ||
        (y3>=y4 && !between(y4, y, y3) || !between(y3, y, y4))
    ) {
        return false;
    }

    return new Point(x,y);

};

function line_line_intersection_point(obj1, obj2){
    return segment_intersection(obj1.p1.x, obj1.p1.y, obj1.p2.x, obj1.p2.y, obj2.p1.x, obj2.p1.y, obj2.p2.x, obj2.p2.y)
}

function line_rectangle(obj1, obj2){
    let left   = line_line(new Line(new Point(obj1.p1.x, obj1.p1.y),        new Point(obj1.p2.x, obj1.p2.y)),
                           new Line(new Point(obj2.x, obj2.y),        new Point(obj2.x, obj2.y+obj2.h)));
    let right  = line_line(new Line(new Point(obj1.p1.x, obj1.p1.y),        new Point(obj1.p2.x, obj1.p2.y)),
                           new Line(new Point(obj2.x+obj2.w, obj2.y), new Point(obj2.x+obj2.w, obj2.y+obj2.h)));
    let top    = line_line(new Line(new Point(obj1.p1.x, obj1.p1.y),        new Point(obj1.p2.x, obj1.p2.y)),
                           new Line(new Point(obj2.x, obj2.y),        new Point(obj2.x+obj2.w, obj2.y)));
    let bottom = line_line(new Line(new Point(obj1.p1.x, obj1.p1.y),        new Point(obj1.p2.x, obj1.p2.y)),
                           new Line(new Point(obj2.x, obj2.y+obj2.h), new Point(obj2.x+obj2.w, obj2.y+obj2.h)));

    if (left || right || top || bottom) {
        return true;
    }
    return false;
}

function rectangle_rectangle(rect1, rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) {       // obj1. bottom edge past obj2. top
          return true;
      }
      return false;
}

function circle_circle(obj1, obj2){
    let distX = obj1.x - obj2.x;
    let distY = obj1.y - obj2.y;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
    if (distance <= obj1.r+obj2.r) {
        return true;
    }
    return false;
}

function polygon_line(vertices, obj){
    
}

function polygon_polygon(vertices1, vertices2){
    // go through each of the vertices, plus the next
    // vertex in the list
    let next = 0;
    for (let current=0; current<vertices1.length; current++) {
        // get next vertex in list
        // if we've hit the end, wrap around to 0
        next = current+1;
        if (next == vertices1.length) next = 0;
        // get the PVectors at our current position
        // this makes our if statement a little cleaner
        let vc = vertices1[current];    // c for "current"
        let vn = vertices1[next];       // n for "next"
        // now we can use these two points (a line) to compare
        // to the other polygon's vertices using polyLine()
        let collision = polygon_line(vertices2, new Line(vc.x,vc.y,vn.x,vn.y));
        if (collision) return true;
        // optional: check if the 2nd polygon is INSIDE the first
        collision = polygon_point(vertices1, new Point(vertices2[0].x, vertices2[0].y));
        if (collision) return true;
    }
    return false;
}

function point_polygon(obj1, obj2) {
    let next = 1
    let cur_line_v1 = null
    let cur_line_v2 = null
    let point_ray_cast = null
    let point_ray_cast2 = null

    let touch_cpt = 0

    point_ray_cast = new Line(new Point(obj1.x, obj1.y - 532),new Point(obj1.x, obj1.y + 532))
    point_ray_cast2 = new Line(new Point(obj1.x - 532, obj1.y ),new Point(obj1.x + 532, obj1.y ))
    //point_ray_cast.draw(global_context.context_background)
    //y check
    for (let i = 0; i < obj2.vertices.length; i++) {
        cur_line_v1 = new Line(new Point(obj2.vertices[i].x,obj2.vertices[i].y), 
                               new Point(obj2.vertices[next].x,obj2.vertices[next].y))
        cur_line_v2 = new Line(new Point(obj2.vertices[next].x,obj2.vertices[next].y), 
                               new Point(obj2.vertices[i].x,obj2.vertices[i].y))

        if (line_line(cur_line_v1, point_ray_cast) || line_line(cur_line_v2, point_ray_cast) 
        || line_line(cur_line_v1, point_ray_cast2) || line_line(cur_line_v2, point_ray_cast2)) touch_cpt++

        next++
        if (next === obj2.vertices.length) next = 0
    }
    if (touch_cpt > 2) return true

    return false
}

function point_rectangle(obj1, obj2){
    if (obj1.x >= obj2.x &&        // right of the left edge AND
        obj1.x <= obj2.x + obj2.w &&   // left of the right edge AND
        obj1.y >= obj2.y &&        // below the top AND
        obj1.y <= obj2.y + obj2.h) {   // above the bottom
          return true;
    }
    return false;
}

const combinations = {
    "Point/Rectangle": 1,
    "Virus/Rectangle": 1,
    "Point/TileWithSections":1,
    "Point/Button": 1,
    "Rectangle/Point": 2,
    "Rectangle/Virus": 2,
    "TileWithSections/Point":2, 
    "Button/Point": 2,
    
    "Line/Line": 10,

    "Line/Rectangle": 3,
    "Rectangle/Line": 4,

    "Polygon/Point": 5,
    "Point/Polygon":6,

    "Line/Circle": 7,
    "Circle/Line": 8,
}

function intersect(obj1, obj2) {
    //console.log((obj1.constructor.name + "/" + obj2.constructor.name));
    switch (combinations[(obj1.constructor.name + "/" + obj2.constructor.name)]) {
        case 1 :
            return point_rectangle(obj1, obj2)
        case 2 :
            return point_rectangle(obj2, obj1)
        case 3 :
            return line_rectangle(obj1, obj2)
        case 4 :
            return line_rectangle(obj2, obj1)
        case 5 :
            return point_polygon(obj2, obj1)
        case 6 :
            return point_polygon(obj1, obj2)
        case 7 :
            return line_circle(obj1, obj2)
        case 8 :
            return line_circle(obj2, obj1)
        case 9 :
            return 
        case 10 :
            return line_line(obj1, obj2)
        default :
            console.log("mon coco t'as oublié un cas : " + obj1.constructor.name + "/" + obj2.constructor.name);
            break;
    }
}

export { intersect }