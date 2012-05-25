/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, onevar: false, undef: true, sloppy: true, stupid: true, vars: true */

var version = "v0.1.0";

var god_mode = true;
var images_loaded = 0;

var mouseX = 0;
var mouseY = 0;
var mouseDown = false;
var mouseUp = false;


var game_state;
var INITIALIZE = 0;
var RUNNING = 2;
var INTERSTITIAL = 5;

var timer = 0;

game_state = INITIALIZE;
var map_name = "";
var static_time = '';

// interstitial IDs
var GET_READY = 999999;
var GAME_OVER = 999998;
var CREDITS =   999997;
var LEVEL_END = 999996;
var PAUSED =    999995;
var RESET_LEVEL = 999994;
var CHAPTERS =  999993;
var LEVELS =    999992;
var HELP =      999991;

var interstitialId = 0;

var SWITCH = 256;
var DOOR = 257;
var TELEPORTER = 258;

var map;
var map_loaded = false;
var current_level = '1';
var current_boss;

var saved_people = 0;
var total_people = 0;

var TILE_WIDTH = 32;

// control tiles
var T_EMPTY = 0;
var T_PLAYER_START = 1;
var T_ENEMY_1_START = 3;
var T_ENEMY_2_START = 4;
var T_ENEMY_3_START = 5;
var T_ENEMY_4_START = 6;

var T_BOSS_1_START = 7;
var T_PERSON = 8;
var T_JETPACK = 9;
var T_JUMPER = 10;
var T_CRATE = 11;
var T_FLUID = 12;
var T_PLATFORM = 14;
var T_EXIT = 15;

var EMPTY_BLOCKING = 255;

var fluid_anim = [0, 1, 2, 3];

var E_TELEPORTER = 49;
var E_SWITCH = 48;
var E_DOOR = 64;


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
var OPEN = 1;
var CLOSED = 0;

var splashScreen = null;
var pauseScreen = null;
var helpScreen = null;
var creditsScreen = null;
var chaptersScreen = null;
var levelsScreen = null;
var interstitial = null;
var level_end = null;
var gameover = null;
var key_pressed;
var keyIsDown = false;

var teleporter_anim = [];
teleporter_anim[OPEN] = [0, 1, 2, 3, 4];
teleporter_anim[CLOSED] = [5, 5, 5];

// enemies
var enemies = [];
var enemy_bullet_timer = 4;
var max_enemy_bullets = 100;
var enemy_bullets = [];
var enemy_anim = [];
enemy_anim[WALK_RIGHT] = [7, 6, 5, 4];
enemy_anim[WALK_LEFT] = [0, 1, 2, 3];
enemy_anim[STAND] = [6, 6, 6];

var BOSS_FULL = 0;
var BOSS_HALF = 1;
var BOSS_EMPTY = 2;

var boss_anim = [];
boss_anim[BOSS_FULL] = [0, 1, 2, 3, 4];
boss_anim[BOSS_HALF] = [5, 6, 7, 8, 9];
boss_anim[BOSS_EMPTY] = [10, 11, 12, 13, 14];

var person_anim = [];
person_anim[0] = [0];
person_anim[1] = [1];
person_anim[3] = [2, 3, 4, 5, 6, 7, 8, 9];

// particles
var max_particles = 500;
var particles = [];


// player
var player;
var robot_frame = 0;
var anim = [];
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
var bullets = [];
var bullet_speed = 8;

// environment
var window_x = 0;
var window_y = 0;
var reset_level = false;
var reset_timer = 0;
var animating = false;

var inertiaX = 0;
var inertiaY = 0;
var gravity = 0.5;

var waitIndex = 0;
var frameRate = 6;

var canvas = null;
var ctx = null;
var keys = [];

// entities
var entities = [];
var entity_anim = [];
entity_anim[ACTIVATED] = [0, 1, 2];
entity_anim[DEACTIVATED] = [3, 4, 5];

var door_anim = [];
door_anim[ACTIVATED] = [5, 4, 3, 2, 1, 0];
door_anim[DEACTIVATED] = [0, 1, 2, 3, 4, 5];

var jumper_anim = [];
jumper_anim[ACTIVATED] = [0, 1, 3, 5, 0];

var game_images = [];

// images
var splash_screen_img = new Image();
var alert_jetpack_img = new Image();
var game_over_img = new Image();
var chapters_img = new Image();
var hud_img = new Image();
var font_img = new Image();
var tile_img = new Image();
var dude_img = new Image();
var people_img = new Image();
var enemy_img = new Image();
var enemy_2_img = new Image();
var brain_1_img = new Image();
var map_img = new Image();
var bullet_img = new Image();
var parallax_img = new Image();
var images = [];
images.crate_1 = new Image();
images.platform_1 = new Image();
images.switch_1 = new Image();
images.switch_2 = new Image();
images.door_1 = new Image();
images.door_2 = new Image();
images.door_3 = new Image();
images.door_4 = new Image();
images.fluid_1 = new Image();
images.jetpack_icon = new Image();
images.teleport_1 = new Image();
images.teleport_2 = new Image();
images.jumper = new Image();
images.fuel_overlay = new Image();


function ImageManager() 
{
	"use strict";
	var 
	i,
    directory = "/play/doctor-robot/images/";

	this.load_image = function(img, name) {
		img.src = directory + name;
		img.onLoad = images_loaded++;
	};

    this.load_images = function() {

		game_images = [
			[alert_jetpack_img, 'jetpack.png'],
			[font_img, 'small_font.gif'],
			[tile_img, 'tiles.png'],
			[hud_img,'hud.png'],
			[dude_img,'dude_2.png'],
			[map_img,'Infiltrator.png'],
			[bullet_img,'bullet.png'],
			[enemy_img,'enemy_1b.png'],
			[people_img,'person_1.png'],
			[enemy_2_img,'enemy_2.png'],
			[brain_1_img,'brain_1.png'],
			[parallax_img, 'parallax.png'],
			[images.switch_1,'switch_1.png'],
			[images.switch_2, 'switch_2.png'],
			[images.teleport_1, 'teleport_1.png'],
			[images.teleport_2, 'teleport_2.png'],
			[images.crate_1, 'crate_1.png'],
			[images.platform_1, 'platform.png'],
			[images.door_1, 'door_1.png'],
			[images.door_2, 'door_2.png'],
			[images.door_3, 'door_3.png'],
			[images.door_4, 'door_4.png'],
			[images.fluid_1, 'fluid_1.png'],
			[images.jetpack_icon, 'jetpack_icon.png'],
			[images.fuel_overlay, 'fuel_overlay.png'],
			[images.jumper, 'jumper.png'],
			[splash_screen_img, 'splash_screen_2.png'],
			[splash_screen_img, 'splash_screen_2.png'],
			[game_over_img, 'game_over.png'],
			[chapters_img, 'chapters.png']
		];
		
		for(i = 0; i < game_images.length; ++i) {
			this.load_image(game_images[i][0], game_images[i][1]);
		}

    };

}

var image_manager;

function parse_map(map_data) {
	"use strict";

    var
	cols,
	x, y,
	rows = map_data.split('\n');

    map = [];
    map_name = rows[0];
    for(y = 1; y < rows.length; ++y) {
        cols = rows[y].split(',');
		if(cols[0] === '0') {
			break;
		}
        map[y-1] = [];
        for(x = 0; x < cols.length; ++x) {
			if(cols[x] === '') {
				break;
			}
            map[y-1][x] = cols[x] - 1;
        }
    }
    map_loaded = true;
}

function vertical_intersect(y, yh, y2, y2h) {
	"use strict";
    return y + yh > y2 && y < y2 + y2h;

}

