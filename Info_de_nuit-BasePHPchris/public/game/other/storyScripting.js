import { g_ctx } from "../other/global_context.js";
import { questions } from "./questions.js";
import { dialogues } from "./dialogues.js";

const chat = document.getElementById('chat');

document.getElementById('button1').addEventListener("click",event => button_click(1))
document.getElementById('button2').addEventListener("click",event => button_click(2))
document.getElementById('button_next').addEventListener("click",event => show_popup())


function check() {
    if (g_ctx.start_pnj_dialogue) {

        g_ctx.start_pnj_dialogue = false
        g_ctx.stop_game = true
        g_ctx.player.setVX(0).setVY(0)
        g_ctx.keys.right = false
        g_ctx.keys.left = false
        g_ctx.keys.top = false

        dialogues[g_ctx.current_level]["tableau dialogue"].forEach(e => {
            chat.innerText += e + '\n'
        })

        document.getElementById('question').innerText = questions[g_ctx.current_level]['Question']
        document.getElementById('button1').innerText = questions[g_ctx.current_level]['TrueRep']
        document.getElementById('button2').innerText = questions[g_ctx.current_level]['FalseRep']

        document.getElementById('button_next').style.display = "flex"
    }

    if ( g_ctx.health <= 0 ) {
        document.getElementById('lost').style.display = "block"
        g_ctx.stop_game = true
    }

    if ( g_ctx.current_level === 5 ) {
        document.getElementById('success').style.display = "block"
        g_ctx.stop_game = true
        document.getElementById('success').innerText += g_ctx.question_points + " points !"
    }
}


function show_popup() {
    document.getElementById('popup_question').style.display = "flex"
    document.getElementById('button_next').style.display = "none"
}

function button_click(e) {
    if (e === 1) {
        console.log(document.getElementById('button1').innerText)
        g_ctx.question_points += 1
    } else {
        console.log(document.getElementById('button2').innerText)
        g_ctx.question_points -= 1
    }
    document.getElementById('popup_question').style.display = "none"
    document.getElementById('chat').innerText = ""
    document.getElementById('button_next').style.display = "none"
    g_ctx.stop_game = false
    g_ctx.to_next_lvl = true
    g_ctx.keys.right = false
    g_ctx.keys.left = false
    g_ctx.keys.top = false
    g_ctx.player.setVX(0).setVY(0)
}

export { check }

