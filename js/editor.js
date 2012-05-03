var current_key_id;
var current_tile = 1;
var key_delay = 5;
var key_timer = 11;

var map;
var map_name;

var current_level;

var MONSTER_SET = 0;
var CONTROL_SET = 1;
var TILE_SET = 2;

var current_set = CONTROL_SET;

var WALK_LEFT = 0;
var WALK_RIGHT = 1;
var JET_LEFT = 2;
var JET_RIGHT = 3;
var STAND_LEFT = 4;
var STAND_RIGHT = 5;

var bulletY = 0;
var bullet_timer = 4;

var window_x = 0;
var window_y = 0;

var enemies = new Array();

var energy = 100;

var max_particles = 100;
var particles = new Array(max_particles);

var font_img = new Image();
var tile_img = new Image();
var dude_img = new Image();
var enemy_img = new Image();
var brain_1_img = new Image();
var map_img = new Image();
var bullet_img = new Image();
var menu_background_img = new Image();


function load_map(level) {
    current_level = level;
    var request = new XMLHttpRequest();
    //request.open('GET', 'http://scoab/play/doctor-robot/maps/level_'+level+'.txt');
    var url = 'http://scoab/play/doctor-robot/DoctorRobot.php?getMap|'+level;
    console.log(url);
    request.open('GET', url);
    request.onreadystatechange = function() {
        if (request.readyState != 4 || request.status != 200) {
          return;
        }
        parse_map(request.responseText);
    };
    request.send(null);
}

function parse_map(map_data) {
    var rows = map_data.split('\n');
    map = new Array(rows.length - 1);
    map_name = rows[0];
    console.log(current_level + ":" + map_name);
    for(var y = 1; y < rows.length; ++y) {
        var cols = rows[y].split(',');
        map[y-1] = new Array(cols.length);
        for(var x = 0; x < cols.length; ++x) {
            map[y-1][x] = cols[x] - 1;
        }
    }
    console.log(map);

    map_loaded = true;
}


function load_images() {
    font_img.src = 'images/small_font.gif';
    tile_img.src = 'images/tiles.png';
    dude_img.src = 'images/dude.png';
    map_img.src = 'images/Infiltrator.png';
    bullet_img.src = 'images/bullet.png';
    enemy_img.src = 'images/enemy_1.png';
    brain_1_img.src = 'images/brain_1.png';
    menu_background_img.src = 'images/menu_background.png';
}

function pixel_to_tile(x, y) {
    x_tile = x >> 5;
    y_tile = y >> 5;
    return map[y_tile][x_tile];
}

function set_tile(x, y) {
    x_tile = x >> 5;
    y_tile = y >> 5;
    map[y_tile][x_tile] = current_tile;
}

function draw_tiles() {

    for(var i = 0; i < 20; ++i) {
        var sx = i%10 * 32;
        var sy = Math.floor(i/16) * 32;
        ctx.drawImage(map_img, sx, sy, 32, 32, i * 32, 0, 32, 32);
    }
}

function draw_current_tile() {
        var sx = current_tile%16 * 32;
        var sy = Math.floor(current_tile/16) * 32;
        ctx.drawImage(map_img, sx, sy, 32, 32, 16, 8, 32, 32);
}

var inertiaY = 0;
var gravity = .5;

var robotX = 500;
var robotY = 100;

var direction = 1;

var waitIndex = 0;

var canvas = null;
var ctx = null;
var keys = new Array();

var mouse_down = false;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();


function animate() {
    requestAnimFrame( animate );
    game_loop();
}


function init() {
    load_images();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', event_mousedown, false);
    canvas.addEventListener('mousemove', event_mousemove, false);
    canvas.addEventListener('mouseup', event_mouseup, false);
    animate();
}

function event_mousedown(event) {
    draw_tile(event);
    mouse_down = true;
}

function event_mouseup(event) {
    mouse_down = false;
}

function event_mousemove(event) {
    if(mouse_down == true){
        draw_tile(event);
    }
}

function draw_tile(event) {
    var x;
    var y;

    if (event.layerX || event.layerX == 0) { // Firefox
      x = event.layerX;
      y = event.layerY;
    } else if (event.offsetX || event.offsetX == 0) { // Opera
      x = event.offsetX;
      y = event.offsetY;
    }
    //console.log("x: " + x + "  window offset: " + window_x);
    //console.log("y: " + y + "  window offset: " + window_y);

    if(y < 65) {
        if(x < 230) {
            tile = menu_images(x - 4, y);
            do_option(tile);
        }
        if(x > 230) {
            menu_pixel_to_tile(x - 230 - 4, y);
        }
    } else {
        set_tile(x - window_x - 4, y - window_y - 4);
    }
}

function do_option(option) {
    console.log(option);
    switch(option) {
        case 2:
            save_map();
            break;
        case 1:
            break;

        default:
            break;
    }

}

function menu_images(x, y) {
    x_tile = x >> 5;
    y_tile = y >> 5;
    return y_tile * 7 + x_tile;

}

function game_loop() {
    get_input();
    clear_screen();
    draw_map();
    draw_hud();
}

function draw_menu_tiles() {
    var x_start = 230;
    if(current_set == MONSTER_SET) {
        menu_offset = 0;
        min_i = 0;
        max_i = 16;
    } else if(current_set == CONTROL_SET) {
        menu_offset = 16;
        min_i = 16;
        max_i = 80;
    } else if(current_set == TILE_SET) {
        menu_offset = 96;
        min_i = 96;
        max_i = 160;
    }
    var inc = 0;
    for(var i = min_i; i < max_i; ++i) {
        var sx = i%16 * 32;
        var sy = Math.floor(i/16) * 32;
        ctx.drawImage(map_img, sx, sy, 32, 32, x_start + (inc%16 * 16), Math.floor(inc/16) * 16, 16, 16);
        inc++;
    }
}