function intersect(sx, sy, sw, sh, tx, ty, tw, th) {
	"use strict";
    return sx + sw > tx && sx < tx + tw && sy + sh > ty && sy < ty + th;
}

function contains(sx, sy, sw, sh, tx, ty, tw, th) {
	"use strict";
    return sx + 5 > tx && sx + sw - 5 < tx + tw && sy + 5 > ty && sy + sh - 5 < ty + th;
}

function on_top_of(sx, sy, sw, sh, tx, ty, tw, th) {
    return sx + sw > tx && sx < tx + tw && sy + sh -1 < ty && sy + sh + 1 > ty;
}

function fire_particles(x, y, size, col) {
	"use strict";

	var 
	i,
	num_particles = 10;

	for(i = 0; i < max_particles; ++i) {
		if(!particles[i].alive) {
			particles[i].alive = true;
			particles[i].x = x;
            particles[i].y = y;
			particles[i].age = 0;
            particles[i].size = size;
            particles[i].col = col;
			num_particles--;
			if(num_particles < 0) {
				break;
			}
		}
	}
}


function get_trigger(id){
	"use strict";
	var i;

    for(i = 0; i < entities.length; ++i) {
        if(entities[i].key === id - 16) {
            return entities[i];
        }
    }
    return 0;
}

function get_target(id) {
	"use strict";
	var i;
    for(i = 0; i < entities.length; ++i) {
        if(entities[i].key === id + 16) {
            return entities[i];
        }
    }
    return 0;
}
function pixel_to_tile(x, y) {
	"use strict";

    var 
	tile,
	x_tile = x >> 5,
    y_tile = y >> 5;

    try {
		tile = map[y_tile][x_tile];
		if(tile > 47) {
			return map[y_tile][x_tile];
		} else {
			return 0;
		}
    } catch(err) {
        return 0;
    }
}

function intersectedTile(entity) {
	"use strict";
    return pixel_to_tile(entity.x, entity.y) > 0;
}


function true_pixel_to_tile(x, y) {
	"use strict";
    var 
	x_tile = x >> 5,
    y_tile = y >> 5;
    return map[y_tile][x_tile];
}

function map_iterate(func) {
	"use strict";

	var x, y;

    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            func(x, y);
        }
    }
}


function make_bullets() {
	"use strict";

	var i;

    for(i = 0; i < max_bullets; i++) {
        bullets[i] = [];
        bullets[i].alive = false;
    }
}

function make_particles() {
	"use strict";

	var i;

	for(i = 0; i < max_particles; i++) {
		particles[i] = [];
		particles[i].alive = false;
		particles[i].x_vel = Math.floor(Math.random()*10 - 5);
		particles[i].y_vel = Math.floor(Math.random()*10 - 5);
		particles[i].age = 0;
	}
}
function Entity(x_t, y_t, tp, img, tile, key) {
	"use strict";

    this.x_tile = x_t;
    this.y_tile = y_t;
	this.direction = 1;
	this.y_index = 0;
    this.y_inertia = 0;
    this.type = tp;
    this.key = key;
    this.x = this.x_tile * TILE_WIDTH;
    this.y = this.y_tile * TILE_WIDTH;
    this.image = img;
    this.current_anim = door_anim[ACTIVATED];
    this.frame = current_anim.length - 1;
    this.state = ACTIVATED;
    this.is_teleportable = false;
    this.is_being_pushed = false;
    this.wait_index = 0;
    this.alive = true;
    this.loop_animation = false;
    map[this.y_tile][this.x_tile] = tile;

    this.draw = function() {
		var x_index;

        this.wait_index++;
        if(this.alive) {
            if(this.wait_index > frameRate) {
                this.wait_index = 0;
                this.frame++;
            }
            if(this.frame >= this.current_anim.length) {
                if(this.loop_animation) {
                    this.frame = 0;
                } else {
                    this.frame = this.current_anim.length - 1;
                }
            }
            if(this && this.image) {
				x_index = this.current_anim[this.frame];
/*
                if(this.type === 13) {
					y_index = 32;
				}
*/
                ctx.drawImage(this.image, 
							  x_index * 32, this.y_index, 32, 32,
							  this.x + window_x,this.y + window_y, 32, 32);
            }
        }

    };

    this.move = function() {
        // override this
    };
    this.check_player = function() {
        // override this
    };

}


function build_switch(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.move = function() {
        if(contains(player.x, player.y + 18, 32, 30, this.x, this.y, 32, 32)) {
            if(!this.is_being_pushed && this.state === ACTIVATED) {
                this.state = DEACTIVATED;
                this.current_anim = entity_anim[DEACTIVATED];
                this.wait_index = 0;
                this.frame = 0;
                this.is_being_pushed = true;
            } if (!this.is_being_pushed && this.state === DEACTIVATED) {
                this.state = ACTIVATED;
                this.wait_index = 0;
                this.current_anim = entity_anim[ACTIVATED];
                this.frame = 0;
                this.is_being_pushed = true;
            }
        }
        if(!intersect(player.x + 14, player.y + 18, 4, 30, this.x, this.y, 32, 32) && this.is_being_pushed) {
            this.is_being_pushed = false;
        }

    };
    return entity;
}


function build_fluid(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
	if(tp === 13) {
		entity.y_index = 32;
	}
    entity.current_anim = fluid_anim;
    entity.loop_animation = true;

    entity.check_player = function() {
        player.alive = false;
        reset_level = true;

    };

    entity.move = function() {
    };
    return entity;
}

function build_teleporter(x_t, y_t, tp, img, tile, key, parent_type) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.parent_type = parent_type;
    entity.state = OPEN;
    entity.current_anim = teleporter_anim[OPEN];
    entity.loop_animation = true;

    entity.get_trigger = function() {
        if(!this.trigger) {
            if(this.parent_type === DOOR) {
                this.trigger = get_trigger(key);
            } else {
                this.trigger = get_target(key);
            }
        }
        return this.trigger;
    };

    entity.move = function() {
        var 
		i,
		y_modified,
		stay_closed,
		trigger = this.get_trigger();

        if(this.state === OPEN && trigger.state === OPEN) {
            if(contains(player.x, player.y + 18, 32, 32, this.x, this.y, 32, 32)) {
                if(map[trigger.y_tile - 1][trigger.x_tile] > 1) {
                    y_modified = trigger.y;
                } else {
                    y_modified = trigger.y - 20;
                }
                player.teleport(trigger.x, y_modified);
                trigger.state = CLOSED;
                this.state = CLOSED;
                this.current_anim = teleporter_anim[CLOSED];
                trigger.current_anim = teleporter_anim[CLOSED];
                return;
            }
            for(i = 0; i < entities.length; ++i) {
                if(entities[i].is_teleportable) {
                    if(contains(entities[i].x, entities[i].y, 32, 32, this.x, this.y, 32, 32)) {
                        entities[i].x = trigger.x;
                        entities[i].y = trigger.y;
                        this.state = CLOSED;
                        trigger.state = CLOSED;
                        this.current_anim = teleporter_anim[CLOSED];
                        trigger.current_anim = teleporter_anim[CLOSED];
                        return;
                    }
                }
            }
        }
        if(this.state === CLOSED) {
            stay_closed = false;
            if(intersect(player.x, player.y, 32, 32, this.x, this.y, 32, 32)) {
                stay_closed = true;
            }
            if(!stay_closed) {
                for(i = 0; i < entities.length; ++i) {
                    if(entities[i].is_teleportable && intersect(entities[i].x, entities[i].y, 32, 32, this.x, this.y, 32, 32)) {
                        stay_closed = true;
                        break;
                    }
                }
            }
            if(!stay_closed) {
                this.state = OPEN;
                this.current_anim = teleporter_anim[OPEN];
            }
        }
    };

    entity.check_player = function() {
    };
    return entity;
}

