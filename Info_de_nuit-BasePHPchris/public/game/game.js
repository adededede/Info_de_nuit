import { g_ctx } from "./other/global_context.js";
import { levels } from "./other/levels.js";
import { Point, Label, Button, Player} from "./other/game_objects.js";
import { keydown, keyup, wheel_pos } from "./other/keyFunctions.js";
import { PlatformerEditorScreen } from "./screens/levelEditorScreen.js";
import { PlatformerGameScreen } from "./screens/gameScreen.js";
import { intersect } from "./other/intersectFunctions.js";
import { return_button } from "./other/global_functions.js";
import { check } from "./other/storyScripting.js";

"use strict";

window.onload = init();

function gameLoop(timeStamp) {
    //short circuit for dialogs

    //health bar infill
    g_ctx.health_bar.style.width = g_ctx.health*3 + "px"

    //fps calculation and timestamp 

    // Calculate the number of seconds passed since the last frame and limits it to .1s  
    g_ctx.secondsPassed = Math.min((timeStamp - g_ctx.oldTimeStamp) / 1000, 0.1);
    g_ctx.oldTimeStamp = timeStamp;
    // Calculate fps
    g_ctx.fps = Math.round(1 / g_ctx.secondsPassed);
    // change text of fps indicator
    g_ctx.fpsIndicator.textContent = "FPS : " + g_ctx.fps

    if (g_ctx.new_anim_cpt >= 8) {
        g_ctx.new_anim_cpt = 0
        g_ctx.next_sprite = true
    } else {
        g_ctx.new_anim_cpt++
        g_ctx.next_sprite = false
    }

    if ( g_ctx.current_level !== 0 ) {
        if (g_ctx.editing_mode) {
            //console.log('editor');
            g_ctx.home_screen_buttons = []
            g_ctx.editor_screen.draw()
        } else if (g_ctx.game_mode) {
            //console.log('game');
            g_ctx.game_screen.draw()
        }
    } else {
        // Clear the entire canvas
        g_ctx.context_foreground.clearRect(0, 0, 800, 800);
        g_ctx.context_background.clearRect(0, 0, 800, 800);
        home_screen_buttons()
        draw_home_screen()
    }

    check()
    window.requestAnimationFrame(gameLoop);
}

function draw_home_screen() {
    for (let index = 0; index < g_ctx.home_screen_buttons.length; index++) {
        g_ctx.home_screen_buttons[index].draw(g_ctx.context_background)
    }

    g_ctx.context_background.beginPath()
    g_ctx.context_background.moveTo(300, 0)
    g_ctx.context_background.lineTo(300,800)
    g_ctx.context_background.stroke()
    g_ctx.context_background.closePath()
}


function home_screen_buttons() {
    let spacing = 15
    g_ctx.home_screen_buttons = [
        new Button(50, (1*spacing)   ,"").setLabel(new Label(30, 15, "level 1")),
        new Button(50, (2*spacing)+10*2,"").setLabel(new Label(30, 15, "level 2")),
        new Button(50, (3*spacing)+20*2,"").setLabel(new Label(30, 15, "level 3")),
        new Button(50, (4*spacing)+30*2,"").setLabel(new Label(30, 15, "level 4")),
        new Button(50, (5*spacing)+40*2,"").setLabel(new Label(30, 15, "level 5")),
        new Button(50, (6*spacing)+50*2,"").setLabel(new Label(30, 15, "level 6")),
        new Button(50, (7*spacing)+60*2,"").setLabel(new Label(30, 15, "level 7")),
        new Button(50, (8*spacing)+70*2,"").setLabel(new Label(30, 15, "level 8")),
        new Button(50, (9*spacing)+80*2,"").setLabel(new Label(30, 15, "level 9")),
        new Button(50, (10*spacing)+90*2,"").setLabel(new Label(30, 15, "level 10")),
        
        new Button(370, (7*spacing)+0*2,"").setLabel(new Label(30, 15, "Editeur")),
        new Button(370, (7*spacing)+20*2,"").setLabel(new Label(30, 15, "Jouer")),
    ]
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x, y}
}

function checkForButtonInteraction(event){
    if (g_ctx.editor_mode === true || g_ctx.game_mode === true) return

    let p = getMousePosition(g_ctx.canvas_foreground, event);
    let pos = new Point(p.x, p.y)
    let label = ""
    for (let index = 0; index < g_ctx.home_screen_buttons.length; index++) {
        label = g_ctx.home_screen_buttons[index].label.label
        if(intersect(pos, g_ctx.home_screen_buttons[index])){
            if (label === "Jouer"){
                g_ctx.game_mode = true
                g_ctx.return_button_visible = true
            } else if (label === "Editeur") {
                g_ctx.editing_mode = true
                g_ctx.return_button_visible = true
            } else {
                if (g_ctx.current_level > 0)
                    g_ctx.home_screen_buttons[g_ctx.current_level-1].setActive(false)
                    
                g_ctx.current_level = label.split(' ')[1]
                g_ctx.home_screen_buttons[g_ctx.current_level-1].setActive(true)
                draw_home_screen()
            }
        } 
    }
}

function init(){
    g_ctx.canvas_foreground = document.getElementById('canvas_foreground')
    g_ctx.context_foreground = g_ctx.canvas_foreground.getContext('2d')
    g_ctx.canvas_background = document.getElementById('canvas_background')
    g_ctx.context_background = g_ctx.canvas_background.getContext('2d')
    g_ctx.player = new Player(100, 100, 0, 0, 0.65, 0.35,false, 1)

    g_ctx.health_bar = document.getElementById('health_bar_inside')

    g_ctx.return_button = document.getElementById("return_button")

    g_ctx.return_button.addEventListener("mouseup", event => return_button())
    
    g_ctx.game_screen = new PlatformerGameScreen()
    g_ctx.editor_screen = new PlatformerEditorScreen()

    g_ctx.return_button = new Image()
    g_ctx.return_button.src = "./assets/Back_Arrow.png"

    // Adding the event listeners
    document.addEventListener("keydown",event => keydown(event))
    document.addEventListener("keyup",event => keyup(event))
    window.addEventListener("wheel", event => wheel_pos(event))
    g_ctx.canvas_foreground.addEventListener("mouseup", event => checkForButtonInteraction(event));

    home_screen_buttons()
    draw_home_screen()

    // Start the first frame request
    window.requestAnimationFrame(gameLoop)
}






