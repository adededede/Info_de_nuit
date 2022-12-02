import { g_ctx } from "../other/global_context.js"
import { intersect } from "./intersectFunctions.js"
import { levels } from "./levels.js"

class GameObject {
    constructor(x,y,label=null,draw_mode=null){
        this.x = x
        this.y = y
        this.label = label
        this.draw_mode = 'stroke'
    }

    setX(new_val){
        this.x = new_val
        return this
    }

    setY(new_val){
        this.y = new_val
        return this
    }

    setLabel(new_val){
        this.label = new_val
        return this
    }

    setDrawingMode(new_val){
        this.draw_mode = new_val
        return this
    }

    draw(context){this.draw_label(context)}

    draw_label(context){ this.label !== null ? this.label.setX(this.x).setY(this.y).draw(context) : -1 }
}

class Label extends GameObject {
    constructor(x_o, y_o, label, x=null, y=null){
        super(x=-100,y=-100,label,null)
        this.x_o = x_o
        this.y_o = y_o
    }

    setX_O(new_val){
        this.x_o = new_val
        return this
    }

    setY_O(new_val){
        this.y_o = new_val
        return this
    }

    draw(context) {
        context.strokeText(this.label, this.x + this.x_o, this.y + this.y_o)
    }
}

class Point extends GameObject {
    constructor(x, y, label=null,draw_mode=null){
        super(x,y,label,draw_mode)
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        context.fill(); 
    }

    to_str_eval(){
        return "new Point(" + this.x + "," + this.y + ")"
    }
}

class Virus extends Point {
    constructor(x, y, label=null,draw_mode=null){
        super(x,y,label,draw_mode)
    }

    draw(context) {
        let sprite = new Image()
        sprite.src = "assets/sprites/virus_sprite.png"
        context.drawImage(sprite, this.x - 16, this.y -16, 32, 32)

        context.beginPath();
        context.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        context.fill(); 
    }

    to_str_eval(){
        return "new Virus(" + this.x + "," + this.y + ")"
    }


}

class Line extends GameObject {
    constructor(p1, p2, label = null, draw_mode=null){
        super(p1.x, p1.y, label, draw_mode)
        this.p1 = p1
        this.p2 = p2
    }

    draw(context){
        context.beginPath()
        context.moveTo(this.p1.x, this.p1.y)
        context.lineTo(this.p2.x, this.p2.y)
        context.stroke()
    }

    to_str_eval(){
        return "new Line(" + this.p1.to_str_eval() + "," + this.p2.to_str_eval() + ")"
    }
}

class Circle extends GameObject {
    constructor(x, y, radius, label=null,draw_mode=null){
        super(x,y,label,draw_mode)
        this.r = radius
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill(); 
    }
}

class Moving extends GameObject {
    constructor(x,y,vx,vy,gravity,friction, scale = null, label=null,draw_mode=null) {
        super(x,y,label,draw_mode)
        this.vx=vx
        this.vy=vy
        this.g=gravity
        this.f=friction
        this.scale = scale === null ? 1 :  scale
    }

    setVX(new_val){
        this.vx = new_val
        return this
    }

    setVY(new_val){
        this.vy = new_val
        return this
    }

    setG(new_val){
        this.g = new_val
        return this
    }

    setF(new_val){
        this.f = new_val
        return this
    }
}

class Player extends Moving {
    constructor(x,y,vx,vy,gravity,friction, jump = null, scale = null, label=null, draw_mode=null) {
        super(x,y,vx,vy,gravity,friction, scale, label,draw_mode)

        this.jump = jump === null ? false :  jump 

        this.run_animation_right = new Image()
        this.run_animation_right.src  = "assets/sprites/grave_robber/right_facing/GraveRobber_run.png"
        this.jump_animation_right = new Image()
        this.jump_animation_right.src = "assets/sprites/grave_robber/right_facing/GraveRobber_jump.png"
        this.idle_animation_right = new Image()
        this.idle_animation_right.src = "assets/sprites/grave_robber/right_facing/GraveRobber_idle.png"

        this.run_animation_left = new Image()
        this.run_animation_left.src  = "assets/sprites/grave_robber/left_facing/GraveRobber_run.png"
        this.jump_animation_left = new Image()
        this.jump_animation_left.src = "assets/sprites/grave_robber/left_facing/GraveRobber_jump.png"
        this.idle_animation_left = new Image()
        this.idle_animation_left.src = "assets/sprites/grave_robber/left_facing/GraveRobber_idle.png"
        
        this.jump_counter = 0
        this.idle_counter = 0
        this.run_counter  = 0
        this.frame = 48
        this.size = 1.4
        this.character_facing = "r"
        this.current_collision = ""
        this.draw_hitboxes = false
    }

