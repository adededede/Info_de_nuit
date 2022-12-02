import { g_ctx } from "../other/global_context.js"

// This function is called when the pressed key is released
function keyup(e) {
    if (g_ctx.stop_game) return

    if(e.keyCode == 37) {
        g_ctx.keys.left = false;
    }
    if(e.keyCode == 38) {
        if(g_ctx.player.vy < -5) {
            //g_ctx.player.vy = -10;
        }
    }
    if(e.keyCode == 39) {
        g_ctx.keys.right = false;
    }
} 

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    if (g_ctx.stop_game) return

    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        g_ctx.keys.left = true;
    }
    // 38 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(g_ctx.player.jump == false) {
            g_ctx.player.vy = -9;
            //g_ctx.player.vx /= 1.8
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        g_ctx.keys.right = true;
    } 
}

function wheel_pos(event) {
    if (g_ctx.stop_game) return

    let wheel_pos = g_ctx.wheel_position
    wheel_pos -= -Math.sign(event.deltaY)
    if (wheel_pos >= 4) wheel_pos = 0
    if (wheel_pos <= -1) wheel_pos = 3
    g_ctx.wheel_position = wheel_pos
}

export { keydown, keyup, wheel_pos }