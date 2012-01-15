/* TODO
move config to an external file
move animation frame numbers to an external file
code non-blocking graphic tiles
code tile switches
 */

var map;
var map_loaded = false;
var current_level = '0';

// control tiles
var PLAYER_START = 1;
var ENEMY_1_START = 3;
var ENEMY_2_START = 4;

var SWITCH_LEFT = 32;
var SWITCH_FLOOR = 33;
var SWITCH_RIGHT = 34;
var SWITCH_SHOOTABLE_LEFT = 35;
var SWITCH_SHOOTABLE_RIGHT = 36;
var SWITCH_TOGGLE_LEFT = 37;
var SWITCH_TOGGLE_RIGHT = 38;

var DOOR_TOP = 40;
var DOOR_BOTTOM = 41;
var DOOR_LEFT = 42;
var DOOR_RIGHT = 43;

var SWITCH_1 = 16;
var SWITCH_2 = 17;
var SWITCH_3 = 18;
var SWITCH_4 = 19;
var SWITCH_5 = 20;
var SWITCH_6 = 21;
var SWITCH_7 = 22;
var SWITCH_8 = 23;

var DOOR_1 = 24;
var DOOR_2 = 25;
var DOOR_3 = 26;
var DOOR_4 = 27;
var DOOR_5 = 28;
var DOOR_6 = 29;
var DOOR_7 = 30;
var DOOR_8 = 31;

// animation sequence ids
var WALK_LEFT = 0;
var WALK_RIGHT = 1;
var JET_LEFT = 2;
var JET_RIGHT = 3;
var STAND_LEFT = 4;
var STAND_RIGHT = 5;
var STAND = 6;
var CROUCH_LEFT = 7;
var CROUCH_RIGHT = 8;
var DEACTIVATED = 0;
var ACTIVATED = 1;
var DEACTIVATING = 2;
var ACTIVATING = 3;
var OPEN = 4;
var CLOSED = 5;

// enemies
var enemies = new Array();
var enemy_bullet_timer = 4;
var max_enemy_bullets = 100;
var enemy_bullets = new Array(max_enemy_bullets);
var enemy_anim = new Array();
enemy_anim[WALK_RIGHT] = [3, 4, 5];
enemy_anim[WALK_LEFT] = [0, 1, 2];
enemy_anim[STAND] = [6, 6, 6];

// particles
var max_particles = 1000;
var particles = new Array(max_particles);


// player
var robot_x;
var robot_y;
var has_jetpack;
var jetpack_fuel;
var grounded = true;
var crouching = false;
var player_dead = false;
var robot_frame = 0;
var direction = 1;
var anim = new Array();
anim[WALK_RIGHT] = [0, 1, 2, 3, 4, 5];
anim[WALK_LEFT] = [8, 7, 6, 11, 10, 9];
anim[JET_RIGHT] = [15, 16, 17];
anim[JET_LEFT] = [12, 13, 14];
anim[STAND_LEFT] = [18];
anim[STAND_RIGHT] = [19];
anim[CROUCH_LEFT] = [20];
anim[CROUCH_RIGHT] = [21];
var current_anim = anim[WALK_RIGHT];

// player bullets
var bullet_timer = 4;
var max_bullets = 10;
var bullets = new Array(max_bullets);
var bullet_speed = 8;

// environment
var window_x = 0;
var window_y = 0;
var reset_level = false;
var reset_timer = 0;
var animating = false;

var inertiaX = 0;
var inertiaY = 0;
var gravity = .5;

var waitIndex = 0;
var frameRate = 6;

var canvas = null;
var ctx = null;
var keys = new Array();

// entities
var entities = new Array();
var entity_anim = new Array();
entity_anim[ACTIVATED] = [0, 1, 2];
entity_anim[DEACTIVATED] = [3, 4, 5];

var door_anim = new Array();
door_anim[ACTIVATED] = [5, 4, 3, 2, 1, 0];
door_anim[DEACTIVATED] = [0, 1, 2, 3, 4, 5];


// images
var alert_jetpack_img = new Image();
var font_img = new Image();
var tile_img = new Image();
var dude_img = new Image();
var enemy_img = new Image();
var enemy_2_img = new Image();
var map_img = new Image();
var bullet_img = new Image();
var parallax_img = new Image();
var images = new Array();
images['switch_1'] = new Image();
images['door_1'] = new Image();
images['door_2'] = new Image();
images['door_3'] = new Image();
images['door_4'] = new Image();
images['jetpack_icon'] = new Image();
images['teleport_1'] = new Image();


