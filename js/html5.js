/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, onevar: false, undef: true, sloppy: true, stupid: true, vars: true */

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    "use strict";
    return window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}) ();



function DoctorRobot() { //
    "use strict";
//
}

DoctorRobot.prototype = function () {
    "use strict";

    var version = "v0.1.0",
        god_mode = false,
        images_loaded = 0,

        mouseX = 0,
        mouseY = 0,
        mouseDown = false,
        mouseUp = false,
        INITIALIZE = 0,
        RUNNING = 2,
        INTERSTITIAL = 5,

        timer = 0,

        game_state = INITIALIZE,
        map_name = "",
        images,
        static_time = '';
};

DoctorRobot.prototype = function () {
    "use strict";

    // interstitial IDs
    var GET_READY   = 999999,
        GAME_OVER   = 999998,
        CREDITS     = 999997,
        LEVEL_END   = 999996,
        PAUSED      = 999995,
        RESET_LEVEL = 999994,
        CHAPTERS    = 999993,
        LEVELS      = 999992,
        HELP        = 999991,
        interstitialId = 0;
};

DoctorRobot.prototype = function () {
    "use strict";

    var SWITCH = 256,
        DOOR = 257,
        TELEPORTER = 258,
        map,
        map_loaded = false,
        current_level = '1',
        current_boss,
        saved_people = 0,
        total_people = 0,
        TILE_WIDTH = 32;
};

DoctorRobot.prototype = function () {
    "use strict";

    // control tiles
    var T_EMPTY = 0,
        T_PLAYER_START = 1,
        T_ENEMY_1_START = 3,
        T_ENEMY_2_START = 4,
        T_ENEMY_3_START = 5,
        T_ENEMY_4_START = 6,
        T_BOSS_1_START = 7,
        T_PERSON = 8,
        T_JETPACK = 9,
        T_JUMPER = 10,
        T_CRATE = 11,
        T_FLUID = 12,
        T_PLATFORM = 14,
        T_EXIT = 15,
        EMPTY_BLOCKING = 255,
        E_TELEPORTER = 49,
        E_SWITCH = 48,
        E_DOOR = 64,
        SWITCH_LEFT = 32,
        SWITCH_FLOOR = 33,
        SWITCH_RIGHT = 34,
        SWITCH_SHOOTABLE_LEFT = 35,
        SWITCH_SHOOTABLE_RIGHT = 36,
        SWITCH_TOGGLE_LEFT = 37,
        SWITCH_TOGGLE_RIGHT = 38,
        DOOR_TOP = 40,
        DOOR_BOTTOM = 41,
        DOOR_LEFT = 42,
        DOOR_RIGHT = 43,
        SWITCH_1 = 16,
        SWITCH_2 = 17,
        SWITCH_3 = 18,
        SWITCH_4 = 19,
        SWITCH_5 = 20,
        SWITCH_6 = 21,
        SWITCH_7 = 22,
        SWITCH_8 = 23,
        DOOR_1 = 24,
        DOOR_2 = 25,
        DOOR_3 = 26,
        DOOR_4 = 27,
        DOOR_5 = 28,
        DOOR_6 = 29,
        DOOR_7 = 30,
        DOOR_8 = 31;
};

DoctorRobot.prototype = function () {
    "use strict";

    var enemy_bullet_timer,
        max_enemy_bullets,
        boss_anim,
        fluid_anim = [0, 1, 2, 3],

        WALK_LEFT = 0,
        WALK_RIGHT = 1,
        JET_LEFT = 2,
        JET_RIGHT = 3,
        STAND_LEFT = 4,
        STAND_RIGHT = 5,
        STAND = 6,
        CROUCH_LEFT = 7,
        CROUCH_RIGHT = 8,
        DEACTIVATED = 0,
        ACTIVATED = 1,
        OPEN = 1,
        CLOSED = 0,
        splashScreen = null,
        pauseScreen = null,
        helpScreen = null,
        creditsScreen = null,
        chaptersScreen = null,
        levelsScreen = null,
        interstitial = null,
        level_end = null,
        gameover = null,
        key_pressed,
        keyIsDown = false,
        teleporter_anim = [],
        enemies = [];
    //enemy_bullet_timer = 4,
    //max_enemy_bullets = 100;
    var enemy_bullets = [];
    var enemy_anim = [];
    enemy_anim[WALK_RIGHT] = [7, 6, 5, 4];
    enemy_anim[WALK_LEFT] = [0, 1, 2, 3];
    enemy_anim[STAND] = [6, 6, 6];

    var BOSS_FULL = 0;
    var BOSS_HALF = 1;
    var BOSS_EMPTY = 2;

    boss_anim = [];
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
    door_anim[this.ACTIVATED] = [5, 4, 3, 2, 1, 0];
    door_anim[this.DEACTIVATED] = [0, 1, 2, 3, 4, 5];

    var jumper_anim = [];
    jumper_anim[ACTIVATED] = [0, 1, 3, 5, 0];

    var game_images = [];

    // images
    var level_button_img = new Image();
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

    var image_manager;

    teleporter_anim[OPEN] = [0, 1, 2, 3, 4];
    teleporter_anim[CLOSED] = [5, 5, 5];

};

DoctorRobot.prototype.ImageManager = function (dr) {
	"use strict";

	var	i,
        directory = "/play/doctor-robot/images/",
        game = dr;

	this.load_image = function (img, name) {
		img.src = directory + name;
		img.onLoad = game.images_loaded += 1;
	};

    this.load_images = function () {

        var images = this.images;

        this.load_image(game.alert_jetpack_img = new Image(), 'jetpack.png');
        this.load_image(game.font_img = new Image(), 'small_font.gif');
        this.load_image(game.tile_img = new Image(), 'tiles.png');
        this.load_image(game.hud_img = new Image(), 'hud.png');
        this.load_image(game.dude_img = new Image(), 'dude_2.png');
        this.load_image(game.map_img = new Image(), 'Infiltrator.png');
        this.load_image(game.bullet_img = new Image(), 'bullet.png');
        this.load_image(game.enemy_img = new Image(), 'enemy_1b.png');
        this.load_image(game.people_img = new Image(), 'person_1.png');
        this.load_image(game.enemy_2_img = new Image(), 'enemy_2.png');
        this.load_image(game.brain_1_img = new Image(), 'brain_1.png');
        this.load_image(game.parallax_img = new Image(), 'parallax.png');
        this.load_image(game.images.switch_1, 'switch_1.png');
        this.load_image(game.images.switch_2, 'switch_2.png');
        this.load_image(game.images.teleport_1, 'teleport_1.png');
        this.load_image(game.images.teleport_2, 'teleport_2.png');
        this.load_image(game.images.crate_1, 'crate_1.png');
        this.load_image(game.images.platform_1, 'platform.png');
        this.load_image(game.images.door_1, 'door_1.png');
        this.load_image(game.images.door_2, 'door_2.png');
        this.load_image(game.images.door_3, 'door_3.png');
        this.load_image(game.images.door_4, 'door_4.png');
        this.load_image(game.images.fluid_1, 'fluid_1.png');
        this.load_image(game.images.jetpack_icon, 'jetpack_icon.png');
        this.load_image(game.images.fuel_overlay, 'fuel_overlay.png');
        this.load_image(game.images.jumper, 'jumper.png');
        this.load_image(game.splash_screen_img = new Image(), 'splash_screen_2.png');
        this.load_image(game.game_over_img = new Image(), 'game_over.png');
        this.load_image(game.chapters_img = new Image(), 'chapters.png');
    };

};