    setJump(new_val){
        this.jump = new_val
        return this
    }

    draw(context){
        // Draw character

        if ( this.draw_hitboxes ) {
            // hit box viruses
            context.strokeRect(this.x + 13, this.y - 46, 20, 46)
            // hit boxes
                //feet
            context.strokeRect(this.x + 9, this.y, 28, -8);
                //head
            context.strokeRect(this.x + 11, this.y - 46, 22, 8);
                //vertical axis
            new Line(new Point(this.x + 23, this.y - 46), new Point(this.x + 23,this.y)).draw(context)
        }        
    
        //draw appropriate sprite
        if (this.jump) {
            //console.log("jump");
            if (this.character_facing === "r") {
                context.drawImage(this.jump_animation_right, this.frame * this.jump_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
            } else {
                context.drawImage(this.jump_animation_left, this.frame * this.jump_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
            }
            if(g_ctx.next_sprite) this.jump_counter++

        } else {
            if( -0.5 < this.vx && this.vx < 0.5){
                //console.log('idle');
                if (this.character_facing === "r") {
                    context.drawImage(this.idle_animation_right, this.frame * this.idle_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
                } else {
                    context.drawImage(this.idle_animation_left, this.frame * this.idle_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
                }
                if(g_ctx.next_sprite) this.idle_counter++
    
            } else if ( this.vx < 0 ) {
                //console.log("left");
                this.character_facing = "l"
                context.drawImage(this.run_animation_left, this.frame * this.run_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
                if(g_ctx.next_sprite) this.run_counter++

            } else if ( this.vx > 0 ) {
                //console.log("right")
                this.character_facing = "r"
                context.drawImage(this.run_animation_right, this.frame * this.run_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
                if(g_ctx.next_sprite) this.run_counter++

            } 
        }


        if (this.jump_counter >= 6 || this.idle_counter >= 4 || this.run_counter >= 4) {
            this.jump_counter = 0
            this.idle_counter = 0
            this.run_counter  = 0
        }
    }

    check_for_collisions(platforms){

        let hitbox_feet = new Rectangle(this.x + 9, this.y - 16, 28, 16)
        let hitbox_head = new Rectangle(this.x + 11, this.y - 46, 22, 8)
        let hitbox_viruses = new Rectangle(this.x + 13, this.y - 46, 20, 46)
        let player_vertical_axis = new Line(new Point(this.x + 23, this.y - 46), new Point(this.x + 23,this.y))
        let center = new Point(this.x + 20, this.y - 23)
        let collision = ""
        // head collision
        for (let index = 0; index < platforms.length; index++) {
            //platform collision
            if (platforms[index].p1.x !== platforms[index].p2.x) {
                //head
                if(intersect( platforms[index], hitbox_head)){
                    this.jump = false;
                    this.vy = -this.vy/2 ; 
                    this.y += 5
                    collision = "head_platform"
                }
                //feet
                if(intersect( platforms[index], hitbox_feet) && this.vy >= 0){
                    this.jump = false;
                    this.vy = 0
                    this.y = platforms[index].p1.y; 
                    collision = "feet_platform"
                }
            } else {
            //wall collision
                //head
                if(intersect( platforms[index], hitbox_head)){
                    collision = ""
                }
                //feet
                if(intersect( platforms[index], hitbox_feet)){
                    this.x -= this.vx
                    this.vx = 0
                    collision = "feet_wall"
                }
            }
        }


        levels[g_ctx.current_level].viruses.objects.forEach((el,i) => {
                //fullbody
                if(intersect( el, hitbox_viruses)){
                    levels[g_ctx.current_level].viruses.remove(el)
                    g_ctx.health -= 10
                }
        });
        
        //check if exit is touched
        let exit = new Circle(levels[g_ctx.current_level].exit.x, levels[g_ctx.current_level].exit.y, 10)
        if ( intersect( exit, player_vertical_axis) ) g_ctx.to_next_lvl = false
        if ( intersect( exit, player_vertical_axis) ) g_ctx.to_next_lvl = false
        if ( intersect( g_ctx.current_pnj.hitbox, center) && !g_ctx.stop_game ) g_ctx.start_pnj_dialogue = true

        this.current_collision = collision
    }

    update(){
        // If the player is not jumping apply the effect of frictiom
        if(this.jump == false) {
            this.vx *= this.f;
        } else {
            // If the player is in the air then apply the effect of gravity
            this.vy += this.g;
        }
        this.jump = true;

        if(this.vy > 10) this.vy = 10

        // If the left key is pressed increase the relevant horizontal velocity
        if(g_ctx.keys.left) {
            this.vx = -4.5;
        }
        if(g_ctx.keys.right) {
            this.vx = 4.5;
        }
        // Updating the y and x coordinates of the player
        this.y += this.vy;
        this.x += this.vx;
        //console.log(this.vy);
    }
}

class PNJ extends GameObject {
    constructor(x,y, name="grave_robber", facing="l", label=null, draw_mode=null) {
        super(x,y,label,draw_mode)
        this.name = name
        this.hitbox = new Rectangle(this.x - 10, this.y - 56, 60, 56)

        this.idle_animation_right = new Image()
        this.idle_animation_right.src = "assets/sprites/"+name+"/right_facing/GraveRobber_idle.png"

        this.idle_animation_left = new Image()
        this.idle_animation_left.src = "assets/sprites/"+name+"/left_facing/GraveRobber_idle.png"
        
        this.idle_counter = 0
        this.frame = 48
        this.size = 1.4
        this.character_facing = facing
        this.draw_hitboxes = false
    }

    draw(context){
        // Draw character

        context.strokeRect(this.x - 10, this.y - 56, 60, 56)
        if ( this.draw_hitboxes ) {
            // hit box viruses
            context.strokeRect(this.x + 13, this.y - 46, 20, 46)
        }        
    
        //draw appropriate sprite
        
        if (this.character_facing === "r") {
            context.drawImage(this.idle_animation_right, this.frame * this.idle_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
        } else {
            context.drawImage(this.idle_animation_left, this.frame * this.idle_counter, 0, this.frame, this.frame, this.x, this.y - (48 *this.size), this.frame * this.size, this.frame * this.size)
        }
        if(g_ctx.next_sprite) this.idle_counter++
    
        if (this.idle_counter >= 4) {
            this.idle_counter = 0
        }
    }
}


class Polygon extends GameObject {
    constructor(x, y, vertices, label=null, draw_mode=null){
        super(x,y,label,draw_mode)
        this.vertices = vertices
    }

    setVertices(new_val) {
        this.vertices = new_val
        return this
    }

    addVertex(new_val) {
        this.vertices.push(new_val)
        return this
    }

    draw(context) {
        context.beginPath()
        context.moveTo(this.vertices[0].x, this.vertices[0].y)
        for (let index = 1; index < this.vertices.length; index++) {
            context.lineTo(this.vertices[index].x, this.vertices[index].y)
        }
        context.lineTo(this.vertices[0].x, this.vertices[0].y)
        context.stroke()
        

        this.draw_label(context)
    }
}

class Triangle extends Polygon {
    constructor(x, y, p1, p2, p3, label = null, draw_mode = null) {
        super(x, y, [p1,p2,p3], label, draw_mode)
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
    }

    setP1(new_val){
        this.p1 = new_val
        this.vertices[0] = new_val
        return this
    }

    setP2(new_val){
        this.p2 = new_val
        this.vertices[1] = new_val
        return this
    }

    setP3(new_val){
        this.p3 = new_val
        this.vertices[2] = new_val
        return this
    }

    setVertices(new_val){
        this.p1 = new_val[0]
        this.p2 = new_val[1]
        this.p3 = new_val[2]
        return this
    }
}

////// will be changed //////

class Rectangle extends GameObject {

    constructor (x, y, width, height, label = null, draw_mode = null){
        super(x, y, label, draw_mode);
        this.w = width
        this.h = height
    }

    setW(new_val){
        this.w = new_val
        return this
    }

    setH(new_val){
        this.h = new_val
        return this
    }

    draw(context){
        if(this.draw_mode == "stroke") {
            context.strokeRect(this.x, this.y, this.w, this.h);
        } else {
            context.fillRect(this.x, this.y, this.w, this.h);
        }
        
        this.draw_label(context)
    }
}

class Button extends Rectangle {
    constructor(x, y, label = "button", active = false, width = 100, height = 30, draw_mode = null) {
        super(x, y, width, height, label, draw_mode)
        this.active = active
    }

    setActive(new_val){
        this.active = new_val
        return this
    }

    draw(context){
        context.fillStyle = this.active ? "pink" : "white";
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
        context.fillStyle = "black"   
        this.draw_label(context)
    }
}

class Square extends Rectangle {
    constructor(x, y, width, label = null, draw_mode = null){
        super(x, y, width, width, label, draw_mode)
    }     
}

class TileWithSections extends Square{
    constructor(x,y,width) {
        super(x, y, width, null)
        this.s = width
        let o = width / 4
        this.sections = [
            new Polygon(this.x         , this.y         , [
                new Point(this.x, this.y),
                new Point(this.x + o*4, this.y),
                new Point(this.x + o*3, this.y + o),
                new Point(this.x + o, this.y + o),
            ]),//top trapezoid
            new Polygon(this.x + this.s, this.y         ,[
                new Point(this.x + o*4, this.y),
                new Point(this.x + o*3, this.y + o),
                new Point(this.x + o*3, this.y + o*3),
                new Point(this.x + o*4, this.y + o*4),
            ]),//right trapezoid
            new Polygon(this.x + this.w, this.y + this.w,[
                new Point(this.x, this.y + o*4),
                new Point(this.x + o*4, this.y + o*4),
                new Point(this.x + o*3, this.y + o*3),
                new Point(this.x + o, this.y + o*3),
            ]),//bottom trapezoid
            new Polygon(this.x         , this.y + this.w,[
                new Point(this.x, this.y),
                new Point(this.x + o, this.y + o),
                new Point(this.x + o, this.y + o*3),
                new Point(this.x, this.y + o*4),
            ]),//left trapezoid
        ]
    }

    draw_outside(context){
        // let i = 0
        // let colors = ["red", "yellow", "green", 'purple']
        // this.sections.forEach(element => {
        //     context.strokeStyle = colors[i]
        //     element.draw(context)
        //     i++
        // });
        // context.strokeStyle = "black"
        
        if(this.draw_mode == "stroke") {
            context.strokeRect(this.x, this.y, this.s, this.s);
        } else {
            context.fillRect(this.x, this.y, this.s, this.s);
        }

        this.draw_label(context)
    }

    section_collision(pos){
        for (let i = 0; i < this.sections.length; i++) {
            if (intersect(pos, this.sections[i])){
                return i
            }
        }
        return -1
    }

    get_line(num) {
        let o = this.s / 4;
        switch (num) {
            case 0:
                return new Line(new Point(this.x, this.y), new Point(this.x + o*4, this.y))
            case 1:
                return new Line(new Point(this.x + o*4, this.y + 1), new Point(this.x + o*4, this.y + o*4 - 1))
            case 2:
                return new Line(new Point(this.x, this.y + o*4), new Point(this.x + o*4, this.y + o*4))
            case 3:
                return new Line(new Point(this.x, this.y + 1), new Point(this.x, this.y + o*4 - 1))
        }
    }

    draw_section(context, num) {
        context.strokeStyle = "red"
        //console.log(this.sections[num]);
        this.sections[num].draw(context)
        context.strokeStyle = "black"
    }
}

class GO_Set {
    constructor(objects = new Array()){
        this.objects = objects
    }

    in(obj){
        for (let i = 0; i < this.objects.length; i++) if (this.objects[i].x === obj.x && this.objects[i].y === obj.y) return i
        
        return -1
    }

    add(obj){
        if (this.in(obj) === -1) this.objects.push(obj)
    }

    remove(obj){
        let pos = this.in(obj)
        if (pos !== -1) this.objects.splice(pos, 1)
    }

    pop(){
        this.objects.pop()
    }

    to_str_eval(){
        if (this.objects.length < 1) return 'new GO_Set()'

        let result = 'new GO_Set([' + this.objects[0].to_str_eval()
        
        for (let i = 1; i < this.objects.length; i++) result += ',' + this.objects[i].to_str_eval()

        return result + '])'
    }
}

class Tile {
    constructor(clipX, clipY, x, y, size, asset_path, rotation) {
        this.clipX = clipX
        this.clipY = clipY
        this.x = x
        this.y = y
        this.size = size
        this.asset_path =  asset_path
        let angle = {0: "0",1: "90",2: "180", 3: "270"}
        this.rotation = angle[rotation]
        this.transform = "rotate(" + this.rotation + "deg)"
    }

    get_img() {
    }

    to_str_eval() {
        return "new Tile(" + this.clipX + "," + this.clipY + "," + this.x + "," + this.y + "," + this.size + ",'" + this.asset_path + "'," + this.rotation + ")"
    }
}

class Level {
    constructor(plateforms,front_layer,middle_layer,back_layer, viruses, spawn, exit, tile_size){
        this.plateforms = plateforms
        this.tile_size = tile_size
        this.front_layer = front_layer
        this.middle_layer = middle_layer
        this.back_layer = back_layer
        this.viruses = viruses
        this.spawn = spawn
        this.exit = exit
    }

    to_str_eval() {
        let result = 'new Level('
        result += this.plateforms.to_str_eval()
        result += ',' + this.front_layer.to_str_eval()
        result += ',' + this.middle_layer.to_str_eval()
        result += ',' + this.back_layer.to_str_eval()
        result += ',' + this.viruses.to_str_eval()
        result += ',' + this.spawn.to_str_eval() + ',' + this.exit.to_str_eval() + "," + this.tile_size + ',' + ')'
        return result
    }
        
}

export { Point, PNJ, Virus, Line, Circle, Label, Polygon, Rectangle, Button, Square, Triangle, TileWithSections, Level, Tile, GO_Set, Player }