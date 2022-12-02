import { Point, Virus, Line, Circle, Label, Rectangle, Button, Level, TileWithSections,GO_Set, Tile, PNJ } from "../other/game_objects.js"
import { g_ctx } from "../other/global_context.js"
import { levels } from "../other/levels.js"
import { intersect } from "../other/intersectFunctions.js"

class PlatformerEditorScreen {
    constructor(){
        this.background_update = false
        this.canvas_tools = document.getElementById('canvas_tools')
        this.context_tools = this.canvas_tools.getContext('2d')
        this.canvas_tools_overlay = document.getElementById('canvas_tools_overlay')
        this.context_tools_overlay = this.canvas_tools_overlay.getContext('2d')
        this.tiles_grids = {
            grass: this.create_grid_of_cases(12, 4, 32, 10, 10),
            cave : this.create_grid_of_cases(12, 4, 32, 10, 128+20),
        }
        this.tiles_assets = {
            tiles_grass : new Image(),
            tiles_caves : new Image(),
        }
        this.tiles_assets.tiles_caves.src  = "assets/decor/cave_background_0.png"
        this.tiles_assets.tiles_grass.src  = "assets/decor/grass_tileset_0.png"

        this.buttons = [
            new Button(400, 10,"").setLabel(new Label(25, 15, "back layer")).setActive(true),
            new Button(510, 10,"").setLabel(new Label(25, 15, "middle layer")),
            new Button(620, 10,"").setLabel(new Label(25, 15, "front layer")),
            new Button(510, 50,"").setLabel(new Label(15, 15, "remove element")),
            new Button(400, 50,"").setLabel(new Label(25, 15, "place spawn")),
            new Button(400, 90,"").setLabel(new Label(25, 15, "place exit")),
            new Button(510, 90,"").setLabel(new Label(25, 15, "place virus")),
            new Button(400, 130,"").setLabel(new Label(25, 15, "place wall")),
            new Button(400, 170,"").setLabel(new Label(25, 15, "clear hand")),
            new Button(400, 210,"").setLabel(new Label(25, 15, "save level")),
            new Button(400, 250,"").setLabel(new Label(25, 15, "reset level")),
        ]

        this.last_mouse_pos = new Point(0, 0)
        this.last_mouse_pos_game = new Point(-1, -1)
        this.current_layer = "back"
        this.place_other = ""
        this.current_tile = {
            asset : "",
            position : null,
        }
        this.spawn = null
        this.wall  = null
        this.exit  = null
        this.virus = null
        this.remove = null
        this.draw_grid = false
        this.game_grid = this.create_grid_of_divided_cases(25, 25, 32, 0, 0)

        g_ctx.canvas_foreground.addEventListener("mouseup", event => g_ctx.editing_mode === true ? this.place_tile(event) : -1);
        g_ctx.canvas_foreground.addEventListener("mouseup", event => g_ctx.editing_mode === true ? this.place_wall(event) : -1);
        g_ctx.canvas_foreground.addEventListener("mouseup", event => g_ctx.editing_mode === true ? this.place_spawn(event) : -1);
        g_ctx.canvas_foreground.addEventListener("mouseup", event => g_ctx.editing_mode === true ? this.place_exit(event) : -1);
        g_ctx.canvas_foreground.addEventListener("mouseup", event => g_ctx.editing_mode === true ? this.place_virus(event) : -1);
        this.canvas_tools_overlay.addEventListener("mouseup", event => g_ctx.editing_mode === true ? this.check_for_tools_interaction(event) : -1);
        this.canvas_tools_overlay.addEventListener("mousemove", event => g_ctx.editing_mode === true ? this.record_last_mouse_pos(event) : -1);
        g_ctx.canvas_foreground.addEventListener("mousemove", event => g_ctx.editing_mode === true ? this.record_last_mouse_pos_game(event) : -1);
    }

    create_grid_of_cases(nb_case_horizontal, nb_cases_vertical, dimension, x_offset, y_offset){
        let cases = []
        for (let i = 0; i < nb_cases_vertical; i++) {
            for (let j = 0; j < nb_case_horizontal; j++) {
                let rect = new Rectangle((j*dimension)+x_offset, (i*dimension)+y_offset,dimension, dimension)
                cases.push(rect)
            }
        }
        return cases
    }

    create_grid_of_divided_cases(nb_case_horizontal, nb_cases_vertical, dimension, x_offset, y_offset){
        let cases = []
        for (let i = 0; i < nb_cases_vertical; i++) {
            for (let j = 0; j < nb_case_horizontal; j++) {
                let rect = new TileWithSections((j*dimension)+x_offset, (i*dimension)+y_offset, dimension)
                cases.push(rect)
            }
        }
        return cases
    }

    getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return new Point(x,y)
    }

    check_for_tools_interaction(event){
        let p = this.getMousePosition(this.canvas_tools_overlay, event);
        let pos = new Point(p.x, p.y)
        let label = ""
        for (let index = 0; index < this.buttons.length; index++) {
            label = this.buttons[index].label.label
            if(intersect(pos, this.buttons[index])){
                label = label.split(" ")
                if (label[1] === "layer") {
                    this.current_layer = label[0]
                    for (let i = 0; i < this.buttons.length; i++) { if ( i !== index ) this.buttons[i].setActive(false)}
                    this.buttons[index].setActive(true)
                } else if (label[0] === "clear"){
                    this.clear_tools_hand("")
                } else if (label[0] === "save") {
                    console.log(levels[g_ctx.current_level].to_str_eval())
                    localStorage.setItem("level_" + g_ctx.current_level, levels[g_ctx.current_level].to_str_eval())
                    //télécharger le niveau
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    var json = levels[g_ctx.current_level].to_str_eval(),
                        blob = new Blob([json], {type: "octet/stream"}),
                        url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = "level_" + g_ctx.current_level +".txt";
                    a.click();
                    window.URL.revokeObjectURL(url);
                } else if (label[0] === "reset") {
                    levels[g_ctx.current_level] = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
                    localStorage.setItem("level_" + g_ctx.current_level, levels[g_ctx.current_level].to_str_eval())
                    this.background_update = true
                } else {
                    if ( label[1] === "element") {
                        this.remove = !this.remove
                        this.buttons.forEach(element => {
                            if(this.remove && element.label.label === "remove element"){
                                element.setActive(true)
                            } else if (element.label.label === "remove element") {
                                element.setActive(false)
                            }
                        });
                        return
                    }
                    
                    this.clear_tools_hand(label[1])
                    if ( label[1] === "wall") this.wall = new Line(new Point(0,0), new Point(0,0))

                    if ( label[1] === "spawn") this.spawn = new Point(0,0)

                    if ( label[1] === "exit") this.exit = new Point(0,0)

                    if ( label[1] === "virus") this.virus = new Virus(0,0)
                }
                this.draw_tools()
                return
            } 
        }
        let rect = new Rectangle(0,0,0,0)
        for (let i = 0; i < this.tiles_grids["grass"].length; i++) {
            if (intersect(pos, this.tiles_grids["grass"][i])) {
                this.clear_tools_hand("tile")
                rect.x = this.tiles_grids["grass"][i].x - 10
                rect.y = this.tiles_grids["grass"][i].y - 10
                this.current_tile.asset = "grass"
                this.current_tile.position = rect
            }

            if (intersect(pos, this.tiles_grids["cave"][i])) {
                this.clear_tools_hand("tile")
                rect.x = this.tiles_grids["cave"][i].x - 10
                rect.y = this.tiles_grids["cave"][i].y - 148
                this.current_tile.asset = "cave"
                this.current_tile.position = rect
            }        
        }
    }

    draw_tools() {
        this.context_tools.clearRect(0,0,800,400)
        this.context_tools.drawImage(this.tiles_assets.tiles_grass, 10, 10)
        this.context_tools.drawImage(this.tiles_assets.tiles_caves, 10, 128 + 20 )
        for (let index = 0; index < this.buttons.length; index++) {
            this.buttons[index].draw(this.context_tools)
        }
    }

    record_last_mouse_pos(event){
        this.last_mouse_pos = this.getMousePosition(this.canvas_tools_overlay, event)
    }
    record_last_mouse_pos_game(event){
        this.last_mouse_pos_game = this.getMousePosition(g_ctx.canvas_foreground, event)
    }

    draw_square_on_tile(){
        let pos = this.last_mouse_pos
        this.context_tools_overlay.strokeStyle = "blue"
        for (let i = 0; i < this.tiles_grids["grass"].length; i++) {
            if (intersect(pos, this.tiles_grids["grass"][i])) {
                this.tiles_grids["grass"][i].draw(this.context_tools_overlay)
            }

            if (intersect(pos, this.tiles_grids["cave"][i])) {
                this.tiles_grids["cave"][i].draw(this.context_tools_overlay)
            }
        }
        this.context_tools_overlay.strokeStyle = "black"
    }

    draw_tile_prevue(){
        let pos = this.last_mouse_pos_game
        let src
        if (this.current_tile.asset === "grass") {
            src  = "assets/decor/grass_tileset_"+g_ctx.angle[g_ctx.wheel_position]+".png"
        } else {
            src  = "assets/decor/cave_background_"+g_ctx.angle[g_ctx.wheel_position]+".png"
        }
        let tile = new Image()
        tile.src = src
        let angle = {0: "0",1: "90",2: "180", 3: "270"}
        for (let i = 0; i < this.game_grid.length; i++) {
            if (intersect(pos, this.game_grid[i])) {
                g_ctx.context_foreground.drawImage(tile, this.current_tile.position.x, this.current_tile.position.y, 32, 32, this.game_grid[i].x, this.game_grid[i].y, 32, 32)
            }
        }
    }

    draw_wall_prevue(){
        let point = new Circle(this.last_mouse_pos_game.x, this.last_mouse_pos_game.y,3).setDrawingMode('fill')
        point.draw(g_ctx.context_foreground)
        let pos = this.last_mouse_pos_game
        
        let inside_pos = -1
        for (let i = 0; i < this.game_grid.length; i++) {
            if (intersect(pos, this.game_grid[i])) {
                inside_pos = this.game_grid[i].section_collision(pos)
                if (inside_pos !== -1) this.game_grid[i].draw_section(g_ctx.context_foreground, inside_pos)
            }
        }
    }

    draw_spawn_prevue(){
        let point = new Circle(this.last_mouse_pos_game.x, this.last_mouse_pos_game.y,3).setDrawingMode('fill')
        point.draw(g_ctx.context_foreground)
    }

    draw_exit_prevue(){
        let point = new Circle(this.last_mouse_pos_game.x, this.last_mouse_pos_game.y,3).setDrawingMode('fill')
        point.draw(g_ctx.context_foreground)
    }

    draw_virus_prevue(){
        let virus = new Virus(this.last_mouse_pos_game.x, this.last_mouse_pos_game.y)
        virus.draw(g_ctx.context_foreground)
    }

    place_wall(){
        if (this.wall === null) return
        let temp_line
        let pos = this.last_mouse_pos_game
        let inside_pos = -1
        for (let i = 0; i < this.game_grid.length; i++) {
            if (intersect(pos, this.game_grid[i])) {
                inside_pos = this.game_grid[i].section_collision(pos)
                if (inside_pos !== -1) {
                    temp_line = this.game_grid[i].get_line(inside_pos)
                    if (this.remove) {
                        levels[g_ctx.current_level].plateforms.remove(temp_line)
                    } else {
                        levels[g_ctx.current_level].plateforms.add(temp_line)
                    }
                }
                inside_pos = -1
            }
        }
        this.background_update = true
    }

    place_tile(){
        if (this.current_tile.position === null) return

        let pos = this.last_mouse_pos_game
        let src
        if (this.current_tile.asset === "grass") {src  = "grass_tileset_"+ g_ctx.angle[g_ctx.wheel_position] +".png"} 
        else {src  = "cave_background_"+g_ctx.angle[g_ctx.wheel_position]+".png"}
        let new_tile = new Tile(this.current_tile.position.x, this.current_tile.position.y, 0, 0, 32, src, g_ctx.wheel_position)
        for (let i = 0; i < this.game_grid.length; i++) {
            if (intersect(pos, this.game_grid[i])) {
                new_tile.x = this.game_grid[i].x
                new_tile.y = this.game_grid[i].y
                switch (this.current_layer) {
                    case "back":
                        if (this.remove) {
                            levels[g_ctx.current_level].back_layer.remove(new_tile)
                        } else {
                            levels[g_ctx.current_level].back_layer.add(new_tile)
                        }
                        break;
                    case "middle":
                        if (this.remove) {
                            levels[g_ctx.current_level].middle_layer.remove(new_tile)
                        } else {
                            levels[g_ctx.current_level].middle_layer.add(new_tile)
                        }
                        break;
                    case "front":
                        if (this.remove) {
                            levels[g_ctx.current_level].front_layer.remove(new_tile)
                        } else {
                            levels[g_ctx.current_level].front_layer.add(new_tile)
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        this.background_update = true
    }

    place_spawn(){
        if (this.spawn === null) return

        levels[g_ctx.current_level].spawn = this.last_mouse_pos_game
        this.background_update = true
    }

    place_exit(){
        if (this.exit === null) return
        console.log('wsh');
        levels[g_ctx.current_level].exit = this.last_mouse_pos_game
        this.background_update = true
    }

    place_virus(){
        if (this.virus === null) return
        let virus = new Virus(this.last_mouse_pos_game.x, this.last_mouse_pos_game.y)
        levels[g_ctx.current_level].viruses.add(virus)
    }

    clear_tools_hand(not_clear){
        switch (not_clear) {
            case "spawn":
                this.current_tile = {
                    asset : "",
                    position : null,
                }
                this.wall  = null
                this.exit  = null
                this.virus = null
                break;
            case "wall":
                this.current_tile = {
                    asset : "",
                    position : null,
                }
                this.spawn = null
                this.exit  = null
                this.virus = null
                break;
            case "tile":
                this.spawn = null
                this.wall  = null
                this.exit  = null
                this.virus = null
                break;
            case "exit":
                this.current_tile = {
                    asset : "",
                    position : null,
                }
                this.spawn = null
                this.wall = null
                this.virus = null
            case "virus":
                this.current_tile = {
                    asset : "",
                    position : null,
                }
                this.spawn = null
                this.wall = null
            default:
                this.current_tile = {
                    asset : "",
                    position : null,
                }
                this.spawn = null
                this.wall  = null
                this.exit  = null
                this.remove = null
                this.virus = null
                break;
        }
    }

    draw() {
        if ( g_ctx.to_next_lvl === true ) {
            g_ctx.to_next_lvl = false
            g_ctx.current_level++
            g_ctx.level_as_been_drawed = false
        }

        if( !(g_ctx.level_as_been_drawed) || this.background_update ){
            g_ctx.player.draw_hitboxes = true
            g_ctx.context_background.clearRect(0,0,800, 800)

            //draw back layer
            levels[g_ctx.current_level].back_layer.objects.forEach(el => {
                let tmp_tile = new Image()
                tmp_tile.src = './assets/decor/' + el.asset_path
                tmp_tile.style.transform = el.transform
                g_ctx.context_background.drawImage(tmp_tile, el.clipX, el.clipY, el.size, el.size, el.x, el.y, el.size, el.size)
            });

            //draw middle layer
            levels[g_ctx.current_level].middle_layer.objects.forEach(el => {
                let tmp_tile = new Image()
                tmp_tile.src = './assets/decor/' + el.asset_path
                tmp_tile.style.transform = el.transform
                g_ctx.context_background.drawImage(tmp_tile, el.clipX, el.clipY, el.size, el.size, el.x, el.y, el.size, el.size)
            });

            //draw platforms
            for (let index = 0; index < levels[g_ctx.current_level].plateforms.objects.length; index++) {
                levels[g_ctx.current_level].plateforms.objects[index].setDrawingMode('fill').draw(g_ctx.context_background)
            }

            //draw helper grid if wanted
            if (this.draw_grid) {
                this.game_grid.forEach(element => {
                    element.draw_outside(g_ctx.context_background)
                });
            }

            //draw spawn and set player coordinate to it
            let spawn = levels[g_ctx.current_level].spawn
            g_ctx.context_background.fillStyle = "red"
            let spawn_indicator = new Circle(spawn.x, spawn.y, 10).setLabel(new Label(-15, -13, "spawn")).setDrawingMode("fill")
            spawn_indicator.draw(g_ctx.context_background)
            g_ctx.context_background.fillStyle = "black"
            g_ctx.player.setX(spawn.x).setY(spawn.y)

            //draw exit
            let exit = levels[g_ctx.current_level].exit
            g_ctx.context_background.fillStyle = "blue"
            let exit_indicator = new Circle(exit.x, exit.y, 10).setLabel(new Label(-15, -13, "exit")).setDrawingMode("fill")
            exit_indicator.draw(g_ctx.context_background)
            g_ctx.context_background.fillStyle = "black"

            //draw tools canvas's
            this.draw_tools()

            //reset possible entry points
            g_ctx.level_as_been_drawed = true


            g_ctx.current_pnj = new PNJ(exit.x,exit.y)

            this.background_update = false
        }

        //update all objects
        g_ctx.player.update(g_ctx)

        //check for collisions
        g_ctx.player.check_for_collisions(levels[g_ctx.current_level].plateforms.objects)

        //clearing foreground and tools overlay each frame ( sinon c caca )
        this.context_tools_overlay.clearRect(0,0,800, 800)
        g_ctx.context_foreground.clearRect(0,0,800, 800)

        //drawing player and sprites layer 
        g_ctx.player.draw(g_ctx.context_foreground)
        g_ctx.current_pnj.draw(g_ctx.context_foreground)

        //drawing foreground viruses
        levels[g_ctx.current_level].viruses.objects.forEach(el => {
            el.draw(g_ctx.context_foreground)
        });

        //drawing foreground elements then various overlays
        levels[g_ctx.current_level].front_layer.objects.forEach(el => {
            let tmp_tile = new Image()
            tmp_tile.src = './assets/decor/' + el.asset_path
            tmp_tile.style.transform = el.transform
            g_ctx.context_foreground.drawImage(tmp_tile, el.clipX, el.clipY, el.size, el.size, el.x, el.y, el.size, el.size)
        });
        
        this.draw_square_on_tile()
        if (this.current_tile.position !== null) {
            this.draw_tile_prevue()
        }
        if (this.wall !== null) {
            this.draw_wall_prevue()
        }
        if (this.spawn !== null) {
            this.draw_spawn_prevue()
        }
        if (this.exit !== null) {
            this.draw_exit_prevue()
        }
        if (this.virus !== null) {
            this.draw_virus_prevue()
        }
    }
}

export { PlatformerEditorScreen }