function get_maps_by_user_id(user_id)
{
    $.get("DoctorRobot.php?getMapsByUserId|" + user_id, {}, function(data) {
        var options = $("#level_id");
        var lines = data.split("\n");
        options.append("<option value='0'>Select a Map</option>");
        for(var i = 0; i < lines.length; ++i) {
            var line = lines[i].split("|");
            options.append("<option value='" + line[1] + "'>" + line[0] + "</option>");
        }

    });

}

function menu_pixel_to_tile(x, y) {
    x_tile = x >> 4;
    y_tile = (y + menu_offset) >> 4;
    console.log("selected tile: " + x_tile + ":" + y_tile);
    console.log("selected tile: " + y_tile * 16 + x_tile);
    current_tile = y_tile * 16 + x_tile;
}

function changeTiles(id) {
    current_set = id;
    draw_menu_tiles();
}

function draw_hud() {
    ctx.drawImage(tile_img, 0, 0, canvas.width, 70);
    //draw_tiles();
    //draw_text("tile id: " + current_tile, 40, 6);
    //ctx.drawImage(tile_img, 0, 0, 36, 36);
    ctx.drawImage(menu_background_img, 0, 0, 230, 64);
    draw_current_tile();
    draw_menu_tiles();
    //draw_text("key  id: " + current_key_id, 40, 18);
}

function drawRectangle(x, y, w, h, fill) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.stroke();
    if (fill) ctx.fill();
}

function draw_enemies() {
    waitIndex++;
    for(i = 0; i < enemies.length; ++i) {
            ctx.drawImage(enemy_img, 0, 0, 32, 48,
                enemies[i].x + window_x,enemies[i].y + window_y, 32, 48);
    }
}

function map_iterate(func) {
    if(map) {
    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            func(x, y);
        }
    }
    }
}

function draw_map() {
    map_iterate(function(x, y) {
        var x_pos = window_x + x * 32;
        var y_pos = window_y + y * 32;
        if(x_pos > -32 || x_pos < ctx.width || y_pos > -32 || y_pos < ctx.height) {
            var index = map[y][x];
            var sx = index%16 * 32;
            var sy = Math.floor(index/16) * 32;
            ctx.drawImage(map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
        }
    });
}


function draw_map2() {
    if(map) {
    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            var x_pos = window_x + x * 32;
            var y_pos = window_y + y * 32;
            if(x_pos < -32 || x_pos > ctx.width || y_pos < -32 || y_pos > ctx.height) {
                continue;
            }
            var index = map[y][x];
            if(index >= 0) {
                var sx = index%10 * 32;
                var sy = Math.floor(index/10) * 32;
                if(map[y][x] >= 0) {
                    ctx.drawImage(map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
                }
            } else {
                ctx.drawImage(enemy_img, 0, 0, 32, 48, x_pos, y_pos - 16, 32, 48);
            }
        }
    }
    }
}

function draw_text(str, x, y) {
    str = str.toUpperCase();
    for (var i=0; i<str.length; i++){
        var index = str.charCodeAt(i) - 32;
        var sx = index%10 * 10;
        var sy = Math.floor(index/10) * 10;
        ctx.drawImage(font_img, sx, sy, 10, 10,
                      x + (i * 12) , y, 10, 10);
    }
}

function get_input() {
    if(key_timer > key_delay) {
        key_timer = 0;
    if(88 in keys && keys[88]){
        dude_fire();
    }
    standing = true;
        if ((37 in keys && keys[37]) || (21 in keys && keys[21]) || (65 in keys && keys[65])){ //left
            //robotX -= 2;
            window_x += 16;
        }
        if ((39 in keys && keys[39]) || (22 in keys && keys[22]) || (68 in keys && keys[68])){ //right
            //robotX += 2;
            window_x -= 16;
        }
        if ((38 in keys && keys[38]) || (21 in keys && keys[21]) || (65 in keys && keys[65])){ //left
            //robotX -= 2;
            window_y += 16;
        }
        if ((40 in keys && keys[40]) || (22 in keys && keys[22]) || (68 in keys && keys[68])){ //right
            //robotX += 2;
            window_y -= 16;
        }

    if ((219 in keys && keys[219]) || (219 in keys && keys[219]) || (219 in keys && keys[219])){ //right
        if(current_tile > 0) {
            current_tile--;
        }
    }
    if ((221 in keys && keys[221]) || (221 in keys && keys[221]) || (221 in keys && keys[221])){ //right
            current_tile++;
    }
    if(90 in keys && keys[90]){

    }
    }
    key_timer++;
}

function clear_screen() {
    ctx.drawImage(tile_img, 0, 0, canvas.width, canvas.height);
}

function list_maps() {
    // jquery get maps from server
}

function save_map() {
    var map_string = '';
    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            map_string += (map[y][x]) + 1;
            if (x < map[0].length - 1) {
                map_string += ",";
            }
        }
        map_string += "\n";
    }
    console.log(map_string);

    $.post("http://scoab/play/doctor-robot/DoctorRobot.php?saveMap",{id:current_level, tiles:map_string, name:"mud"},function(data) {
       alert("Map saved");
     });
    return false;

}
get_maps_by_user_id(1);
window.onload = init;
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);
function keyDown(evt){ keys[evt.keyCode] = true; current_key_id = evt.keyCode; }
function keyUp(evt){ keys[evt.keyCode] = false; }
