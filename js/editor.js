var current_key_id;
var current_tile = 1;
var key_delay = 5;
var key_timer = 11;

var map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,1,1,1,1],
           [1,1,1,1,1,1,1,2,2,2,2,2,2,2,7,2,2,3,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,22,27,27,22,23,0,0,5,5,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,-1,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,22,0,0,5,5,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,3,0,0,5,5,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,0,-1,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
           [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
           ];

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
var map_img = new Image();
var bullet_img = new Image();
var menu_background_img = new Image();

function load_images() {
    font_img.src = 'images/small_font.gif';
    tile_img.src = 'images/tiles.png';
    dude_img.src = 'images/dude.png';
    map_img.src = 'images/map.png';
    bullet_img.src = 'images/bullet.png';
    enemy_img.src = 'images/enemy_1.png';
    menu_background_img.src = 'images/menu_background.png';
}

function pixel_to_tile(x, y) {
    x_tile = x >> 5;
    y_tile = y >> 5;
    return map[y_tile][x_tile];
}

function set_tile(x, y) {
    //console.log("setting tile");
    x_tile = x >> 5;
    y_tile = y >> 5;
    map[y_tile][x_tile] = current_tile;
}

function draw_tiles() {

    for(var i = 0; i < 20; ++i) {
        var sx = i%10 * 32;
        var sy = Math.floor(i/10) * 32;
        ctx.drawImage(map_img, sx, sy, 32, 32, i * 32, 0, 32, 32);
    }
}

function draw_current_tile() {
    if(current_tile >= 0) {
        var sx = current_tile%10 * 32;
        var sy = Math.floor(current_tile/10) * 32;
        ctx.drawImage(map_img, sx, sy, 32, 32, 16, 8, 32, 32);
    } else {
        ctx.drawImage(enemy_img, 0, 0, 32, 32, 16, 8, 32, 32);
    }
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
    animate();
}

function event_mousedown(event) {

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
    move_stuff();
    clear_screen();
    draw_map();
    draw_dude();
    draw_enemies();
    draw_hud();
}

function move_stuff() {
    inertiaY = inertiaY + gravity;
    robotY += inertiaY;
    if(pixel_to_tile(robotX, robotY+48) > 0 || pixel_to_tile(robotX + 32, robotY + 48) > 0
        || pixel_to_tile(robotX, robotY+15) > 0 || pixel_to_tile(robotX + 32, robotY+15) > 0) {
        robotY -= inertiaY;
        inertiaY = 0;
    }
}

function draw_menu_tiles() {
    var x_start = 230;
    for(var i = 0; i < 40; ++i) {
        var sx = i%10 * 32;
        var sy = Math.floor(i/10) * 32;
        ctx.drawImage(map_img, sx, sy, 32, 32, x_start + (i%20 * 32), Math.floor(i/20) * 32, 32, 32);
    }
}

function menu_pixel_to_tile(x, y) {
    x_tile = x >> 5;
    y_tile = y >> 5;
    console.log("selected tile: " + y_tile + ":" + x_tile);
    console.log("selected tile: " + y_tile * 20 + x_tile);
    current_tile = y_tile * 20 + x_tile;
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

function fire_particles(x, y, size) {
	num_particles = 10;
	for(i = 0; i < max_particles; ++i) {
		if(!particles[i]['alive']) {
			particles[i]['alive'] = true;
			particles[i]['x'] = x;
			particles[i]['y'] = y;
			particles[i]['age'] = 0;
            particles[i]['size'] = size;
			num_particles--;
			if(num_particles < 0) {
				break;
			}
		}
	}
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

function draw_map() {
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


function draw_dude() {
    ctx.drawImage(dude_img, 0, 0, 32, 48,
        robotX + window_x,robotY + window_y, 32, 48);
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

function save_map() {
    map_string = "[";
    for(y = 0; y<map.length; y++) {
        map_string += "[";
        for(x = 0; x< map[0].length; x++) {
            map_string += map[y][x];
            if (x < map[0].length - 1) {
                map_string += ",";
            }
        }
        map_string += "]";
        if (y < map.length - 1) {
            map_string += ",";
        }
    }
    map_string += "]\n";
    console.log(map_string);
}

window.onload = init;
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);
function keyDown(evt){ keys[evt.keyCode] = true; current_key_id = evt.keyCode; }
function keyUp(evt){ keys[evt.keyCode] = false; }
