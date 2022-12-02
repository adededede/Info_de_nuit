import { Point, Level, GO_Set, Line, Tile, Virus } from "./game_objects.js"

var lvl_1 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_2 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_3 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_4 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_5 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_6 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_7 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_8 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_9 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)
var lvl_10 = new Level(new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new GO_Set([]),new Point(250,460),new Point(0,0),32)

const levels = {
    1  : localStorage.getItem('level_1') !== null ? eval(localStorage.getItem('level_1')) : eval(lvl_1),
    2  : localStorage.getItem('level_2') !== null ? eval(localStorage.getItem('level_2')) : lvl_2,
    3  : localStorage.getItem('level_3') !== null ? eval(localStorage.getItem('level_3')) : lvl_3,
    4  : localStorage.getItem('level_4') !== null ? eval(localStorage.getItem('level_4')) : lvl_4,
    5  : localStorage.getItem('level_5') !== null ? eval(localStorage.getItem('level_5')) : lvl_5,
    6  : localStorage.getItem('level_6') !== null ? eval(localStorage.getItem('level_6')) : lvl_6,
    7  : localStorage.getItem('level_7') !== null ? eval(localStorage.getItem('level_7')) : lvl_7,
    8  : localStorage.getItem('level_8') !== null ? eval(localStorage.getItem('level_8')) : lvl_8,
    9  : localStorage.getItem('level_9') !== null ? eval(localStorage.getItem('level_9')) : lvl_9,
    10  : localStorage.getItem('level_10') !== null ? eval(localStorage.getItem('level_10')) : lvl_10
}

export { levels }