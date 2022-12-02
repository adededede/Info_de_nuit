import { g_ctx } from "./global_context.js";

function return_button(){
    g_ctx.game_mode = false
    g_ctx.editing_mode = false
    g_ctx.current_level = 0
    g_ctx.level_as_been_drawed = false
}

export { return_button }