function build_door(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.move = function() {
        var 
		j,
		trigger = get_trigger(this.key);

        if(trigger.state === DEACTIVATED && this.state !== DEACTIVATED) {
            this.state = DEACTIVATED;
            this.current_anim = door_anim[DEACTIVATED];
            this.frame = 0;
            map[this.y_tile][this.x_tile] = T_EMPTY;
        } else if(trigger.state === ACTIVATED && this.state !== ACTIVATED) {
            this.state = ACTIVATED;
            map[this.y_tile][this.x_tile] = EMPTY_BLOCKING;
            this.current_anim = door_anim[ACTIVATED];
            this.frame = 0;
            for(j = 0; j < enemies.length; ++j) {
                if(enemies[j].alive) {
                    if(this && intersect(this.x, this.y, 32, 32,
										 enemies[j].x + 10, enemies[j].y, 12, 48)) {
                        trigger.state = DEACTIVATED;
                        enemies[j].alive = false;
                        fire_particles(enemies[j].x + 16, enemies[j].y+ 16, 4,'red');
                    }
                }
            }
        }
    };

    return entity;

}

function build_jetpack(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.check_player = function() {
        if(intersect(player.x, player.y+32,32, 32, this.x, this.y, 32, 32 )) {
            this.alive = 0;
            player.has_jetpack = true;
            player.jetpack_fuel = 200;
        }
    };
    return entity;
}

function build_platform(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.check_player = function() {
		if(player.y < this.y - 10) {
			console.log("adjusting");
			//player.y = this.y - 48;
		}
		if(this.y + 16 > player.y) {
			player.y -= 5;
		} else {
			player.y += 5;
		}
		if(this.x + 16 > player.x) {
			player.x -= 2 + this.direction;
		} else {
			player.x += 2 + this.direction;
		}
    };

	entity.move = function() {
		this.x += this.direction;
        if(pixel_to_tile(this.x, this.y) > 0 ||
		   pixel_to_tile(this.x + 32, this.y) > 0) {
			this.direction = -this.direction;
		}

	};

	return entity;
}

function build_crate(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.is_teleportable = true;

    entity.check_player = function() {
        if(!player.grounded && player.y + 32 < this.y) {
            if(player.y > this.y - 48) {
                player.y = this.y - 48;
            }
            player.on_a_crate = true;
        }
        if(player.grounded && !player.on_a_crate){
            if (this.x - 15 > player.x) {
                if(player.grounded) {
                    //this.x += 2;
                    if(pixel_to_tile(this.x + 32, this.y) > 0) {
                        //this.x -= 2;
                        player.x-=4;
                    }
                }
                player.x-=4;
            } else if (this.x + 15 < player.x) {
                if(player.grounded) {
                    //this.x -= 2;
                    if(pixel_to_tile(this.x, this.y) > 0) {
                        //this.x += 2;
                        player.x+=4;
                    }
                }
                player.x+=4;
            }
        }
    };

    entity.move = function() {
		
		var 
		i, k;

        for(i = 0; i < entities.length; ++i) {
            if(intersect(this.x, this.y, 32, 32, entities[i].x, entities[i].y, 32, 23)) {
                if(entities[i].type === T_CRATE) {
                    if(this.y > entities[i].y) {
                        entities.y--;
                    }
                    if(this.x > entities[i].x) {
                        //this.x++;
                        entities.x--;
                    } else if(this.x < entities[i].x) {
                        //this.x--;
                        entities.x++;
                    }

                }
            }
        }

        for(k = 0; k < enemies.length; ++k) {
            if(intersect(this.x, this.y, 32, 32, enemies[k].x, enemies[k].y + 8, 32, 48)) {
                if(this.y_inertia > 1 && enemies[k].y_inertia === 1 && this.y < enemies[k].y) {
                    enemies[k].alive = false;
                    fire_particles(enemies[k].x, enemies[k].y, 4, 'red');
                }
            }
        }
        if(this.y_inertia < 10) {
            this.y_inertia = this.y_inertia * 2;
        } else {
            this.y_inertia = 10;
        }
        this.y += this.y_inertia;
        if(pixel_to_tile(this.x, this.y + 32) > 0 ||
           pixel_to_tile(this.x + 32, this.y + 32) > 0) {
            this.y -= this.y_inertia;
            this.y_inertia = 1;
        }
    };
    return entity;
}

function build_person(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.is_teleportable = true;
    total_people++;

    entity.check_player = function() {
        if(this.state !== 9) {
            saved_people++;
            this.frame = 0;
            this.current_anim = person_anim[3];
        }
        this.state = 9;
    };

    entity.move = function() {
        if(this.frame === 7) {
            this.alive = false;
        }
        /*
          for(var i = 0; i < entities.length; ++i) {
          if(intersect(this.x, this.y, 32, 32, entities[i].x, entities[i].y, 32, 23)) {
          if(entities[i].type == T_CRATE) {
          if(this.y > entities[i].y) {
          entities.y--;
          }
          if(this.x > entities[i].x) {
          //this.x++;
          entities.x--;
          } else if(this.x < entities[i].x) {
          //this.x--;
          entities.x++;
          }

          }
          }
          }
        */
    };

    return entity;
}


function build_jumper(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.loop_animation = false;

    entity.check_player = function() {
        if (contains(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            if(player.grounded) {
                // play animation
                this.current_anim = jumper_anim[ACTIVATED];
                this.frame = 0;
                player.standing = false;
                player.y_inertia = -15;
                player.grounded = false;
            }
        }
    };
    return entity;
}

function build_exit(x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.move = function() {
        if (intersect(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            player.x = 33;
            player.y = 33;
            current_level++;
            game_state = LEVEL_END;
        }
    };
    return entity;

}

function Enemy(x_t, y_t, type, img) {
	"use strict";

    this.x_tile = x_t;
    this.y_tile = y_t;
    this.type = type;

    this.x = this.x_tile * TILE_WIDTH;
    this.y = this.y_tile * TILE_WIDTH - 18;
    this.y_inertia = 1;

    this.image = img;

    this.frame = 0;
    this.state = ACTIVATED;

    this.is_being_pushed = false;
    this.wait_index = 0;
    this.alive = true;

    this.direction = 1;
    this.bullet_timer = 21;

    map[this.y_tile][this.x_tile] = 0;


    if(type === T_BOSS_1_START) {
        this.current_anim = boss_anim[BOSS_FULL];
        this.hit_points = 100;
    } else {
        this.current_anim = enemy_anim[WALK_LEFT];
        this.hit_points = 1;

    }
}

function make_enemy(x, y, type) {
	"use strict";
	
	var image;

    if(type === T_ENEMY_1_START) {
        image = enemy_img;
    } else if (type === T_ENEMY_2_START) {
        image = enemy_2_img;
    } else if (type === T_BOSS_1_START){
        image = brain_1_img;
    }

    return new Enemy(x, y, type, image);
}

function make_enemies() {
	"use strict";
	var x, y;

    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            if(map[y][x] === T_ENEMY_1_START || 
               map[y][x] === T_ENEMY_2_START || 
               map[y][x] === T_BOSS_1_START) {
                enemies.push(make_enemy(x, y, map[y][x]));
            }
        }
    }
}

function make_enemy_bullets() {
	"use strict";
	var i;

    for(i = 0; i < max_enemy_bullets; ++i) {
        enemy_bullets[i] = [];
        enemy_bullets[i].alive = false;
        enemy_bullets[i].bullet_timer = 10;
    }
}



