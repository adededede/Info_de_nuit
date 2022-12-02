const g_ctx = {
    secondsPassed : 0,
    oldTimeStamp : 0,
    movingSpeed : 50,
    fps : 0,
    fpsIndicator : document.getElementById("fpsindicator"),
    keys : {
        right: false,
        left: false,
        up: false,
    },
    gravity : 0.6,
    friction : 0.7,
    player : null,
    canvas_foreground : null,
    context_foreground : null,
    canvas_background : null,
    context_background : null,
    editor_screen : false,
    editing_mode : false,
    game_screen : false,
    game_mode : false,
    current_level : 0,
    wheel_position : 0,
    home_screen_buttons : [],
    level_as_been_drawed : false,
    next_sprite : true,
    to_next_lvl : false,
    assets: {
        grass_0: new Image(),
        grass_90: new Image(),
        grass_180: new Image(),
        grass_270: new Image(),
        cave_0: new Image(),
        cave_90: new Image(),
        cave_180: new Image(),
        cave_270: new Image(),
    },
    angle : {0: "0",1: "90",2: "180", 3: "270"},
    return_button : null,
    return_button_visible: false,
    new_anim_cpt : 0,
    score : 0,
    virus_collected : 0,
    health : 100,
    health_bar: 100,
    current_pnj: null,
    start_pnj_dialogue: false,
    finish_pnj_dialogue: false,
    stop_game: false,
    question_points: 0,
}

g_ctx.assets.grass_0.src = "./assets/decor/grass_tileset_0.png"
g_ctx.assets.grass_90.src = "./assets/decor/grass_tileset_90.png"
g_ctx.assets.grass_180.src = "./assets/decor/grass_tileset_180.png"
g_ctx.assets.grass_270.src = "./assets/decor/grass_tileset_270.png"
g_ctx.assets.cave_0.src = "./assets/decor/cave_background_0.png"
g_ctx.assets.cave_90.src = "./assets/decor/cave_background_90.png"
g_ctx.assets.cave_180.src = "./assets/decor/cave_background_180.png"
g_ctx.assets.cave_270.src = "./assets/decor/cave_background_270.png"

export { g_ctx }