function load_map(level) {
    if(level > 1) {
        level = 0;
        current_level = 0;
    }
    var request = new XMLHttpRequest();
    request.open('GET', 'http://scoab/maps/level_'+level+'.txt');
    //request.open('GET', 'http://badbattery.com/maps/level_'+level+'.txt');
    request.onreadystatechange = function() {
        if (request.readyState != 4 || request.status != 200) {
          return;
        }
        parse_map(request.responseText);
        initialize_data();
    };
    request.send(null);
}

function parse_map(map_data) {
    var rows = map_data.split('\n');
    map = new Array(rows.length);
    for(var y = 0; y < rows.length; ++y) {
        var cols = rows[y].split(',');
        map[y] = new Array(cols.length);
        for(var x = 0; x < cols.length; ++x) {
            map[y][x] = cols[x] - 1;
        }
    }
    map_loaded = true;
}

function load_images() {
    alert_jetpack_img.src = 'images/jetpack.png';
    font_img.src = 'images/small_font.gif';
    tile_img.src = 'images/tiles.png';
    dude_img.src = 'images/dude_2.png';
    //map_img.src = 'images/map.png';
    map_img.src = 'images/Infiltrator.png';
    bullet_img.src = 'images/bullet.png';
    enemy_img.src = 'images/enemy_1.png';
    enemy_2_img.src = 'images/enemy_2.png';
    parallax_img.src = 'images/parallax.png';
    images['switch_1'].src = 'images/switch_1.png';
    images['teleport_1'].src = 'images/switch_1.png';
    images['door_1'].src = 'images/door_1.png';
    images['door_2'].src = 'images/door_2.png';
    images['door_3'].src = 'images/door_3.png';
    images['door_4'].src = 'images/door_4.png';
    images['jetpack_icon'].src = 'images/jetpack_icon.png';
}

function pixel_to_tile(x, y) {
    var x_tile = x >> 5;
    var y_tile = y >> 5;
    var tile = map[y_tile][x_tile];
    if(tile > 47) {
        return map[y_tile][x_tile];
    } else {
        return 0;
    }
}

function draw_map() {
    map_iterate(function(x, y) {
        if(map[y][x] > 47) {
            var x_pos = window_x + x * 32;
            var y_pos = window_y + y * 32;
            if(x_pos > -32 || x_pos < ctx.width || y_pos > -32 || y_pos < ctx.height) {
                var index = map[y][x];
                var sx = index%16 * 32;
                var sy = Math.floor(index/16) * 32;
                ctx.drawImage(map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
            }
        }
    });
}


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    current_level = 0;
    load_map("0");
}

function initialize_data() {

    load_images();

    player_dead = false;

    initialize_player();

    window_x = 200 - robot_x;
    window_y = 100 - robot_y;

    enemies = new Array();
    entities = new Array();
    enemy_bullets = new Array(max_enemy_bullets);
    bullets = new Array(max_bullets);
    particles = new Array(max_particles);
    make_bullets();
	make_particles();

    make_entities();
    make_enemies();
    make_enemy_bullets();

    if(!animating) {
        animate();
        animating = true;
    }
}

function initialize_player() {
    map_iterate(function(x, y) {
        if(map[y][x] == PLAYER_START) {
            robot_x = x * 32;
            robot_y = y * 32 - 20;
        }
    });
    //has_jetpack = false;
    //jetpack_fuel = 0;
    has_jetpack = true;
    jetpack_fuel = 200;

}

function make_entities() {
    // have to make switches before doors
    // switches and trampolines
    map_iterate(function(x, y) {
        if(map[y][x] > 15 && map[y][x] < 32) {
            entities.push(make_entity(x, y, map[y][x]));
        }
    });
    map_iterate(function(x, y) {
        if(map[y][x] > 31 && map[y][x] < 48) {
            entities.push(make_entity(x, y, map[y][x]));
        }
    });
    map_iterate(function(x, y) {
        if(map[y][x] > 8 && map[y][x] < 16) {
            entities.push(make_entity(x, y, map[y][x]));
        }

    })
}

function map_iterate(func) {
    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            func(x, y);
        }
    }
}