function make_entity(x, y, type, parent_type) {
	"use strict";

    // Switches
    if(map[y][x-1] === E_SWITCH) {
        return build_switch(x, y, SWITCH, images.switch_1, T_EMPTY, type);
    } else if (map[y][x+1] === E_SWITCH) {
        return build_switch(x, y, SWITCH, images.switch_2, T_EMPTY, type);

		// Teleporter
    } else if(map[y+1][x] === E_TELEPORTER) {
        return build_teleporter(x, y, TELEPORTER, images.teleport_1, T_EMPTY, type, parent_type);
    } else if(map[y-1][x] === E_TELEPORTER) {
        return build_teleporter(x, y, TELEPORTER, images.teleport_2, T_EMPTY, type, parent_type);

		// Doors
    } else if(map[y-1][x] === E_DOOR) {
        return build_door(x, y, DOOR, images.door_1, EMPTY_BLOCKING, type);
    } else if(map[y+1][x] === E_DOOR) {
        return build_door(x, y, DOOR, images.door_2, EMPTY_BLOCKING, type);
    } else if(map[y][x-1] === E_DOOR) {
        return build_door(x, y, DOOR, images.door_3, EMPTY_BLOCKING, type);
    } else if(map[y][x+1] === E_DOOR) {
        return build_door(x, y, DOOR, images.door_4, EMPTY_BLOCKING, type);

		// Jetpack
    } else if(type === T_JETPACK) {
        return build_jetpack(x, y, type, images.jetpack_icon, T_EMPTY);

		// Crate
    } else if(type === T_CRATE) {
        return build_crate(x, y, type, images.crate_1, T_EMPTY);

    } else if(type === T_PERSON) {
        return build_person(x, y, type, people_img, T_EMPTY);

		// Exit
    } else if (type === T_EXIT) {
        return build_exit(x, y, type, null, T_EMPTY);

		// Fluid
    } else if (type === T_FLUID || type === 13) {
        return build_fluid(x, y, type, images.fluid_1, T_EMPTY);

		// Jumper
    } else if (type === T_JUMPER) {
        return build_jumper(x, y, type, images.jumper, T_EMPTY);

		// Platform
    } else if (type === T_PLATFORM) {
        return build_platform(x, y, type, images.platform_1, T_EMPTY);

		// Unknown
    } else {
        return new Entity(x, y, type, images.door_2, T_EMPTY);
    }
}


function build_player() {
	"use strict";

    map_iterate(function(x, y) {
        if(map[y][x] === T_PLAYER_START) {
            player = make_entity(x, y, map[y][x], T_EMPTY, T_PLAYER_START);
            // players are taller than normal stuff
            player.y -= 23;
        }
    });

    player.initialize = function() {
        map_iterate(function(x, y) {
            if(map[y][x] === T_PLAYER_START) {
                this.x = x * 32;
                this.y = y * 32 - 23;
                map[y][x] = 0;
            }
        });
        this.direction = 1;
        this.crouching = false;
        this.has_jetpack = true;
        this.jetpack_fuel = 200;
        this.moving_left = false;
        this.moving_right = false;
        this.up = false;
        this.down = false;
        this.can_teleport = true;
        this.alive = true;
        this.pause_timer = 0;
        this.NORMAL = 0;
        this.TELEPORT_START = 1;
        this.TELEPORT_END = 2;
        this.target_x = 0;
        this.target_y = 0;
        this.state = this.NORMAL;
        this.on_a_crate = false;
    };

    player.move = function() {
		var i, adjusted_y, adjusted_height;

		this.pause_timer--;
        if(this.pause_timer > 0) {
            return;
        } else {
            this.pause_timer = 0;
        }

        if(this.alive) {
            this.on_a_crate = false;
            for(i = 0; i < entities.length; ++i) {
				adjusted_y = this.y;
				adjusted_height = 48;
				if(this.crouching) {
					adjusted_y = this.y + 18;
					adjusted_height = 30;
				}
                if(entities[i] && intersect(this.x, adjusted_y, 32, adjusted_height, 
							 entities[i].x, entities[i].y, 32, 32)) {
                    entities[i].check_player();
                }
				if(entities[i].type === T_PLATFORM && 
				   on_top_of(this.x + 8, this.y, 16, 48, 
							 entities[i].x, entities[i].y, 32, 32)) {
					console.log("on a platform");
					this.x += entities[i].direction;
					this.on_a_crate = true;
				}
            }
            this.y_inertia = this.y_inertia + gravity;
            this.y += this.y_inertia;
            if(pixel_to_tile(this.x + 8, this.y+15) > 0 || pixel_to_tile(this.x + 24, this.y+15) > 0) {
                this.y -= this.y_inertia;
                this.y_inertia = 0;
            } else if(this.on_a_crate || pixel_to_tile(this.x + 8, this.y+48) > 0 || pixel_to_tile(this.x + 24, this.y + 48) > 0) {
                this.y -= this.y_inertia;
                this.y_inertia = 0;
                this.grounded = true;
            } else {
                this.grounded = false;
            }
            if(this.moving_left) {
                if(!this.crouching) {
                    this.x -= 3;
                }
                if(pixel_to_tile(this.x + 8, this.y+32) > 0 
				   || pixel_to_tile(this.x + 24, this.y + 32) > 0
                   || pixel_to_tile(this.x + 8, this.y+15) > 0 
				   || pixel_to_tile(this.x + 24, this.y+15) > 0
                   || pixel_to_tile(this.x + 8, this.y+48) > 0 
				   || pixel_to_tile(this.x + 24, this.y+48) > 0) {
                    this.x += 3;
                    this.standing = true;
                    current_anim = anim[STAND_LEFT];
                } else {
                    current_anim = anim[WALK_LEFT];
                }

                this.direction = -1;
                this.standing = false;
            }

            if(this.moving_right) {
                if(!this.crouching) {
                    //inertiaX += 1;
                    this.x += 3;
                }
                if(pixel_to_tile(this.x + 8, this.y+32) > 0 
				   || pixel_to_tile(this.x + 24, this.y + 32) > 0
                   || pixel_to_tile(this.x + 8, this.y+15) > 0 
				   || pixel_to_tile(this.x + 24, this.y+15) > 0
                   || pixel_to_tile(this.x + 8, this.y+48) > 0 
				   || pixel_to_tile(this.x + 24, this.y+48) > 0) {
                    this.x -= 3;
                    this.standing = true;
                    current_anim = anim[STAND_RIGHT];
                } else {
                    current_anim = anim[WALK_RIGHT];
                }
                this.direction = 1;
                this.standing = false;
            }
            if(this.up) {
                if(this.grounded || this.on_a_crate) {
                    this.standing = false;
					this.y -= 1;
                    this.y_inertia = -9;
                    this.grounded = false;
					this.on_a_crate = false;
					console.log("trying to go up");
                } else {
				}
                if(this.has_jetpack) {
                    this.grounded = false;
                    this.y_inertia = -4;
                    this.jetpack_fuel -= 1;
                    if(this.direction > 0) {
                        current_anim = anim[JET_LEFT];
                    } else {
                        current_anim = anim[JET_RIGHT];
                    }
                }
            }
            if(this.down) {
                if(this.grounded || this.on_a_crate) {
                    this.crouching = true;
                }
            } else {
                this.crouching = false;
            }
            if(this.standing) {
                if(this.direction > 0) {
                    current_anim = anim[STAND_RIGHT];
                } else {
                    current_anim = anim[STAND_LEFT];
                }

            }
            if(this.crouching && (this.grounded || this.on_a_crate)) {
                if(this.direction > 0) {
                    current_anim = anim[CROUCH_RIGHT];
                } else {
                    current_anim = anim[CROUCH_LEFT];
                }
            } else if (this.crouching) {
                if(this.direction > 0) {
                    current_anim = anim[STAND_RIGHT];
                } else {
                    current_anim = anim[STAND_LEFT];
                }
            }
            if(this.jetpack_fuel < 0) {
                this.has_jetpack = false;
            }
        }
    };

    player.teleport = function(x, y) {
        this.x = x;
        this.y = y;
    };

    player.draw = function() {
        if(player.alive) {
			waitIndex++;
			if(waitIndex > frameRate) {
				waitIndex = 0;
				if(this.grounded) {
					this.frame++;
				}
			}
			if(this.frame >= current_anim.length) {
				this.frame = 0;
			}
			ctx.drawImage(dude_img, current_anim[this.frame] * 32, 0, 32, 48,
						  this.x + window_x,this.y + window_y, 32, 48);
        }
    };
    return player;
}