DoctorRobot.prototype.parse_map = function (map_data) {
	"use strict";

    var	cols,
        x,
        y,
        rows = map_data.split('\n');

    this.map = [];
    this.map_name = rows[0];
    for (y = 1; y < rows.length; y += 1) {
        cols = rows[y].split(',');
		if (cols[0] === '0') {
			break;
		}
        this.map[y - 1] = [];
        for (x = 0; x < cols.length; x += 1) {
			if (cols[x] === '') {
				break;
			}
            this.map[y - 1][x] = cols[x] - 1;
        }
    }
    this.map_loaded = true;
};

DoctorRobot.prototype.vertical_intersect = function (y, yh, y2, y2h) {
	"use strict";
    return y + yh > y2 && y < y2 + y2h;

};

DoctorRobot.prototype.intersect = function (sx, sy, sw, sh, tx, ty, tw, th) {
	"use strict";
    return sx + sw > tx && sx < tx + tw && sy + sh > ty && sy < ty + th;
};

DoctorRobot.prototype.contains = function (sx, sy, sw, sh, tx, ty, tw, th) {
	"use strict";
    return sx + 5 > tx && sx + sw - 5 < tx + tw && sy + 5 > ty && sy + sh - 5 < ty + th;
};

DoctorRobot.prototype.on_top_of = function (sx, sy, sw, sh, tx, ty, tw, th) {
    "use strict";
    return sx + sw > tx && sx < tx + tw && sy + sh - 1 < ty && sy + sh + 1 > ty;
};

DoctorRobot.prototype.fire_particles = function (x, y, size, col) {
	"use strict";

	var i,
        num_particles = 10;

	for (i = 0; i < this.max_particles; i += 1) {
		if (!this.particles[i].alive) {
            this.particles[i].alive = true;
            this.particles[i].x = x;
            this.particles[i].y = y;
            this.particles[i].age = 0;
            this.particles[i].size = size;
            this.particles[i].col = col;
            num_particles -= 1;
			if (num_particles < 0) {
				break;
			}
		}
	}
};


DoctorRobot.prototype.get_trigger = function (id) {
	"use strict";
	var i;

    for (i = 0; i < this.entities.length; i += 1) {
        if (this.entities[i].key === id - 16) {
            return this.entities[i];
        }
    }
    return 0;
};

DoctorRobot.prototype.get_target = function (id) {
	"use strict";
	var i;
    for (i = 0; i < this.entities.length; i += 1) {
        if (this.entities[i].key === id + 16) {
            return this.entities[i];
        }
    }
    return 0;
};

DoctorRobot.prototype.pixel_to_tile = function (x, y) {
	"use strict";

    var	tile,
        x_tile = x >> 5,
        y_tile = y >> 5;

    try {
		tile = this.map[y_tile][x_tile];
		if (tile > 47) {
			return this.map[y_tile][x_tile];
		} else {
			return 0;
		}
    } catch (err) {
        return 0;
    }
};

DoctorRobot.prototype.intersectedTile = function (entity) {
	"use strict";
    return this.pixel_to_tile(entity.x, entity.y) > 0;
};

DoctorRobot.prototype.true_pixel_to_tile = function (x, y) {
	"use strict";
    var x_tile = x >> 5,
        y_tile = y >> 5;
    return this.map[y_tile][x_tile];
};

DoctorRobot.prototype.map_iterate = function (func) {
	"use strict";

	var x, y;

    for (y = 0; y < this.map.length; y += 1) {
        for (x = 0; x < this.map[0].length; x += 1) {
            func(x, y);
        }
    }
};


DoctorRobot.prototype.make_bullets = function () {
	"use strict";

	var i;

    for (i = 0; i < this.max_bullets; i += 1) {
        this.bullets[i] = [];
        this.bullets[i].alive = false;
    }
};

DoctorRobot.prototype.make_particles = function () {
	"use strict";

	var i;

	for(i = 0; i < this.max_particles; i++) {
		this.particles[i] = [];
		this.particles[i].alive = false;
		this.particles[i].x_vel = Math.floor(Math.random()*10 - 5);
		this.particles[i].y_vel = Math.floor(Math.random()*10 - 5);
		this.particles[i].age = 0;
	}
};