function get_trigger(id){
    for(var i = 0; i < entities.length; ++i) {
        if(entities[i].type == id - 16) {
            return entities[i];
        }
    }
    return 0;
}

function get_target(id) {
    for(var i = 0; i < entities.length; ++i) {
        if(entities[i].type == id + 16) {
            return entities[i];
        }
    }
    return 0;
}

function make_entity(x, y, type) {

    var entity = new Array();
    entity.image = new Image();

    var north = map[y-1][x];
    var east = map[y][x+1];
    var south = map[y+1][x];
    var west = map[y][x-1];

    if(north > 0) {
        if(north == DOOR_TOP) {
            entity.image = images[DOOR_TOP];
        }
    } else if(east > 0){
        if(east == SWITCH_LEFT) {
            entity.image = images[SWITCH_LEFT];
        }
    } else if(south > 0) {
        if(south == SWITCH_FLOOR) {
            entity.image = images[SWITCH_FLOOR];
        }
    } else if(west > 0) {
        if(west == SWITCH_RIGHT) {
            entity.image = images[SWITCH_RIGHT];
        }
    }

    if(map[y][x-1] == 48) {
        entity.image = new Image();
        entity.image = images['switch_1'];
        entity.current_anim = entity_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
        console.log('made a left switch');
    } else if(map[y+1][x] == 49) {
        entity.image = new Image();
        entity.image = images['teleport_1'];
        entity.current_anim = entity_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = OPEN;
        console.log('made a teleport pad');
    } else if(map[y-1][x] == 64) {
        console.log('made a top door');
        entity.image = new Image();
        entity.image = images['door_1'];
        entity.current_anim = door_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
        map[y][x] = 49;
    } else if(map[y+1][x] == 65) {
        console.log('made a bottom door');
        entity.image = new Image();
        entity.image = images['door_2'];
        entity.current_anim = door_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
        map[y][x] = 49;
    } else if(map[y][x-1] == 64) {
        console.log('made a left door');
        entity.image = new Image();
        entity.image = images['door_3'];
        entity.current_anim = door_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
        map[y][x] = 49;
    } else if(map[y][x+1] == 64) {
        console.log('made a top door');
        entity.image = new Image();
        entity.image = images['door_4'];
        entity.current_anim = door_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
        map[y][x] = 49;
    } else if(type == '9') {
        console.log('made a jetpack');
        entity.image = new Image();
        entity.image = images['jetpack_icon'];
        //entity.image = images['door_2'];
        entity.current_anim = door_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
    } else if (type == '15') {
        console.log('made an exit');
        //entity.image = new Image();
        //entity.image = images['jetpack_icon'];
        //entity.image = images['door_2'];
        entity.current_anim = door_anim[ACTIVATED];
        //entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
    } else if (type == '10') {
        console.log('made a trampoline');
        //entity.image = new Image();
        //entity.image = images['jetpack_icon'];
        //entity.image = images['door_2'];
        entity.current_anim = door_anim[ACTIVATED];
        //entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
    } else {
        console.log('made something else');
        entity.image = new Image();
        entity.image = images['door_2'];
        entity.current_anim = door_anim[ACTIVATED];
        entity.frame = entity.current_anim.length - 1;
        entity.state = ACTIVATED;
        map[y][x] = 32;
    }
    entity.is_being_pushed = false;
    entity.type = type;
    entity.tile_x = x;
    entity.tile_y = y;
    entity.x = x * 32;
    entity.y = y * 32;
    entity.frame = 0;
    entity.wait_index = 0;
    entity.alive = true;
    return entity;
}

function make_enemies() {
    for(var y = 0; y<map.length; y++) {
        for(var x = 0; x< map[0].length; x++) {
            if(map[y][x] == ENEMY_1_START || map[y][x] == ENEMY_2_START) {
                enemies.push(make_enemy(x, y, map[y][x]));
            }
        }
    }
}

function make_enemy(x, y, type) {

    var enemy = new Array();
    if(type == 3) {
        enemy.image = enemy_img;
    } else if (type == 4) {
        enemy.image = enemy_2_img;
    }
    enemy.type = type;
    enemy.direction = 1;
    enemy.x = x * 32;
    enemy.y = y * 32 - 18;
    enemy.current_anim = enemy_anim[WALK_LEFT];
    enemy.frame = 0;
    enemy.wait_index = 0;
    enemy.bullet_timer = 21;
    enemy.alive = true;
    return enemy;
}