function make_entities() {
	"use strict";

    // make doors, switches and trampolines.
    // have to make switches before doors
    map_iterate(function(x, y) {
        if(map[y][x] > 15 && map[y][x] < 32) {
            entities.push(make_entity(x, y, map[y][x], SWITCH));
        }
    });
    map_iterate(function(x, y) {
        if(map[y][x] > 31 && map[y][x] < 48) {
            entities.push(make_entity(x, y, map[y][x], DOOR));
        }
    });
    map_iterate(function(x, y) {
        if(map[y][x] > 7 && map[y][x] < 16) {
            entities.push(make_entity(x, y, map[y][x], map[y][x]));
        }
    });
}

function dude_fire() {
	"use strict";

	var i;

    if(bullet_timer > 10) {
        bullet_timer = 0;
        for(i = 0; i < max_bullets; ++i) {
            if(!bullets[i].alive) {
                bullets[i].x = player.x + 26;
                bullets[i].y = player.y + 25;
                if(player.crouching) {
                    bullets[i].y += 10;
                }
                bullets[i].direction = player.direction;
                bullets[i].alive = true;
                break;
            }
        }
    }
}


function get_input() {
	"use strict";
	
	var i;

    key_pressed = false;

    for(i = 0; i < keys.length; ++i) {
        if(keys[i] !== false && keys[i] !== undefined) {
            key_pressed = true;
            break;
        }
    }


    if (keys.hasOwnProperty('88') && keys[88] && player.alive) {
        dude_fire();
    }
    player.standing = true;
    player.moving_left = keys.hasOwnProperty('37') && keys[37];
    player.moving_right = keys.hasOwnProperty('39') && keys[39];
    player.up = keys.hasOwnProperty('90') && keys[90];

    if (keys.hasOwnProperty('40') && keys[40]) {
        player.down = true;
    } else {
        player.down = false;
        //crouching = false;
    }

    if(((keys.hasOwnProperty('32') && keys[32] ) || 
		(keys.hasOwnProperty('27') && keys[27])) 
       && game_state === RUNNING) {
        game_state = PAUSED;
    }
}

function UIBase(x, y, width, height, action) {
	"use strict";

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    this.target_x = 0;
    this.target_y = 0;

    this.action = action;

    this.START = 0;
    this.HOVER = 1;
    this.ACTIVATED = 2;

    this.easeStrategy = "FLASH";

    this.animations = [];
    this.animations[this.START] = [0];
    this.animations[this.HOVER] = [1, 2, 3];
    this.animations[this.ACTIVATED] = [4, 5, 6];
    this.current_animation = this.animations[this.START];
    this.current_frame = 0;

    this.state = this.START;

    window.addEventListener('mouseup', this.process_click, true);

    this.activate = function() {
        this.state = this.ACTIVATED;
        game_state = this.action;
    };

    this.process_click = function() {
        if(mouseUp) {
            mouseUp = false;
            this.activate();
            this.current_animation = this.animations[this.ACTIVATED];
        }
    };

    this.move = function() {
        if(mouseX > this.x && mouseX < this.x + this.width &&
           mouseY > this.y && mouseY < this.y + this.height) {
            this.state = this.HOVER;
            this.process_click();
        } else {
            this.state = this.START;
        }
		/*
        if(Math.abs(this.x - this.target_x) > 1) {
            // use easing function
        }
        
        if(Math.abs(this.y - this.target_y) > 1) {
            // use easing function
        }
		*/
    };


}

function clear_screen() {
	"use strict";
    ctx.drawImage(tile_img, 0, 0, canvas.width, canvas.height);
}

function draw_text(str, x, y) {
	"use strict";
	var i, sx, sy, index;
    for (i=0; i<str.length; i++){
        index = str.charCodeAt(i) - 32;
        sx = index%10 * 10;
        sy = Math.floor(index/10) * 10;
        ctx.drawImage(font_img, sx, sy, 10, 10,
                      x + (i * 12) , y, 10, 10);
    }
}


function drawRectangle(x, y, w, h, fill) {
	"use strict";

	ctx.beginPath();
	ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.stroke();
    if (fill) { ctx.fill(); }
}

function Button(x, y, width, height, text, action) {
	"use strict";

    this.inheritsFrom = UIBase;
    this.inheritsFrom(x, y, width, height, action);
    this.isAButton = "true";

    if(text === null) { text = "TEXT"; }

    this.text_x = (width - text.length * 12) / 2 + x;

    this.text_y = (height - 10) / 2 + y;
    this.text = text;

    this.draw = function() {
        this.move();
        if(this.state === this.START) {
            ctx.fillStyle = "#330000";
        } else if(this.state === this.HOVER) {
            ctx.fillStyle = "#333300";
        }
        drawRectangle(x,y, width, height, true);
        ctx.fillStyle = "#000000";
        draw_text(this.text, this.text_x, this.text_y);
    };
}

function ImageButton(image, x, y, width, height, action) {
	"use strict";

    this.inheritsFrom = Button;
    this.inheritsFrom(x, y, width, height, action);
    this.image = "I have an image";

    this.draw = function() {
        this.move();
        ctx.drawImage(this.image, 
                      this.current_animation[this.current_frame] * 32, 0, 
                      this.width, this.height,
                      this.x,this.y, this.width, this.height);
        this.current_frame++;
        if(this.current_animation.length >= this.current_frame) {
            this.current_frame = 0;
        }
    };

}

function Screen(background) {
	"use strict";

    this.buttons = [];
    this.background_image = background;
}


function SplashScreen() {
	"use strict";

    this.buttons = [];

    var 
	button_width = 300,
    button_height = 20,
    button_padding = 10,
    button_x = (canvas.width - button_width) / 2,
    button_y = 200;

    interstitialId = GET_READY;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "START GAME", INTERSTITIAL));
    button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "HOW TO PLAY", HELP));
    button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "CREDITS", CREDITS));

    this.update = function() {
    };

    this.draw = function() {
		var i;
        ctx.drawImage(splash_screen_img, 0, 0);
		draw_text("ENGINE " + version, 2, 310);

        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
    };

}
//////////////////////////////////////////////////////////////////
//  LEVEL END

function HelpScreen() {
	"use strict";

    var wait = 0;

    this.update = function() {
        if(wait > 60) {
            if(key_pressed) {
                game_state = INITIALIZE;
                wait = 0;
            }
        }
        wait++;
    };

    this.draw = function() {
        ctx.drawImage(splash_screen_img, 0, 0);
        draw_text("Z:          FIRE",80, 220);
        draw_text("X:          JUMP/JETPACK",80, 234);
        draw_text("DOWN ARROW: CROUCH", 80, 248);
        draw_text("DO NOT GET SHOT", 80, 262);
    };

}

//////////////////////////////////////////////////////////////////
//  PAUSED