DoctorRobot.prototype.Entity = function (x_t, y_t, tp, img, tile, key) {
	"use strict";

    this.x_tile = x_t;
    this.y_tile = y_t;
	this.direction = 1;
	this.y_index = 0;
    this.y_inertia = 0;
    this.type = tp;
    this.key = key;
    this.x = this.x_tile * this.TILE_WIDTH;
    this.y = this.y_tile * this.TILE_WIDTH;
    this.image = img;
    this.current_anim = [0, 0]; //this.door_anim[0];
    this.frame = this.current_anim.length - 1;
    this.state = this.ACTIVATED;
    this.is_teleportable = false;
    this.is_being_pushed = false;
    this.wait_index = 0;
    this.alive = true;
    this.loop_animation = false;
    //this.map[this.y_tile][this.x_tile] = tile;

    this.draw = function () {
		var x_index;

        if (!this.current_anim) {
            return;
        }

        this.wait_index += 1;
        if (this.alive) {
            if (this.wait_index > this.frameRate) {
                this.wait_index = 0;
                this.frame += 1;
            }
            if (this.frame >= this.current_anim.length) {
                if (this.loop_animation) {
                    this.frame = 0;
                } else {
                    this.frame = this.current_anim.length - 1;
                }
            }
            if (this && this.image) {
				x_index = this.current_anim[this.frame];
/*
                if(this.type === 13) {
					y_index = 32;
				}
*/
                doctorRobot.ctx.drawImage(this.image,
							  x_index * 32, this.y_index, 32, 32,
							  this.x + this.window_x,this.y + this.window_y, 32, 32);
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


DoctorRobot.prototype.build_fluid = function (x_t, y_t, tp, img, tile, key) {
	"use strict";

    var entity = new this.Entity(x_t, y_t, tp, img, tile, key);
	if(tp === 13) {
		entity.y_index = 32;
	}
    entity.current_anim = this.fluid_anim;
    entity.loop_animation = true;

    entity.check_player = function() {
        this.player.alive = false;
        this.reset_level = true;

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
        this.hit_points = 10;
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

DoctorRobot.prototype.make_enemies = function () {
	"use strict";
	var x, y;

    for(y = 0; y<this.map.length; y++) {
        for(x = 0; x< this.map[0].length; x++) {
            if(this.map[y][x] === this.T_ENEMY_1_START ||
                this.map[y][x] === this.T_ENEMY_2_START ||
                this.map[y][x] === this.T_BOSS_1_START) {
                this.enemies.push(this.make_enemy(x, y, this.map[y][x]));
            }
        }
    }
};

DoctorRobot.prototype.make_enemy_bullets = function () {
	"use strict";
	var i;

    for(i = 0; i < this.max_enemy_bullets; ++i) {
        this.enemy_bullets[i] = [];
        this.enemy_bullets[i].alive = false;
        this.enemy_bullets[i].bullet_timer = 10;
    }
};



DoctorRobot.prototype.make_entity = function (x, y, type, parent_type) {
	"use strict";

    //TODO: fix this
    var map = this.map;

    // Switches
    if(map[y][x-1] === this.E_SWITCH) {
        return build_switch(x, y, this.SWITCH, this.images.switch_1, this.T_EMPTY, type);
    } else if (map[y][x+1] === this.E_SWITCH) {
        return build_switch(x, y, this.SWITCH, this.images.switch_2, this.T_EMPTY, type);

		// Teleporter
    } else if(map[y+1][x] === this.E_TELEPORTER) {
        return build_teleporter(x, y, this.TELEPORTER, this.images.teleport_1, this.T_EMPTY, type, parent_type);
    } else if(map[y-1][x] === this.E_TELEPORTER) {
        return build_teleporter(x, y, this.TELEPORTER, this.images.teleport_2, this.T_EMPTY, type, parent_type);

		// Doors
    } else if(map[y-1][x] === this.E_DOOR) {
        return build_door(x, y, this.DOOR, this.images.door_1, this.EMPTY_BLOCKING, type);
    } else if(map[y+1][x] === this.E_DOOR) {
        return build_door(x, y, this.DOOR, this.images.door_2, this.EMPTY_BLOCKING, type);
    } else if(map[y][x-1] === this.E_DOOR) {
        return build_door(x, y, this.DOOR, this.images.door_3, this.EMPTY_BLOCKING, type);
    } else if(map[y][x+1] === this.E_DOOR) {
        return build_door(x, y, this.DOOR, this.images.door_4, this.EMPTY_BLOCKING, type);

		// Jetpack
    } else if(type === this.T_JETPACK) {
        return build_jetpack(x, y, type, this.images.jetpack_icon, this.T_EMPTY);

		// Crate
    } else if(type === this.T_CRATE) {
        return build_crate(x, y, type, this.images.crate_1, this.T_EMPTY);

    } else if(type === this.T_PERSON) {
        return build_person(x, y, type, this.people_img, this.T_EMPTY);

		// Exit
    } else if (type === this.T_EXIT) {
        return build_exit(x, y, type, null, this.T_EMPTY);

		// Fluid
    } else if (type === this.T_FLUID || type === 13) {
        return this.build_fluid(x, y, type, this.images.fluid_1, this.T_EMPTY);

		// Jumper
    } else if (type === this.T_JUMPER) {
        return build_jumper(x, y, type, this.images.jumper, this.T_EMPTY);

		// Platform
    } else if (type === this.T_PLATFORM) {
        return build_platform(x, y, type, this.images.platform_1, this.T_EMPTY);

		// Unknown
    } else {
        return new this.Entity(x, y, type, this.images.door_2, this.T_EMPTY);
    }
};


DoctorRobot.prototype.build_player = function () {
	"use strict";

    var player = {};
    player.current_anim = [];

    this.map_iterate(function(x, y) {
        if(doctorRobot.map[y][x] === doctorRobot.T_PLAYER_START) {
            doctorRobot.player = doctorRobot.make_entity(x, y, doctorRobot.map[y][x], doctorRobot.T_EMPTY, doctorRobot.T_PLAYER_START);
            // players are taller than normal stuff
            doctorRobot.player.y -= 23;
        }
    });

    player.initialize = function() {
        doctorRobot.map_iterate(function(x, y) {
            if(doctorRobot.map[y][x] === doctorRobot.T_PLAYER_START) {
                this.x = x * 32;
                this.y = y * 32 - 23;
                doctorRobot.map[y][x] = 0;
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
            for(i = 0; i < doctorRobot.entities.length; ++i) {
				adjusted_y = this.y;
				adjusted_height = 48;
				if(this.crouching) {
					adjusted_y = this.y + 18;
					adjusted_height = 30;
				}
                if(doctorRobot.entities[i] && doctorRobot.intersect(this.x, adjusted_y, 32, adjusted_height,
                    doctorRobot.entities[i].x, doctorRobot.entities[i].y, 32, 32)) {
                    doctorRobot.entities[i].check_player();
                }
				if(doctorRobot.entities[i].type === doctorRobot.T_PLATFORM &&
                    doctorRobot.on_top_of(this.x + 8, this.y, 16, 48,
                        doctorRobot.entities[i].x, doctorRobot.entities[i].y, 32, 32)) {
					console.log("on a platform");
					this.x += doctorRobot.entities[i].direction;
					this.on_a_crate = true;
				}
            }
            this.y_inertia = this.y_inertia + doctorRobot.gravity;
            this.y += this.y_inertia;
            if(doctorRobot.pixel_to_tile(this.x + 8, this.y+15) > 0 || doctorRobot.pixel_to_tile(this.x + 24, this.y+15) > 0) {
                this.y -= this.y_inertia;
                this.y_inertia = 0;
            } else if(this.on_a_crate || doctorRobot.pixel_to_tile(this.x + 8, this.y+48) > 0 || doctorRobot.pixel_to_tile(this.x + 24, this.y + 48) > 0) {
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
                if(doctorRobot.pixel_to_tile(this.x + 8, this.y+32) > 0
				   || doctorRobot.pixel_to_tile(this.x + 24, this.y + 32) > 0
                   || doctorRobot.pixel_to_tile(this.x + 8, this.y+15) > 0
				   || doctorRobot.pixel_to_tile(this.x + 24, this.y+15) > 0
                   || doctorRobot.pixel_to_tile(this.x + 8, this.y+48) > 0
				   || doctorRobot.pixel_to_tile(this.x + 24, this.y+48) > 0) {
                    this.x += 3;
                    this.standing = true;
                    this.current_anim = doctorRobot.anim[doctorRobot.STAND_LEFT];
                } else {
                    this.current_anim = doctorRobot.anim[doctorRobot.WALK_LEFT];
                }

                this.direction = -1;
                this.standing = false;
            }

            if(this.moving_right) {
                if(!this.crouching) {
                    //inertiaX += 1;
                    this.x += 3;
                }
                if(doctorRobot.pixel_to_tile(this.x + 8, this.y+32) > 0
				   || doctorRobot.pixel_to_tile(this.x + 24, this.y + 32) > 0
                   || doctorRobot.pixel_to_tile(this.x + 8, this.y+15) > 0
				   || doctorRobot.pixel_to_tile(this.x + 24, this.y+15) > 0
                   || doctorRobot.pixel_to_tile(this.x + 8, this.y+48) > 0
				   || doctorRobot.pixel_to_tile(this.x + 24, this.y+48) > 0) {
                    this.x -= 3;
                    this.standing = true;
                    current_anim = doctorRobot.anim[doctorRobot.STAND_RIGHT];
                } else {
                    current_anim = doctorRobot.anim[doctorRobot.WALK_RIGHT];
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
                        current_anim = doctorRobot.anim[doctorRobot.JET_LEFT];
                    } else {
                        current_anim = doctorRobot.anim[doctorRobot.JET_RIGHT];
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
                    current_anim = doctorRobot.anim[doctorRobot.STAND_RIGHT];
                } else {
                    current_anim = doctorRobot.anim[doctorRobot.STAND_LEFT];
                }

            }
            if(this.crouching && (this.grounded || this.on_a_crate)) {
                if(this.direction > 0) {
                    current_anim = doctorRobot.anim[doctorRobot.CROUCH_RIGHT];
                } else {
                    current_anim = doctorRobot.anim[doctorRobot.CROUCH_LEFT];
                }
            } else if (this.crouching) {
                if(this.direction > 0) {
                    current_anim = doctorRobot.anim[doctorRobot.STAND_RIGHT];
                } else {
                    current_anim = doctorRobot.anim[doctorRobot.STAND_LEFT];
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
            this.waitIndex++;
			if(this.waitIndex > doctorRobot.frameRate) {
                this.waitIndex = 0;
				if(this.grounded) {
					this.frame++;
				}
			}
			if(this.frame >= this.current_anim.length) {
				this.frame = 0;
			}
			doctorRobot.ctx.drawImage(doctorRobot.dude_img, this.current_anim[this.frame] * 32, 0, 32, 48,
						  this.x + doctorRobot.window_x,this.y + doctorRobot.window_y, 32, 48);
        }
    };
    return player;
};

DoctorRobot.prototype.make_entities = function () {
	"use strict";

    // make doors, switches and trampolines.
    // have to make switches before doors
    this.map_iterate(function(x, y) {
        if(doctorRobot.map[y][x] > 15 && doctorRobot.map[y][x] < 32) {
            doctorRobot.entities.push(doctorRobot.make_entity(x, y, doctorRobot.map[y][x], doctorRobot.SWITCH));
        }
    });
    this.map_iterate(function(x, y) {
        if(doctorRobot.map[y][x] > 31 && doctorRobot.map[y][x] < 48) {
            doctorRobot.entities.push(doctorRobot.make_entity(x, y, doctorRobot.map[y][x], doctorRobot.DOOR));
        }
    });
    this.map_iterate(function(x, y) {
        if(doctorRobot.map[y][x] > 7 && doctorRobot.map[y][x] < 16) {
            doctorRobot.entities.push(doctorRobot.make_entity(x, y, doctorRobot.map[y][x], doctorRobot.map[y][x]));
        }
    });

};

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


DoctorRobot.prototype.get_input = function () {
	"use strict";
	if(!this.keys) { return; }
	var i;

    this.key_pressed = false;

    for(i = 0; i < this.keys.length; ++i) {
        if(this.keys && this.keys[i] !== false && this.keys[i] !== undefined) {
            this.key_pressed = true;
            break;
        }
    }


    if (this.keys.hasOwnProperty('88') && this.keys[88] && this.player.alive) {
        dude_fire();
    }
    this.player.standing = true;
    this.player.moving_left = this.keys.hasOwnProperty('37') && this.keys[37];
    this.player.moving_right = this.keys.hasOwnProperty('39') && this.keys[39];
    this.player.up = this.keys.hasOwnProperty('90') && this.keys[90];

    if (this.keys.hasOwnProperty('40') && this.keys[40]) {
        this.player.down = true;
    } else {
        this.player.down = false;
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

DoctorRobot.prototype.clear_screen = function () {
	"use strict";
    this.ctx.drawImage(this.tile_img, 0, 0, canvas.width, canvas.height);
};

DoctorRobot.prototype.draw_text = function (str, x, y) {
	"use strict";
	var i, sx, sy, index;
    for (i=0; i<str.length; i++){
        index = str.charCodeAt(i) - 32;
        sx = index%10 * 10;
        sy = Math.floor(index/10) * 10;
        this.ctx.drawImage(this.font_img, sx, sy, 10, 10,
                      x + (i * 12) , y, 10, 10);
    }
}


DoctorRobot.prototype.drawRectangle = function (x, y, w, h, fill) {
	"use strict";

	this.ctx.beginPath();
	this.ctx.rect(x, y, w, h);
    this.ctx.closePath();
    this.ctx.stroke();
    if (fill) { this.ctx.fill(); }
}

DoctorRobot.prototype.LevelButton = function (x, y, width, height, text, action) {
	"use strict";
	
	this.inheritsFrom = Button;
	this.inheritsFrom(x, y, 64, 64, text, action);
	this.isAButton = "true";

	this.draw = function() {
		this.move();
		doctorRobot.ctx.drawImage(level_button_img,
					  0, 0, 64, 64,
					  this.x, this.y, 64, 64);
		doctorRobot.draw_text(this.text, this.text_x, this.text_y);
	};

    this.process_click = function() {
        if(doctorRobot.mouseUp) {
			doctorRobot.current_level = this.text;
			doctorRobot.resetLevel();
            doctorRobot.mouseUp = false;
        }
    };
};

DoctorRobot.prototype.Button = function (x, y, width, height, text, action) {
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
            doctorRobot.ctx.fillStyle = "#330000";
        } else if(this.state === this.HOVER) {
            doctorRobot.ctx.fillStyle = "#333300";
        }
        doctorRobot.drawRectangle(x,y, width, height, true);
        doctorRobot.ctx.fillStyle = "#000000";
        doctorRobot.draw_text(this.text, this.text_x, this.text_y);
    };
};

DoctorRobot.prototype.ImageButton = function (image, x, y, width, height, action) {
	"use strict";

    this.inheritsFrom = Button;
    this.inheritsFrom(x, y, width, height, action);
    this.image = "I have an image";

    this.draw = function() {
        this.move();
        doctorRobot.ctx.drawImage(this.image,
                      this.current_animation[this.current_frame] * 32, 0, 
                      this.width, this.height,
                      this.x,this.y, this.width, this.height);
        this.current_frame++;
        if(this.current_animation.length >= this.current_frame) {
            this.current_frame = 0;
        }
    };

};

DoctorRobot.prototype.Screen = function (background) {
	"use strict";

    this.buttons = [];
    this.background_image = background;
};


DoctorRobot.prototype.SplashScreen = function () {
	"use strict";

    this.buttons = [];

    var 
	button_width = 300,
    button_height = 20,
    button_padding = 10,
    button_x = (doctorRobot.canvas.width - button_width) / 2,
    button_y = 200;

    doctorRobot.interstitialId = doctorRobot.GET_READY;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "START GAME", doctorRobot.CHAPTERS));
    button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "HOW TO PLAY", doctorRobot.HELP));
    button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "CREDITS", doctorRobot.CREDITS));

    this.update = function() {
    };

    this.draw = function() {
		var i;
        doctorRobot.ctx.drawImage(doctorRobot.splash_screen_img, 0, 0);
		draw_text("ENGINE " + version, 2, 308);

        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
    };

}
//////////////////////////////////////////////////////////////////
//  LEVEL END

DoctorRobot.prototype.HelpScreen = function () {
	"use strict";

    var wait = 0;

    this.update = function() {
        if(wait > 60) {
            if(doctorRobot.key_pressed) {
                doctorRobot.game_state = doctorRobot.INITIALIZE;
                wait = 0;
            }
        }
        wait++;
    };

    this.draw = function() {
        doctorRobot.ctx.drawImage(doctorRobot.splash_screen_img, 0, 0);
        doctorRobot.draw_text("Z:          FIRE",80, 220);
        doctorRobot.draw_text("X:          JUMP/JETPACK",80, 234);
        doctorRobot.draw_text("DOWN ARROW: CROUCH", 80, 248);
        doctorRobot.draw_text("DO NOT GET SHOT", 80, 262);
    };

}

//////////////////////////////////////////////////////////////////
//  PAUSED

DoctorRobot.prototype.PauseScreen = function () {
	"use strict";

    this.buttons = [];

    var button_width = 300,
    button_height = 20,
    button_padding = 10,
    button_x = (doctorRobot.canvas.width - button_width) / 2,
    button_y = 200,
	wait;

    doctorRobot.interstitialId = doctorRobot.GET_READY;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "RESUME GAME", doctorRobot.RUNNING));

	button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "RESTART LEVEL", doctorRobot.RESET_LEVEL));

	button_y += button_height + button_padding;

    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "RESTART GAME", doctorRobot.INITIALIZE));

    this.activeButton = this.buttons[0];

    this.update = function() {
        if(doctorRobot.key_pressed) {
            if(wait > 60) {
                this.activeButton.activate();
                wait = 0;
            }
        }
        wait++;
    };

    this.draw = function() {
		var i;
        doctorRobot.ctx.drawImage(doctorRobot.splash_screen_img, 0, 0);
        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
    };

}