function make_enemy_bullets() {
    for(var i = 0; i < max_enemy_bullets; ++i) {
        enemy_bullets[i] = new Array();
        enemy_bullets[i].alive = false;
        enemy_bullets[i].bullet_timer = 10;
    }
}

function make_particles() {
	for(var i = 0; i < max_particles; i++) {
		particles[i] = new Array();
		particles[i]['alive'] = false;
		particles[i]['x_vel'] = Math.floor(Math.random()*10 - 5);
		particles[i]['y_vel'] = Math.floor(Math.random()*10 - 5);
		particles[i]['age'] = 0;
	}
}

function make_bullets() {
    for(var i = 0; i < max_bullets; i++) {
        bullets[i] = new Array();
        bullets[i]['alive'] = false;
    }
}

function animate() {
    window.requestAnimFrame(animate);
    game_loop();
}

function game_loop() {
    get_input();
    move_stuff();
    clear_screen();
    //draw_parallax();
    draw_map();
	draw_particles();
    draw_bullets();
    if(!player_dead) {
        draw_dude();
    }
    draw_enemies();
    draw_entities();
    draw_enemy_bullets();
    draw_hud();
    if(reset_level) {
        resetting_level();
    }
}

function draw_parallax() {
    ctx.drawImage(parallax_img, 0, 0, 512, 512, window_x >> 4, window_y >> 4, 512, 512);
}

function draw_particles() {
	for(var i = 0; i < max_particles; ++i) {
		if(particles[i]['alive']) {
            if(particles[i]['col'] == 'red') {
                ctx.fillStyle = "#" + (99 - particles[i]['age']) + "0000";
            } else if(particles[i]['col'] == 'gray') {
                ctx.fillStyle = "#" + (99 - particles[i]['age']) + "7777";
            } else {
                ctx.fillStyle = "#" + (99 - particles[i]['age']) + "7777";
            }
			drawRectangle(particles[i]['x'] + window_x, particles[i]['y'] + window_y, particles[i].size, particles[i].size, true);
		}
	}
}

function resetting_level() {
    reset_timer++;
    if(reset_timer > 100) {
        reset_level = false;
        reset_timer = 0;
        load_map(current_level);
        //initialize_data();
    }
}

function move_bullets() {
    bullet_timer++;
    for(var i = 0; i < max_bullets; ++i) {
        if(bullets[i]['alive']) {
            bullets[i]['x'] += bullet_speed * bullets[i]['direction'];
            if(bullets[i]['x'] > canvas.width - window_x || bullets[i]['x'] < 0 - window_x) {
				bullets[i]['alive'] = false
			} else if (pixel_to_tile(bullets[i]['x'], bullets[i]['y']) > 0) {
				bullets[i]['x'] -= bullet_speed * bullets[i]['direction']; // back the bullet up
                bullets[i]['alive'] = false;
                fire_particles(bullets[i]['x'], bullets[i]['y'], 2, 'red');
            } else {
                for(var j = 0; j < enemies.length; ++j) {
                    if(enemies[j].alive) {
                        if(bullets[i] && intersect(bullets[i].x, bullets[i].y, 4, 4,
                            enemies[j].x + 10, enemies[j].y, 12, 48)) {
                            enemies[j].alive = false;
                            bullets[i].alive = false;
                            fire_particles(bullets[i]['x'], bullets[i]['y'], 2, 'red');
                            fire_particles(enemies[j]['x'] + 16, enemies[j]['y']+ 16, 4,'red');
                        }
                    }
                }
            }
        }
    }
}

function move_particles() {
    for(var i = 0; i < max_particles; ++i) {
   		particles[i]['age']++;
   		if(particles[i]['age'] > 100) { particles[i]['alive'] = false; particles[i]['age'] = 0; }
   		if(particles[i]['alive']) {
               particles[i]['x'] += particles[i]['x_vel'];
   			if(pixel_to_tile(particles[i]['x'], particles[i]['y']) > 0) {
   				particles[i]['x'] -= particles[i]['x_vel'];
   				particles[i]['x_vel'] = -particles[i]['x_vel'];
   			}
   			particles[i]['y_vel'] += .3 / particles[i].size;
               particles[i]['y'] += particles[i]['y_vel'];
   			if(pixel_to_tile(particles[i]['x'], particles[i]['y']) > 0) {
   				particles[i]['y'] -= particles[i]['y_vel'] * gravity / particles[i].size;
                   particles[i]['y_vel'] = -particles[i]['y_vel'];
   			}
   		}
   	}

}