function PauseScreen() {
	"use strict";

    this.buttons = [];

    var button_width = 300,
    button_height = 20,
    button_padding = 10,
    button_x = (canvas.width - button_width) / 2,
    button_y = 200,
	wait;

    interstitialId = GET_READY;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "RESUME GAME", RUNNING));

	button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "RESTART LEVEL", RESET_LEVEL));

	button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "RESTART GAME", INITIALIZE));

    this.activeButton = this.buttons[0];

    this.update = function() {
        if(key_pressed) {
            if(wait > 60) {
                this.activeButton.activate();
                wait = 0;
            }
        }
        wait++;
    };

    this.draw = function() {
		var i;
        ctx.drawImage(splash_screen_img, 0, 0);
        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
    };

}


//////////////////////////////////////////////////////////////////
//  INTERSTITIAL

function Interstitial() {
	"use strict";

    var wait = 0;

    this.update = function() {
        if(wait > 100) {
            game_state = RUNNING;
        }
        wait++;
    };

    this.draw = function() {
        if(interstitialId === GET_READY) {
			ctx.drawImage(splash_screen_img, 0, 0);
			draw_text("GET READY!!!", 80, 248);
            ctx.fillStyle = "#990000";
            ctx.fillRect(80, 260, wait * 2, 10);
        }
    };

}


function load_map(level) {
	"use strict";
	var	
	url,
	request;

    saved_people = 0;
    total_people = 0;
    current_boss = null;
    timer = 0;
    if(level > 4) {
        game_state = GAME_OVER;
        current_level = 1;
    }
    request = new XMLHttpRequest();
    url = '//' + loc + '/play/doctor-robot/DoctorRobot.php?getMap|'+level;
    request.open('GET', url);
    request.onreadystatechange = function() {
        if (request.readyState !== 4 || request.status !== 200) {
			return;
        }
        parse_map(request.responseText);
        initialize_data();
    };
    request.send(null);
}


function LevelEnd() {
	"use strict";

    var wait = 0;

    this.update = function() {
        if(wait > 60) {
            if(key_pressed) {
                load_map(current_level);
                game_state = RUNNING;
                wait = 0;
            }
        }
        wait++;
    };

    this.draw = function() {
        ctx.drawImage(splash_screen_img, 0, 0);
        draw_text("CONTAMINATED HUMANS FOUND: " + saved_people, 40, 228);
        draw_text("TOTAL TIME WASTED: " + static_time, 80, 260);
    };
}

//////////////////////////////////////////////////////////////////
//  CREDITS

function CreditsScreen() {

    var wait = 0;

    this.update = function() {
        if(key_pressed || mouseUp) {
            mouseUp = false;
            if(wait > 60) {
                game_state = INITIALIZE;
                wait = 0;
            }
        }
        wait++;
    };

    this.draw = function() {
        ctx.drawImage(game_over_img, 0, 0);
        draw_text("ART AND PROGRAMMING",20, 220);
        draw_text("JAMES KERSEY",20, 234);
        draw_text("MUSIC AND NOISE", 20, 260);
        draw_text("SPIKE the PERCUSSIONIST", 20, 274);
    };

}


//////////////////////////////////////////////////////////////////
//  GAME_OVER

function GameOver() {

    var wait = 0;

    this.update = function() {
        if(wait > 500) {
            if(key_pressed) {
                game_state = INITIALIZE;
                load_map(0);
            }
            wait = 0;
        }
        wait++;
    };

    this.draw = function() {
        ctx.drawImage(game_over_img, 0, 0);
        draw_text("CONGRATULATIONS",20, 220);
        draw_text("YOU HAVE RESCUED THE UNIVERSE",20, 234);
        draw_text("TAKE A BREAK!", 20, 248);
    };

}

//////////////////////////////////////////////////////////////////
//  Chapters

function ChaptersScreen() {
	"use strict";

    var wait = 0;

    this.update = function() {
							  if(wait > 500) {
								  if(key_pressed) {
									  game_state = INITIALIZE;
									  load_map(0);
								  }
								  wait = 0;
							  }
							  wait++;
							 };

    this.draw = function() {
        ctx.drawImage(chapters_img, 0, 0);
        draw_text("CHAPTERS",20, 220);
    };

}




function showCreditsScreen() {
	"use strict";

    if(creditsScreen === null || creditsScreen === undefined) {
        creditsScreen = new CreditsScreen();
        creditsScreen.load_image();
    }
    creditsScreen.update();
    creditsScreen.draw();
}

function showSplashScreen() 
{
	"use strict";

    if(splashScreen === null || splashScreen === undefined) {
        splashScreen = new SplashScreen();
    }
    splashScreen.update();
    splashScreen.draw();
}
function showHelpScreen() {
	"use strict";

    if(helpScreen === null || helpScreen === undefined) {
        helpScreen = new HelpScreen();
    }
    helpScreen.update();
    helpScreen.draw();
}

function showChaptersScreen() {
	"use strict";

    if(chaptersScreen === null || chaptersScreen === undefined) {
        chaptersScreen = new ChaptersScreen();
    }
    chaptersScreen.update();
    chaptersScreen.draw();
}
/*
function showLevelsScreen() {
	"use strict";

    if(levelsScreen === undefined || levelsScreen === null) {
        levelsScreen = new LevelsScreen();
    }
    levelsScreen.update();
    levelsScreen.draw();
}
*/
function showPauseScreen() {
	"use strict";

    if(pauseScreen === null || pauseScreen === undefined) {
        pauseScreen = new PauseScreen();
    }
    pauseScreen.update();
    pauseScreen.draw();
}

function showInterstitial() {
	"use strict";

    if(interstitial === null || interstitial === undefined) {
        interstitial = new Interstitial();
    }
    interstitial.update();
    interstitial.draw();
}

function showLevelEnd() {
	"use strict";

    if(level_end === null || level_end === undefined) {
        level_end = new LevelEnd();
    }
    level_end.update();
    level_end.draw();
}

function showGameOver() {
	"use strict";

    if(gameover === null || gameover === undefined) {
        gameover = new GameOver();
    }
    gameover.update();
    gameover.draw();
}

function resetLevel() {
	"use strict";

    reset_level = true;
    game_state = RUNNING;
}
function enemy_fire(x, y, direc) {
	"use strict";
	var i;

    for(i = 0; i < enemy_bullets.length; ++i) {
        if(!enemy_bullets[i].alive) {
            enemy_bullets[i].x = x + 26;
            enemy_bullets[i].y = y + 16;
            enemy_bullets[i].direction = direc;
            enemy_bullets[i].alive = true;
            break;
        }
    }
}

function move_entities() {
	"use strict";
	var i;
    // make sure the entities are even on the screen
    for(i = 0; i < entities.length; ++i) {
        entities[i].move();
    }
}