//////////////////////////////////////////////////////////////////
//  INTERSTITIAL

DoctorRobot.prototype.Interstitial = function () {
	"use strict";

    var wait = 0;

    this.update = function() {
        if(wait > 100) {
            doctorRobot.game_state = doctorRobot.RUNNING;
        }
        wait++;
    };

    this.draw = function() {
        if(doctorRobot.interstitialId === doctorRobot.GET_READY) {
            doctorRobot.ctx.drawImage(doctorRobot.splash_screen_img, 0, 0);
            doctorRobot.draw_text("GET READY!!!", 80, 248);
            doctorRobot.ctx.fillStyle = "#990000";
            doctorRobot.ctx.fillRect(80, 260, wait * 2, 10);
        }
    };

}


DoctorRobot.prototype.load_map = function(level) {
	"use strict";
	var	
	url,
	request;

    this.saved_people = 0;
    this.total_people = 0;
    this.current_boss = null;
    this.timer = 0;
    if(level > 4) {
        this.game_state = GAME_OVER;
        this.current_level = 1;
    }
    request = new XMLHttpRequest();
    url = '//' + loc + '/play/doctor-robot/DoctorRobot.php?getMap|'+level;
    request.open('GET', url);
    request.onreadystatechange = function() {
        if (request.readyState !== 4 || request.status !== 200) {
			return;
        }
        doctorRobot.parse_map(request.responseText);
        doctorRobot.initialize_data();
    };
    request.send(null);
};


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
    this.buttons = [];

    var 
	button_width = 300,
    button_height = 20,
    button_padding = 10,
    button_x = (canvas.width - button_width) / 2,
    button_y = 50;

    interstitialId = GET_READY;
	
    this.buttons.push(new Button(button_x, button_y, 
                                 button_width, button_height, 
                                 "CHAPTER 01", LEVELS));

    this.update = function() {
	};

    this.draw = function() {
		var i;
		ctx.drawImage(tile_img, 0, 0, canvas.width, canvas.height);
//        ctx.drawImage(chapters_img, 0, 0);
        draw_text("CHAPTERS",20, 20);
        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
	};
}