function move_stuff() {
    move_bullets();
    move_particles();
    inertiaY = inertiaY + gravity;
    robot_y += inertiaY;
    if(pixel_to_tile(robot_x + 8, robot_y+15) > 0 || pixel_to_tile(robot_x + 24, robot_y+15) > 0) {
        robot_y -= inertiaY;
        inertiaY = 0;
    } else if(pixel_to_tile(robot_x + 8, robot_y+48) > 0 || pixel_to_tile(robot_x + 24, robot_y + 48) > 0) {
        robot_y -= inertiaY;
        inertiaY = 0;
        grounded = true;
    } else {
        grounded = false;
    }
    move_entities();
    move_enemies();
    move_enemy_bullets();
}

function draw_hud() {
    ctx.drawImage(tile_img, 0, 0, canvas.width, 15);
    if(jetpack_fuel > 0) {
        draw_text("JETPACK", 5, 2);
        ctx.fillStyle = "#990000";
        drawRectangle(92, 2, jetpack_fuel, 10, true);
    }
}

function fire_particles(x, y, size, col) {
	var num_particles = 10;
	for(var i = 0; i < max_particles; ++i) {
		if(!particles[i]['alive']) {
			particles[i]['alive'] = true;
			particles[i]['x'] = x;
            particles[i]['y'] = y;
			particles[i]['age'] = 0;
            particles[i]['size'] = size;
            particles[i]['col'] = col;
			num_particles--;
			if(num_particles < 0) {
				break;
			}
		}
	}
}

function move_enemies() {
    for(var i = 0; i < enemies.length; ++i) {
        if(enemies[i].alive) {
            if(vertical_intersect(enemies[i].y, 48, robot_y, 48)) {
                if(enemies[i].x > robot_x) {
                    enemies[i].direction = -1;
                } else {
                    enemies[i].direction = 1;
                }
                if(enemies[i].bullet_timer < 20) {
                    enemies[i].bullet_timer++;
                } else {
                    enemy_fire(enemies[i].x, enemies[i].y, enemies[i].direction);
                    enemies[i].bullet_timer = 0;
                }
                if(enemies[i].direction == -1) {
                    enemies[i].current_anim = enemy_anim[WALK_RIGHT];
                } else {
                    enemies[i].current_anim = enemy_anim[WALK_LEFT];
                }
                continue;  // we're done here, robot stops and shoots
            }

            enemies[i].x += enemies[i].direction;
            if(pixel_to_tile(enemies[i].x, enemies[i].y + 40) > 0 ||
                pixel_to_tile(enemies[i].x + 32, enemies[i].y + 40) > 0) {
                enemies[i].direction = -enemies[i].direction;
                enemies[i].x += enemies[i].direction;
            }
            if(pixel_to_tile(enemies[i].x + 32, enemies[i].y + 50) == 0 ||
                pixel_to_tile(enemies[i].x, enemies[i].y + 50) == 0) {
                enemies[i].direction = -enemies[i].direction;
            }
            enemies[i].y += 1;
            if(pixel_to_tile(enemies[i].x, enemies[i].y + 47) > 0 ||
                pixel_to_tile(enemies[i].x + 32, enemies[i].y + 47) > 0) {
                enemies[i].y -= 1;
            }
            if(enemies[i].direction == -1) {
                enemies[i].current_anim = enemy_anim[WALK_RIGHT];
            } else {
                enemies[i].current_anim = enemy_anim[WALK_LEFT];
            }
        }
    }
}