function move_enemies() {
	"use strict";

	var i, k;

    for(i = 0; i < enemies.length; ++i) {
        if(enemies[i].alive) {
            // check for crate intersections
            for(k = 0; k < entities.length; ++k) {
                if(entities[k].type === T_CRATE) {
                    if(intersect(enemies[i].x, enemies[i].y, 32, 48, 
                                 entities[k].x, entities[k].y, 32, 32)) {
                        if(enemies[i].x < entities[k].x) {
                            enemies[i].x -=4;
                        } else {
                            enemies[i].x += 4;
                            if(pixel_to_tile(enemies[i].x, enemies[i].y) > 0 ||
                               pixel_to_tile(enemies[i].x + 32, enemies[i].y) > 0) {
                                if(enemies[i].x < entities[k].x) {
                                    enemies[i].x +=4;
                                    entities[k].x += 4;
                                    player.x += 4;
                                } else {
                                    enemies[i].x -=4;
                                    entities[k].x -= 4;
                                    player.x -= 4;
                                }
                            }
                        }
                    }
                }
            }
            if(enemies[i].y_inertia < 10) {
                enemies[i].y_inertia = enemies[i].y_inertia * 2;
            } else {
                enemies[i].y_inertia = 10;
            }
            enemies[i].y += enemies[i].y_inertia;
            if(pixel_to_tile(enemies[i].x + 2, enemies[i].y + 47) > 0 ||
               pixel_to_tile(enemies[i].x + 30, enemies[i].y + 47) > 0) {
                enemies[i].y -= enemies[i].y_inertia;
                enemies[i].y_inertia = 1;
            }

            if(vertical_intersect(enemies[i].y, 48, player.y, 48)) {
                if(enemies[i].x > player.x) {
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
                if(enemies[i].type !== T_BOSS_1_START) {
					if(enemies[i].direction === -1) {
						enemies[i].current_anim = enemy_anim[WALK_RIGHT];
					} else {
						enemies[i].current_anim = enemy_anim[WALK_LEFT];
					}
                }
                continue;  // we're done here, robot stops and shoots
            }

            enemies[i].x += enemies[i].direction;

            // if there is a tile in front of them, change directions
            if(pixel_to_tile(enemies[i].x, enemies[i].y + 30) > 0 ||
               pixel_to_tile(enemies[i].x + 32, enemies[i].y + 30) > 0) {
                enemies[i].direction = -enemies[i].direction;
                enemies[i].x += enemies[i].direction;
            }
            // if they would be walking on an empty tile, change direction
            if(pixel_to_tile(enemies[i].x + 32, enemies[i].y + 50) < 1 ||
               pixel_to_tile(enemies[i].x, enemies[i].y + 50) < 1) {
                enemies[i].direction = -enemies[i].direction;
            }

            if(enemies[i].type === T_BOSS_1_START) {
				enemies[i].current_anim = enemy_anim[WALK_RIGHT];
                //enemies[i].current_anim = boss_anim[BOSS_FULL];
            } else {
                if(enemies[i].direction === -1) {
                    enemies[i].current_anim = enemy_anim[WALK_RIGHT];
                } else {
                    enemies[i].current_anim = enemy_anim[WALK_LEFT];
                }
            }
        }
    }
}
function isOnScreen(entity) {
	"use strict";

    return !(entity.x > canvas.width - window_x || entity.x <  - window_x ||
			 entity.y > canvas.height - window_y || entity.y <  - window_y);

}


function move_enemy_bullets() {
	"use strict";
    enemy_bullet_timer++;
    var y_offset,
	i, k,
	robot_y_top;

    if(player.crouching) {
        y_offset = 25;
    } else {
        y_offset = 10;
    }
    robot_y_top = player.y + y_offset;

    for(i = 0; i < enemy_bullets.length; ++i) {

        if(enemy_bullets[i].alive) {
            enemy_bullets[i].alive = isOnScreen(enemy_bullets[i]);
            enemy_bullets[i].x += 4 * enemy_bullets[i].direction;

            if (intersectedTile(enemy_bullets[i])) {
                // back the bullet up
                enemy_bullets[i].x -= bullet_speed * enemy_bullets[i].direction;
                enemy_bullets[i].alive = false;
				fire_particles(enemy_bullets[i].x, enemy_bullets[i].y, 2, 'red');
            } else {
                if(intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4, 
                             player.x + 10, robot_y_top, 12, 30)) {
                    enemy_bullets[i].alive = false;
                    fire_particles(enemy_bullets[i].x, enemy_bullets[i].y, 
                                   2, 'red');
                    fire_particles(player.x + 16, player.y + 16, 4,'grey');
                    if(!god_mode) {
                        reset_level = true;
                        player.alive = false;
                    }
                }

                for(k = 0; k < entities.length; ++k) {
                    if(isOnScreen(entities[k]) && entities[k].type === T_CRATE) {
                        if(intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4,
									 entities[k].x, entities[k].y, 32, 32)) {
                            enemy_bullets[i].alive = false;
                            fire_particles(enemy_bullets[i].x, 
                                           enemy_bullets[i].y, 
                                           2, 'red');
                        }
                    }
                }

            }
        }
    }
}

function move_bullets() {
	"use strict";

	var i, j, k;

    bullet_timer++;
    for(i = 0; i < max_bullets; ++i) {
        if(bullets[i].alive) {
            bullets[i].x += bullet_speed * bullets[i].direction;
            if(bullets[i].x > canvas.width - window_x || bullets[i].x < - window_x) {
				bullets[i].alive = false;
			} else if (pixel_to_tile(bullets[i].x, bullets[i].y) > 0) {
				bullets[i].x -= bullet_speed * bullets[i].direction; // back the bullet up
                bullets[i].alive = false;
                fire_particles(bullets[i].x, bullets[i].y, 2, 'red');
            } else {
                for(j = 0; j < enemies.length; ++j) {
                    if(enemies[j].alive) {
                        if(bullets[i] && intersect(bullets[i].x, bullets[i].y, 4, 4,
												   enemies[j].x + 10, enemies[j].y, 12, 48)) {
                            enemies[j].hit_points -= 1;
                            fire_particles(bullets[i].x, bullets[i].y, 2, 'red');
                            bullets[i].alive = false;

                            if(enemies[j].type === T_BOSS_1_START) {
                                current_boss = enemies[j];
                                if(enemies[j].hit_points < 33) {
                                    enemies[j].current_anim = boss_anim[BOSS_EMPTY];
                                } else if (enemies[j].hit_points < 66) {
                                    enemies[j].current_anim = boss_anim[BOSS_HALF];
                                }
                            }
                            if(enemies[j].hit_points <= 0) {
                                enemies[j].alive = false;
                                fire_particles(enemies[j].x + 16, enemies[j].y+ 16, 4,'red');
                            }
                        }
                    }
                }
                for(k = 0; k < entities.length; ++k) {
                    if(entities[k].type === T_CRATE) {
						/*
                        if(entities[k].x < bullets[i].x) {
                            //entities[k].x++;
                        } else {
                            //entities[k].x--;
                        }*/
                        if(bullets[i] && intersect(bullets[i].x, bullets[i].y, 4, 4,
												   entities[k].x, entities[k].y, 32, 32)) {
                            bullets[i].alive = false;
                            fire_particles(bullets[i].x, bullets[i].y, 2, 'red');
                        }

                    }
                }
            }
        }
    }
}

function move_particles() {
	"use strict";
	
	var i;

    for(i = 0; i < max_particles; ++i) {
		particles[i].age+=1;
		if(particles[i].age > 100) { 
			particles[i].alive = false; 
			particles[i].age = 0; 
		}
		if(particles[i].alive) {
            particles[i].x += particles[i].x_vel;
			if(pixel_to_tile(particles[i].x, particles[i].y) > 0) {
				particles[i].x -= particles[i].x_vel;
				particles[i].x_vel = -particles[i].x_vel;
			}
			particles[i].y_vel += 0.3 / particles[i].size;
            particles[i].y += particles[i].y_vel;
			if(pixel_to_tile(particles[i].x, particles[i].y) > 0) {
				particles[i].y -= particles[i].y_vel * gravity / particles[i].size;
                particles[i].y_vel = -particles[i].y_vel;
			}
		}
	}
}

function move_stuff() {
	"use strict";

    player.move();
    move_bullets();
    move_particles();
    move_entities();
    move_enemies();
    move_enemy_bullets();
}