function LevelsScreen() {
	"use strict";

    var wait = 0;
    this.buttons = [];

    var 
	button_width = 64,
    button_height = 64,
    button_padding = 10,
    button_x = (canvas.width - button_width) / 2,
    button_y = 200;

    interstitialId = GET_READY;

	var x = 20;
	var y = 74;

	for(var i = 0; i < 5; ++i) {
		if (i == 0) {
			//
		} else if(x > canvas.width - 140) {
			x = 20;
			y += 74;
		} else {
			x += 74;
		}
		this.buttons.push(makeLevelButton(x, y, (i+1) + ''));		
	}
/*
	var x = 20;
	var y = 74;

	x += 74;
	this.buttons.push(makeLevelButton(x, y, '02'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '03'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '04'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '05'));

	x = 20;
	y += 74;
	this.buttons.push(makeLevelButton(x, y, '06'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '07'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '08'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '09'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '10'));
	x += 74;

	x = 20;
	y += 74;
	this.buttons.push(makeLevelButton(x, y, '11'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '12'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '13'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '14'));
	x += 74;
	this.buttons.push(makeLevelButton(x, y, '15'));
	x += 74;
*/
					  

    this.update = function() {
	};

    this.draw = function() {
		var i;
        ctx.drawImage(chapters_img, 0, 0);
        draw_text("LEVELS",20, 50);
        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
	};
}