function move_entities() {
    // make sure the entities are even on the screen
    var i;
    for(i = 0; i < entities.length; ++i) {
        if(entities[i].type > 8 && entities[i].type < 16) {
            if(intersect(robot_x, robot_y+32,32, 32, entities[i].x, entities[i].y, 32, 32 )) {
                if(entities[i].type == 9) {
                    entities[i].alive = 0;
                    has_jetpack = true;
                    jetpack_fuel = 200;
                } else if(entities[i].type == 15) {
                    current_level++;
                    load_map(current_level);
          p      }
            }
            if (contains(robot_x, robot_y+16,32, 32, entities[i].x, entities[i].y, 32, 32 )) {
                if(entities[i].type == 10) {
                    if(grounded) {
                        // play animation
                        standing = false;
                        inertiaY = -15;
                        grounded = false;
                    }
                }
            }
        }
    }
    if(jetpack_fuel < 0) {
        has_jetpack = false;
    }
    for(i = 0; i < entities.length; ++i) {
        if(entities[i].type > 15 && entities[i].type < 32) {
            var target = get_target(entities[i].type);
            if (entities[i].state == OPEN && contains(robot_x, robot_y+16,32, 32, entities[i].x, entities[i].y, 32, 32 )) {
                console.log('teleport');
                robot_x = target.x;
                robot_y = target.y - 20;
                target.state = CLOSED;
            } else {
                if(entities[i].state == CLOSED && !intersect(robot_x, robot_y+16,32, 32, entities[i].x, entities[i].y, 32, 32 )) {
                    entities[i].state = OPEN;
                }
            }
            if(intersect(robot_x, robot_y + 16, 32, 32, entities[i].x, entities[i].y, 32, 32)) {
                if(!entities[i].is_being_pushed && entities[i].state == ACTIVATED) {
                    entities[i].state = DEACTIVATED;
                    entities[i].current_anim = entity_anim[DEACTIVATED];
                    entities[i].wait_index = 0;
                    entities[i].frame = 0;
                    entities[i].is_being_pushed = true;
                } else if (!entities[i].is_being_pushed && entities[i].state == DEACTIVATED) {
                    entities[i].state = ACTIVATED;
                    entities[i].wait_index = 0;
                    entities[i].current_anim = entity_anim[ACTIVATED];
                    entities[i].frame = 0;
                    entities[i].is_being_pushed = true;
                }
            } else {
                entities[i].is_being_pushed = false;
            }
        }
    }
    for(i = 0; i < entities.length; ++i) {
        if(entities[i].type > 31 && entities[i].type < 48) {
            var trigger = get_trigger(entities[i].type);
            if (entities[i].state == OPEN && contains(robot_x, robot_y+16,32, 32, entities[i].x, entities[i].y, 32, 32 )) {
                console.log('could teleport');
                console.log('teleport');
                robot_x = trigger.x;
                robot_y = trigger.y - 20;
                trigger.state = CLOSED;
            } else {
                if(entities[i].state == CLOSED && !intersect(robot_x, robot_y+16,32, 32, entities[i].x, entities[i].y, 32, 32 )) {
                    entities[i].state = OPEN;
                }

            }
            if(trigger.state == DEACTIVATED && !entities[i].state == DEACTIVATED) {
                entities[i].state = DEACTIVATED;
                entities[i].current_anim = door_anim[DEACTIVATED];
                entities[i].frame = 0;
                map[entities[i].tile_y][entities[i].tile_x] = 0;

            } else if(trigger.state == ACTIVATED && !entities[i].state == ACTIVATED) {
                entities[i].state = ACTIVATED;
                map[entities[i].tile_y][entities[i].tile_x] = 49;
                entities[i].current_anim = door_anim[ACTIVATED];
                entities[i].frame = 0;
                 for(var j = 0; j < enemies.length; ++j) {
                    if(enemies[j].alive) {
                        if(entities[i] && intersect(entities[i].x, entities[i].y, 32, 32,
                            enemies[j].x + 10, enemies[j].y, 12, 48)) {
                            trigger.state = DEACTIVATED;
                            enemies[j].alive = false;
                            fire_particles(enemies[j]['x'] + 16, enemies[j]['y']+ 16, 4,'red');
                        }
                    }
                }
            }
        }

    }
}