function draw_map() {
	"use strict";

	var x_pos, y_pos, sx, sy, index;

    map_iterate(function(x, y) {
        if(map[y][x] > 47) {
            x_pos = window_x + x * 32;
            y_pos = window_y + y * 32;
            if(x_pos > -32 || x_pos < ctx.width || y_pos > -32 || y_pos < ctx.height) {
                index = map[y][x];
                sx = index%16 * 32;
                sy = Math.floor(index/16) * 32;
                ctx.drawImage(map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
            }
        }
    });
}

function draw_particles() {
	"use strict";
	var i;

	for(i = 0; i < max_particles; ++i) {
		if(particles[i].alive) {
            if(particles[i].col === 'red') {
                ctx.fillStyle = "#" + (99 - particles[i].age) + "0000";
            } else if(particles[i].col === 'gray') {
                ctx.fillStyle = "#" + (99 - particles[i].age) + "7777";
            } else {
                ctx.fillStyle = "#" + (99 - particles[i].age) + "7777";
            }
			drawRectangle(particles[i].x + window_x, particles[i].y + window_y, particles[i].size, particles[i].size, true);
		}
	}
}

function draw_bullets() {
	"use strict";
	var i;
    for(i = 0; i < bullets.length; ++i) {
        if(bullets[i].alive) {
            ctx.drawImage(bullet_img, 0, 0, 4, 4, bullets[i].x + window_x, bullets[i].y + window_y, 4, 4);
        }
    }
}

function draw_enemies() {
	"use strict";
	var i;

    for(i = 0; i < enemies.length; ++i) {
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
	"use strict";
	var i;
    for(i = 0; i < entities.length; ++i) {
        entities[i].draw();
    }
}
function draw_people_count()
{
	"use strict";

    draw_text("RESCUED: " + saved_people + "/" + total_people, 100, 3);
}

function draw_timer() {
	"use strict";

	var seconds, mm, ss, tens;
	
    seconds = timer / 100 ;
    mm = ((seconds / 60).toString()).split('.')[0];
    ss = ((seconds % 60).toString()).split('.')[0];
    timer++;
    if(ss < 10) { tens = 0; } else { tens = ''; }

    static_time = mm + ":" + tens + ss;

    draw_text(static_time, 300, 3);
}


function draw_hud() 
{
	"use strict";

    ctx.drawImage(hud_img, 0, 0, canvas.width, 16);
    ctx.fillStyle = "#000000";
    drawRectangle(40,4, 50, 8, true);
    ctx.fillStyle = "#990000";
    drawRectangle(40, 4, player.jetpack_fuel/4, 8, true);
    ctx.drawImage(images.fuel_overlay, 2, 2);
    //draw_text(current_level + " " + map_name,100, 3);

    draw_timer();
    draw_people_count();
    if(current_boss) {
        drawRectangle(40, 24, current_boss.hit_points*2, 8, true);
        draw_text("BRAIN BOSS", 40, 34);
        if(current_boss.hit_points < 1) {
            current_boss = null;
        }
    }

}



function draw_enemy_bullets() {
	"use strict";
	var i;

    for(i = 0; i < enemy_bullets.length; ++i) {
        if(enemy_bullets[i].alive) {
            ctx.drawImage(bullet_img, 0, 0, 4, 4, enemy_bullets[i].x + window_x, enemy_bullets[i].y + window_y, 4, 4);
        }
    }

}

function resetting_level() {
	"use strict";
	
    reset_timer++;
    if(reset_timer > 100) {
        reset_level = false;
        reset_timer = 0;
        load_map(current_level);
        //initialize_data();
    }
}


function game_loop() {
    "use strict";

    get_input();

    if(game_state === CREDITS) {
        showCreditsScreen();
    } else if (game_state === RESET_LEVEL) {
        resetLevel();
    } else if (game_state === HELP) {
        showHelpScreen();
    } else if (game_state === CHAPTERS) {
        showChaptersScreen();
    } else if (game_state === LEVELS) {
		showChaptersScreen();
        //showLevelsScreen();
    } else if(game_state === INITIALIZE) {
        showSplashScreen();
    } else if(game_state === INTERSTITIAL) {
        showInterstitial();
    } else if(game_state === LEVEL_END) {
        showLevelEnd();
    } else if(game_state === PAUSED) {
        showPauseScreen();
    } else if(game_state === RUNNING) {
        move_stuff();
		if(window_x > -3) { window_x = -3; }
		if(window_x < canvas.width - (map[0].length * 32)) { 
			window_x = canvas.width - (map[0].length * 32); 
		}
		if(window_y > 8) { window_y = 8; }
		if(window_y < canvas.height - (map.length * 32 - 8)) {
			window_y = canvas.height - (map.length * 32 - 8);
		}
        if(player.x + window_x < 200) {
            window_x += 3;
        }
        if(player.x + window_x > canvas.width - 200) {
            window_x -= 3;
        }
        if(player.y + window_y <  100) {
            window_y += 8;
        }
        if(player.y + window_y > canvas.height - 100) {
            window_y -= 8;
        }

        clear_screen();
        //draw_parallax();
        draw_map();
        draw_particles();
        draw_bullets();
        if(player.alive) {
            player.draw();
        }
        draw_enemies();
        draw_entities();
        draw_enemy_bullets();
        draw_hud();
        if(reset_level) {
            resetting_level();
        }
    } else if(game_state === GAME_OVER) {
        showGameOver();
    }
    mouseUp = false;

    // pretend the space bar isn't down
    // so that if you hit the space bar at the end of a level
    // the game isn't immediately paused
    keys[32] = false;  
}


function animate() {
	"use strict";

    window.requestAnimFrame(animate);
    game_loop();
}
function initialize_data() {
	"use strict";

    image_manager.load_images();

    enemies = [];
    entities = [];
    enemy_bullets = [];
    bullets = [];
    particles = [];
    make_bullets();
	make_particles();
    make_entities();
    make_enemies();
    make_enemy_bullets();
    player = build_player();
    player.initialize();
    player.alive = true;
    window_x = 200 - player.x;
    window_y = 100 - player.y;

    if(!animating) {
        animate();
        animating = true;
    }
}





function init() {
    "use strict";
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    image_manager = new ImageManager();
    ctx.mozImageSmoothingEnabled = false;
    current_level = 1;
    load_map("1");
}




function draw_parallax() {
	"use strict";

    ctx.drawImage(parallax_img, 0, 0, 
                  512, 512, 
                  window_x >> 4 - 5, window_y >> 4, 
                  512, 512);
}


function aKeyIsDown() {
	"use strict";

    if(keyIsDown) {
        keyIsDown = false;
        return true;
    } else {
        return false;
    }
}

function mouseIsDown() {
	"use strict";

    if(mouseUp) {
        mouseUp = false;
        return true;
    } else {
        return false;
    }
}

window.onmousedown = function() {
	"use strict";
    mouseDown = true;
};


window.onmouseup = function() {
	"use strict";

    if(mouseDown === true) {
        mouseUp = true;
        mouseDown = false;
    }
};

function mouseMove(e) {
	"use strict";

	var top, left, obj, posx, posy;

    obj = canvas;
    top = 0;
    left = 0;
    while (obj && obj.tagName !== 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
	
    // return relative mouse position
    posx = e.clientX - left + window.pageXOffset;
    posy = e.clientY - top + window.pageYOffset;

    mouseX = posx;
    mouseY = posy;
}


window.onload = init;
window.addEventListener('mousemove', mouseMove, true);
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);


function keyDown(evt){ keys[evt.keyCode] = true; cancelDefaultAction(evt);}
function keyUp(evt){ keys[evt.keyCode] = false; cancelDefaultAction(evt);}

function cancelDefaultAction(e) {
	var evt = e ? e:window.event;
	if (evt.preventDefault) evt.preventDefault();
	evt.returnValue = false;
	return false;
}



// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	"use strict";
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

Function.prototype.method = function (name, func) {
	"use strict";

    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
	"use strict";
	var d, f, r, t, p;

    d = {};
	p = (this.prototype = new parent());
    this.method('uber', function uber(name) {
        if (!(d.hasOwnProperty(name))) {
            d[name] = 0;
        }
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f === this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});