function makeLevelButton(x, y, id) {

    return new LevelButton(x, y, 64, 64, id, RUNNING);

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

function showLevelsScreen() {
	"use strict";

    if(levelsScreen === undefined || levelsScreen === null) {
        levelsScreen = new LevelsScreen();
    }
    levelsScreen.update();
    levelsScreen.draw();
}

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
	console.log("resetting level");
    reset_level = true;
	reset_timer = 100;
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

DoctorRobot.prototype.move_entities = function () {
	"use strict";
	var i;
    // make sure the entities are even on the screen
    for(i = 0; i < this.entities.length; ++i) {
        this.entities[i].move();
    }
};

DoctorRobot.prototype.move_enemies = function () {
	"use strict";

	var i, k;

    for(i = 0; i < this.enemies.length; ++i) {
        if(this.enemies[i].alive) {
            // check for crate intersections
            for(k = 0; k < this.entities.length; ++k) {
                if(this.entities[k].type === this.T_CRATE) {
                    if(this.intersect(this.enemies[i].x, this.enemies[i].y, 32, 48,
                        this.entities[k].x, this.entities[k].y, 32, 32)) {
                        if(this.enemies[i].x < this.entities[k].x) {
                            this.enemies[i].x -=4;
                        } else {
                            this.enemies[i].x += 4;
                            if(this.pixel_to_tile(this.enemies[i].x, this.enemies[i].y) > 0 ||
                                this.pixel_to_tile(this.enemies[i].x + 32, this.enemies[i].y) > 0) {
                                if(this.enemies[i].x < this.entities[k].x) {
                                    this.enemies[i].x +=4;
                                    this.entities[k].x += 4;
                                    this.player.x += 4;
                                } else {
                                    this.enemies[i].x -=4;
                                    this.entities[k].x -= 4;
                                    this.player.x -= 4;
                                }
                            }
                        }
                    }
                }
            }
            if(this.enemies[i].y_inertia < 10) {
                this.enemies[i].y_inertia = this.enemies[i].y_inertia * 2;
            } else {
                this.enemies[i].y_inertia = 10;
            }
            this.enemies[i].y += this.enemies[i].y_inertia;
            if(this.pixel_to_tile(this.enemies[i].x + 2, this.enemies[i].y + 47) > 0 ||
                this.pixel_to_tile(this.enemies[i].x + 30, this.enemies[i].y + 47) > 0) {
                this.enemies[i].y -= this.enemies[i].y_inertia;
                this.enemies[i].y_inertia = 1;
            }

            if(this.vertical_intersect(this.enemies[i].y, 48, this.player.y, 48)) {
                if(this.enemies[i].x > this.player.x) {
                    this.enemies[i].direction = -1;
                } else {
                    this.enemies[i].direction = 1;
                }
                if(this.enemies[i].bullet_timer < 20) {
                    this.enemies[i].bullet_timer++;
                } else {
                    this.enemy_fire(this.enemies[i].x, this.enemies[i].y, this.enemies[i].direction);
                    this.enemies[i].bullet_timer = 0;
                }
                if(this.enemies[i].type !== this.T_BOSS_1_START) {
					if(this.enemies[i].direction === -1) {
                        this.enemies[i].current_anim = this.enemy_anim[this.WALK_RIGHT];
					} else {
                        this.enemies[i].current_anim = this.enemy_anim[this.WALK_LEFT];
					}
                }
                continue;  // we're done here, robot stops and shoots
            }

            this.enemies[i].x += this.enemies[i].direction;

            // if there is a tile in front of them, change directions
            if(this.pixel_to_tile(this.enemies[i].x, this.enemies[i].y + 30) > 0 ||
                this.pixel_to_tile(this.enemies[i].x + 32, this.enemies[i].y + 30) > 0) {
                this.enemies[i].direction = -this.enemies[i].direction;
                this.enemies[i].x += this.enemies[i].direction;
            }
            // if they would be walking on an empty tile, change direction
            if(this.pixel_to_tile(this.enemies[i].x + 32, this.enemies[i].y + 50) < 1 ||
                this.pixel_to_tile(this.enemies[i].x, this.enemies[i].y + 50) < 1) {
                this.enemies[i].direction = -this.enemies[i].direction;
            }

            if(this.enemies[i].type === this.T_BOSS_1_START) {
                this.enemies[i].current_anim = this.enemy_anim[this.WALK_RIGHT];
                //enemies[i].current_anim = boss_anim[BOSS_FULL];
            } else {
                if(this.enemies[i].direction === -1) {
                    this.enemies[i].current_anim = this.enemy_anim[this.WALK_RIGHT];
                } else {
                    this.enemies[i].current_anim = this.enemy_anim[this.WALK_LEFT];
                }
            }
        }
    }
};

DoctorRobot.prototype.isOnScreen = function (entity) {
	"use strict";

    return !(entity.x > this.canvas.width - this.window_x || entity.x <  - this.window_x ||
			 entity.y > this.canvas.height - this.window_y || entity.y <  - this.window_y);

};


DoctorRobot.prototype.move_enemy_bullets = function () {
	"use strict";
    this.enemy_bullet_timer++;
    var y_offset,
	i, k,
	robot_y_top;

    if(this.player.crouching) {
        y_offset = 25;
    } else {
        y_offset = 10;
    }
    robot_y_top = this.player.y + y_offset;

    for(i = 0; i < this.enemy_bullets.length; ++i) {

        if(this.enemy_bullets[i].alive) {
            this.enemy_bullets[i].alive = this.isOnScreen(this.enemy_bullets[i]);
            this.enemy_bullets[i].x += 4 * this.enemy_bullets[i].direction;

            if (this.intersectedTile(this.enemy_bullets[i])) {
                // back the bullet up
                this.enemy_bullets[i].x -= this.bullet_speed * this.enemy_bullets[i].direction;
                this.enemy_bullets[i].alive = false;
                this.fire_particles(this.enemy_bullets[i].x, this.enemy_bullets[i].y, 2, 'red');
            } else {
                if(this.intersect(this.enemy_bullets[i].x, this.enemy_bullets[i].y, 4, 4,
                    this.player.x + 10, robot_y_top, 12, 30)) {
                    this.enemy_bullets[i].alive = false;
                    this.fire_particles(this.enemy_bullets[i].x, this.enemy_bullets[i].y,
                                   2, 'red');
                    this.fire_particles(this.player.x + 16, this.player.y + 16, 4,'grey');
                    if(!this.god_mode) {
                        this.reset_level = true;
                        this.player.alive = false;
                    }
                }

                for(k = 0; k < this.entities.length; ++k) {
                    if(this.isOnScreen(this.entities[k]) && this.entities[k].type === this.T_CRATE) {
                        if(this.intersect(this.enemy_bullets[i].x, this.enemy_bullets[i].y, 4, 4,
                            this.entities[k].x, this.entities[k].y, 32, 32)) {
                            this.enemy_bullets[i].alive = false;
                            this.fire_particles(this.enemy_bullets[i].x,
                                this.enemy_bullets[i].y,
                                           2, 'red');
                        }
                    }
                }

            }
        }
    }
};

DoctorRobot.prototype.move_bullets = function () {
	"use strict";

	var i, j, k;

    this.bullet_timer++;
    for(i = 0; i < this.max_bullets; ++i) {
        if(this.bullets[i].alive) {
            this.bullets[i].x += this.bullet_speed * this.bullets[i].direction;
            if(this.bullets[i].x > this.canvas.width - this.window_x || this.bullets[i].x < - this.window_x) {
                this.bullets[i].alive = false;
			} else if (pixel_to_tile(this.bullets[i].x, this.bullets[i].y) > 0) {
                this.bullets[i].x -= this.bullet_speed * this.bullets[i].direction; // back the bullet up
                this.bullets[i].alive = false;
                fire_particles(this.bullets[i].x, this.bullets[i].y, 2, 'red');
            } else {
                for(j = 0; j < this.enemies.length; ++j) {
                    if(this.enemies[j].alive) {
                        if(this.bullets[i] && this.intersect(this.bullets[i].x, this.bullets[i].y, 4, 4,
                            this.enemies[j].x + 10, this.enemies[j].y, 12, 48)) {
                            this.enemies[j].hit_points -= 1;
                            this.fire_particles(this.bullets[i].x, this.bullets[i].y, 2, 'red');
                            this.bullets[i].alive = false;

                            if(this.enemies[j].type === this.T_BOSS_1_START) {
                                this.current_boss = this.enemies[j];
                                if(this.enemies[j].hit_points < 3) {
                                    this.enemies[j].current_anim = this.boss_anim[BOSS_EMPTY];
                                } else if (this.enemies[j].hit_points < 8) {
                                    this.enemies[j].current_anim = this.boss_anim[BOSS_HALF];
                                }
                            }
                            if(this.enemies[j].hit_points <= 0) {
                                this.enemies[j].alive = false;
                                this.fire_particles(this.enemies[j].x + 16, this.enemies[j].y+ 16, 4,'red');
                            }
                        }
                    }
                }
                for(k = 0; k < this.entities.length; ++k) {
                    if(this.entities[k].type === this.T_CRATE) {
						/*
                        if(entities[k].x < bullets[i].x) {
                            //entities[k].x++;
                        } else {
                            //entities[k].x--;
                        }*/
                        if(this.bullets[i] && this.intersect(this.bullets[i].x, this.bullets[i].y, 4, 4,
                            this.entities[k].x, this.entities[k].y, 32, 32)) {
                            this.bullets[i].alive = false;
                            this.fire_particles(this.bullets[i].x, this.bullets[i].y, 2, 'red');
                        }

                    }
                }
            }
        }
    }
}

DoctorRobot.prototype.move_particles = function () {
	"use strict";
	
	var i;

    for(i = 0; i < this.max_particles; ++i) {
        this.particles[i].age+=1;
		if(this.particles[i].age > 100) {
            this.particles[i].alive = false;
            this.particles[i].age = 0;
		}
		if(this.particles[i].alive) {
            this.particles[i].x += this.particles[i].x_vel;
			if(this.pixel_to_tile(this.particles[i].x, this.particles[i].y) > 0) {
                this.particles[i].x -= this.particles[i].x_vel;
                this.particles[i].x_vel = -this.particles[i].x_vel;
			}
            this.particles[i].y_vel += 0.3 / this.particles[i].size;
            this.particles[i].y += this.particles[i].y_vel;
			if(this.pixel_to_tile(this.particles[i].x, this.particles[i].y) > 0) {
                this.particles[i].y -= this.particles[i].y_vel * this.gravity / this.particles[i].size;
                this.particles[i].y_vel = -this.particles[i].y_vel;
			}
		}
	}
}

DoctorRobot.prototype.move_stuff = function () {
	"use strict";

    this.player.move();
    this.move_bullets();
    this.move_particles();
    this.move_entities();
    this.move_enemies();
    this.move_enemy_bullets();
};

DoctorRobot.prototype.draw_map = function () {
	"use strict";

	var x_pos, y_pos, sx, sy, index;

    this.map_iterate(function(x, y) {
        if(doctorRobot.map[y][x] > 47) {
            x_pos = doctorRobot.window_x + x * 32;
            y_pos = doctorRobot.window_y + y * 32;
            if(x_pos > -32 || x_pos < doctorRobot.ctx.width || y_pos > -32 || y_pos < doctorRobot.ctx.height) {
                index = doctorRobot.map[y][x];
                sx = index%16 * 32;
                sy = Math.floor(index/16) * 32;
                doctorRobot.ctx.drawImage(doctorRobot.map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
            }
        }
    });
};

DoctorRobot.prototype.draw_particles = function () {
	"use strict";
	var i;

	for(i = 0; i < this.max_particles; ++i) {
		if(this.particles[i].alive) {
            if(this.particles[i].col === 'red') {
                this.ctx.fillStyle = "#" + (99 - this.particles[i].age) + "0000";
            } else if(this.particles[i].col === 'gray') {
                this.ctx.fillStyle = "#" + (99 - this.particles[i].age) + "7777";
            } else {
                this.ctx.fillStyle = "#" + (99 - this.particles[i].age) + "7777";
            }
			this.drawRectangle(this.particles[i].x + this.window_x, this.particles[i].y + this.window_y, this.particles[i].size, this.particles[i].size, true);
		}
	}
};

DoctorRobot.prototype.draw_bullets = function () {
	"use strict";
	var i;
    for(i = 0; i < this.bullets.length; ++i) {
        if(this.bullets[i].alive) {
            this.ctx.drawImage(this.bullet_img, 0, 0, 4, 4, this.bullets[i].x + this.window_x, this.bullets[i].y + this.window_y, 4, 4);
        }
    }
};

DoctorRobot.prototype.draw_enemies = function () {
	"use strict";
	var i;

    for(i = 0; i < this.enemies.length; ++i) {
        this.enemies[i].wait_index++;
        if(this.enemies[i].alive) {
            if(this.enemies[i].wait_index > this.frameRate) {
                this.enemies[i].wait_index = 0;
                this.enemies[i].frame++;
            }
            if(this.enemies[i].frame >= this.enemies[i].current_anim.length) {
                this.enemies[i].frame = 0;
            }
            this.ctx.drawImage(this.enemies[i].image, this.enemies[i].current_anim[this.enemies[i].frame] * 32, 0, 32, 48,
                this.enemies[i].x + this.window_x,this.enemies[i].y + this.window_y, 32, 48);
        }
    }
};

DoctorRobot.prototype.draw_entities = function () {
	"use strict";
	var i;
    for(i = 0; i < this.entities.length; ++i) {
        this.entities[i].draw();
    }
};

DoctorRobot.prototype.draw_people_count = function () {
	"use strict";

    doctorRobot.draw_text("RESCUED: " + this.saved_people + "/" + this.total_people, 100, 3);
};

DoctorRobot.prototype.draw_timer = function () {
	"use strict";

	var seconds, mm, ss, tens;
	
    seconds = this.timer / 100 ;
    mm = ((seconds / 60).toString()).split('.')[0];
    ss = ((seconds % 60).toString()).split('.')[0];
    this.timer++;
    if(ss < 10) { tens = 0; } else { tens = ''; }

    this.static_time = mm + ":" + tens + ss;

    this.draw_text(this.static_time, 300, 3);
};


DoctorRobot.prototype.draw_hud = function () {
	"use strict";

    this.ctx.drawImage(this.hud_img, 0, 0, this.canvas.width, 16);
    this.ctx.fillStyle = "#000000";
    this.drawRectangle(40,4, 50, 8, true);
    this.ctx.fillStyle = "#990000";
    this.drawRectangle(40, 4, this.player.jetpack_fuel/4, 8, true);
    this.ctx.drawImage(this.images.fuel_overlay, 2, 2);
    //draw_text(current_level + " " + map_name,100, 3);

    this.draw_timer();
    this.draw_people_count();
    if(this.current_boss) {
        this.drawRectangle(40, 24, this.current_boss.hit_points*2, 8, true);
        this.draw_text("BRAIN BOSS", 40, 34);
        if(this.current_boss.hit_points < 1) {
            this.current_boss = null;
        }
    }

};



DoctorRobot.prototype.draw_enemy_bullets = function () {
	"use strict";
	var i;

    for(i = 0; i < this.enemy_bullets.length; ++i) {
        if(this.enemy_bullets[i].alive) {
            this.ctx.drawImage(this.bullet_img, 0, 0, 4, 4, this.enemy_bullets[i].x + this.window_x, this.enemy_bullets[i].y + this.window_y, 4, 4);
        }
    }

};

DoctorRobot.prototype.resetting_level = function () {
	"use strict";

    this.reset_timer++;
    if(this.reset_timer > 100) {
        this.reset_level = false;
        this.reset_timer = 0;
        this.load_map(this.current_level);
        //initialize_data();
    }
};

DoctorRobot.prototype.build_frame = function () {
    this.move_stuff();
	if(this.window_x > -3) { this.window_x = -3; }
	if(this.window_x < this.canvas.width - (this.map[0].length * 32)) {
        this.window_x = this.canvas.width - (this.map[0].length * 32);
	}
	if(this.window_y > 8) { this.window_y = 8; }
	if(this.window_y < this.canvas.height - (this.map.length * 32 - 8)) {
        this.window_y = this.canvas.height - (this.map.length * 32 - 8);
	}
    if(this.player.x + this.window_x < 200) {
        this.window_x += 3;
    }
    if(this.player.x + this.window_x > this.canvas.width - 200) {
        this.window_x -= 3;
    }
    if(this.player.y + this.window_y <  100) {
        this.window_y += 8;
    }
    if(this.player.y + this.window_y > this.canvas.height - 100) {
        this.window_y -= 8;
    }

    this.clear_screen();
    //draw_parallax();
    this.draw_map();
    this.draw_particles();
    this.draw_bullets();
    if(this.player.alive) {
        this.player.draw();
    }
    this.draw_enemies();
    this.draw_entities();
    this.draw_enemy_bullets();
    this.draw_hud();
    if(this.reset_level) {
        this.resetting_level();
    }
};

DoctorRobot.prototype.game_loop = function () {
    "use strict";

    this.get_input();

	if(this.game_state === this.RUNNING) {
        this.build_frame();
	} else if(this.game_state === this.CREDITS) {
        this.showCreditsScreen();
    } else if (this.game_state === this.RESET_LEVEL) {
        this.resetLevel();
    } else if (this.game_state === this.HELP) {
        this.showHelpScreen();
    } else if (this.game_state === this.CHAPTERS) {
        this.showChaptersScreen();
    } else if (this.game_state === this.LEVELS) {
        this.showLevelsScreen();
    } else if(this.game_state === this.INITIALIZE) {
        this.showSplashScreen();
    } else if(this.game_state === this.INTERSTITIAL) {
        this.showInterstitial();
    } else if(this.game_state === this.LEVEL_END) {
        this.showLevelEnd();
    } else if(this.game_state === this.PAUSED) {
        this.showPauseScreen();
    } else if(this.game_state === this.GAME_OVER) {
        this.showGameOver();
    }
    this.mouseUp = false;

    // pretend the space bar isn't down
    // so that if you hit the space bar at the end of a level
    // the game isn't immediately paused
    this.keys[32] = false;
}


function animate () {
    "use strict";
    window.requestAnimFrame(animate);
    doctorRobot.game_loop();
}

DoctorRobot.prototype.initialize_data = function() {
	"use strict";

    this.image_manager.load_images();

    this.enemies = [];
    this.entities = [];
    this.enemy_bullets = [];
    this.bullets = [];
    this.particles = [];
    this.make_bullets();
    this.make_particles();
    this.make_entities();
    this.make_enemies();
    this.make_enemy_bullets();
    this.player = this.build_player();
    this.player.initialize();
    this.player.alive = true;
    this.window_x = 200 - this.player.x;
    this.window_y = 100 - this.player.y;

    if(!this.animating) {
        animate();
        this.animating = true;
    }
};





DoctorRobot.prototype.init = function() {
    "use strict";

    this.images = [];

    this.images['crate_1'] = new Image();
    this.images.platform_1 = new Image();
    this.images.switch_1 = new Image();
    this.images.switch_2 = new Image();
    this.images.door_1 = new Image();
    this.images.door_2 = new Image();
    this.images.door_3 = new Image();
    this.images.door_4 = new Image();
    this.images.fluid_1 = new Image();
    this.images.jetpack_icon = new Image();
    this.images.teleport_1 = new Image();
    this.images.teleport_2 = new Image();
    this.images.jumper = new Image();
    this.images.fuel_overlay = new Image();

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.image_manager = new this.ImageManager(this);
    this.ctx.mozImageSmoothingEnabled = false;
    this.current_level = 1;
    this.load_map("1");
};




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

var doctorRobot;

function initialize() {
    doctorRobot = new DoctorRobot();
    doctorRobot.init();
}


window.onload = initialize();
window.addEventListener('mousemove', mouseMove, true);
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);


function keyDown(evt){ doctorRobot.keys[evt.keyCode] = true; cancelDefaultAction(evt);}
function keyUp(evt){ doctorRobot.keys[evt.keyCode] = false; cancelDefaultAction(evt);}

function cancelDefaultAction(e) {
	var evt = e ? e:window.event;
	if (evt.preventDefault) evt.preventDefault();
	evt.returnValue = false;
	return false;
}




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