function move_enemy_bullets() {
    enemy_bullet_timer++;
    var y_offset;

    if(crouching) {
        y_offset = 30;
    } else {
        y_offset = 10;
    }
    var robot_y_top = robot_y + y_offset;
    for(var i = 0; i < enemy_bullets.length; ++i) {
        //console.log(enemy_bullets.length);
        if(enemy_bullets[i].alive) {
            enemy_bullets[i].x += 4 * enemy_bullets[i].direction;
            if(enemy_bullets[i]['x'] > canvas.width - window_x || enemy_bullets[i]['x'] < 0 - window_x) {
                enemy_bullets[i].alive = false;
			} else if (pixel_to_tile(enemy_bullets[i]['x'], enemy_bullets[i]['y']) > 0) {
                enemy_bullets[i]['x'] -= bullet_speed * enemy_bullets[i]['direction']; // back the bullet up
                enemy_bullets[i].alive = false;
				fire_particles(enemy_bullets[i]['x'], enemy_bullets[i]['y'], 2, 'red');
            } else {
                if(intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4, robot_x + 10, robot_y_top, 12, 48 - y_offset)) {
                    //enemies[j].alive = false;
                    enemy_bullets[i].alive = false;
                    fire_particles(enemy_bullets[i]['x'], enemy_bullets[i]['y'], 2, 'red');
                    fire_particles(robot_x + 16, robot_y + 16, 4,'grey');
                    reset_level = true;
                    player_dead = true;
                }
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

function enemy_fire(x, y, direc) {

    for(var i = 0; i < enemy_bullets.length; ++i) {
        if(!enemy_bullets[i].alive) {
            enemy_bullets[i].x = x + 26;
            enemy_bullets[i].y = y + 16;
            enemy_bullets[i].direction = direc;
            enemy_bullets[i].alive = true;
            break;
        }
    }
}

function dude_fire() {
    if(bullet_timer > 10) {
        bullet_timer = 0;
        for(var i = 0; i < max_bullets; ++i) {
            if(!bullets[i]['alive']) {
                bullets[i]['x'] = robot_x + 26;
                bullets[i]['y'] = robot_y + 25;
                if(crouching) {
                    bullets[i]['y'] += 10;
                }
                bullets[i]['direction'] = direction;
                bullets[i]['alive'] = true;
                break;
            }
        }
    }
}

function draw_enemy_bullets() {
    for(var i = 0; i < enemy_bullets.length; ++i) {
        if(enemy_bullets[i].alive) {
            ctx.drawImage(bullet_img, 0, 0, 4, 4, enemy_bullets[i].x + window_x, enemy_bullets[i].y + window_y, 4, 4);
        }
    }

}

function draw_bullets() {
    for(var i = 0; i < bullets.length; ++i) {
        if(bullets[i]['alive']) {
            ctx.drawImage(bullet_img, 0, 0, 4, 4, bullets[i]['x'] + window_x, bullets[i]['y'] + window_y, 4, 4);
        }
    }
}

function draw_enemies() {

    for(var i = 0; i < enemies.length; ++i) {
        enemies[i].wait_index++;
        if(enemies[i].alive) {
            if(enemies[i].wait_index > frameRate) {
                enemies[i].wait_index = 0;
                enemies[i].frame++;
            }
            if(enemies[i].frame >= enemies[i].current_anim.length) {
                enemies[i].frame = 0;
            }
            ctx.drawImage(enemies[i].image, enemies[i].current_anim[enemies[i].frame] * 32, 0, 32, 48,
                enemies[i].x + window_x,enemies[i].y + window_y, 32, 48);
        }
    }
}
function draw_entities() {
    for(var i = 0; i < entities.length; ++i) {
        entities[i].wait_index++;
        if(entities[i].alive) {
            if(entities[i].wait_index > frameRate) {
                entities[i].wait_index = 0;
                entities[i].frame++;
            }
            if(entities[i].frame >= entities[i].current_anim.length) {
                entities[i].frame = entities[i].current_anim.length - 1;
            }
            if(entities[i] && entities[i].image) {
                ctx.drawImage(entities[i].image,
                    entities[i].current_anim[entities[i].frame] * 32, 0, 32, 32,
                    entities[i].x + window_x,entities[i].y + window_y, 32, 32);
            }
        }
    }
}

function draw_dude() {
    waitIndex++;
    if(waitIndex > frameRate) {
        waitIndex = 0;
        if(grounded) {
            robot_frame++;
        }
    }
    if(robot_frame >= current_anim.length) {
        robot_frame = 0;
    }
    ctx.drawImage(dude_img, current_anim[robot_frame] * 32, 0, 32, 48,
        robot_x + window_x,robot_y + window_y, 32, 48);
}

function draw_text(str, x, y) {
    for (var i=0; i<str.length; i++){
        var index = str.charCodeAt(i) - 32;
        var sx = index%10 * 10;
        var sy = Math.floor(index/10) * 10;
        ctx.drawImage(font_img, sx, sy, 10, 10,
                      x + (i * 12) , y, 10, 10);
    }
}

function vertical_intersect(y, yh, y2, y2h) {
    return y + yh > y2 && y < y2 + y2h;

}

function intersect(sx, sy, sw, sh, tx, ty, tw, th) {
    return sx + sw > tx && sx < tx + tw && sy + sh > ty && sy < ty + th;
}

function contains(sx, sy, sw, sh, tx, ty, tw, th) {
    return sx + 5 > tx && sx + sw - 5 < tx + tw && sy + 5 > ty && sy + sh - 5 < ty + th;
}


function get_input() {
    if(88 in keys && keys[88]){
        dude_fire();
    }
    if(!player_dead) {
        var standing = true;
        if (37 in keys && keys[37]) { // || (21 in keys && keys[21]) || (65 in keys && keys[65])){ //left
            if(!crouching) {
                robot_x -= 3;
            }
            if(pixel_to_tile(robot_x, robot_y + 47) == 11) {
                window_x = 0;
                window_y = 0;
                current_level = '1';
                load_map(current_level);
            }
            if(pixel_to_tile(robot_x + 8, robot_y+32) > 0 || pixel_to_tile(robot_x + 24, robot_y + 32) > 0
                || pixel_to_tile(robot_x + 8, robot_y+15) > 0 || pixel_to_tile(robot_x + 24, robot_y+15) > 0
                || pixel_to_tile(robot_x + 8, robot_y+48) > 0 || pixel_to_tile(robot_x + 24, robot_y+48) > 0) {
                robot_x += 3;
                standing = true;
                current_anim = anim[STAND_LEFT];
            } else {
                current_anim = anim[WALK_LEFT];
            }
            direction = -1;
            standing = false;
        } else {
            inertiaX -= 1;
        }
        if (39 in keys && keys[39]) { //|| (22 in keys && keys[22]) || (68 in keys && keys[68])){ //right
            if(!crouching) {
                //inertiaX += 1;
                robot_x += 3;
            }
/*            if(pixel_to_tile(robot_x + 32, robot_y + 47) == 11) {
                //window_x = 0;
                //window_y = 0;
                current_level = '1';
                load_map(current_level);
            }
*/
            if(pixel_to_tile(robot_x + 24, robot_y+32) > 0 || pixel_to_tile(robot_x + 24, robot_y + 32) > 0 ||
              pixel_to_tile(robot_x + 24, robot_y+15) > 0 || pixel_to_tile(robot_x + 24, robot_y + 15) > 0
                || pixel_to_tile(robot_x + 8, robot_y+48) > 0 || pixel_to_tile(robot_x + 24, robot_y+48) > 0) {
                            //inertiaX -= 1;
                            robot_x -= 3;
                standing = true;
                current_anim = anim[STAND_RIGHT];
            } else {
                current_anim = anim[WALK_RIGHT];
            }
            direction = 1;
            standing = false;
        }

        if (40 in keys && keys[40]) { // DOWN
            if(grounded) {
                crouching = true;
            }
        } else {
            crouching = false;
        }
        if(90 in keys && keys[90]){
            if(grounded) {
                standing = false;
                inertiaY = -9;
                grounded = false;
            }
            if(has_jetpack) {
                inertiaY = -4;
                jetpack_fuel -= 1;
                if(direction > 0) {
                    current_anim = anim[JET_LEFT];
                } else {
                    current_anim = anim[JET_RIGHT];
                }
            }

    }
        if(standing) {
            if(direction > 0) {
                current_anim = anim[STAND_RIGHT];
            } else {
                current_anim = anim[STAND_LEFT];
            }

        }
        if(crouching && grounded) {
            if(direction > 0) {
                current_anim = anim[CROUCH_RIGHT];
            } else {
                current_anim = anim[CROUCH_LEFT];
            }
        } else if (crouching) {
            if(direction > 0) {
                current_anim = anim[STAND_RIGHT];
            } else {
                current_anim = anim[STAND_LEFT];
            }
        }
    }

    if(robot_x + window_x < 200) {
        window_x += 3;
    }
    if(robot_x + window_x > canvas.width - 200) {
        window_x -= 3;
    }
    if(robot_y + window_y <  100) {
        window_y += 8;
    }
    if(robot_y + window_y > canvas.height - 100) {
        window_y -= 8;
    }
    //energy++;
}

function clear_screen() {
    ctx.drawImage(tile_img, 0, 0, canvas.width, canvas.height);
}

window.onload = init;
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);
function keyDown(evt){ keys[evt.keyCode] = true; }
function keyUp(evt){ keys[evt.keyCode] = false; }
