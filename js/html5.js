/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, onevar: false, undef: true, sloppy: true, stupid: true, vars: true */

console.log("startup");

game_lib = new GameLib();

console.log("got gamelib");

var soundContext = null;

var entity_factory = null;
var god_mode = false;
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

var map_loaded = false;
var current_level = '0';
var current_boss;

var saved_people = 0;
var total_people = 0;

var TILE_WIDTH = 32;

// control tiles
var T_EMPTY = 0;
var T_PLAYER_START = 1;
var T_ENEMY_1_START = 3;
var T_ENEMY_2_START = 4;

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
/*

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
*/
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


// enemies
var enemies = [];
var enemy_bullet_timer = 4;
var max_enemy_bullets = 100;
var enemy_bullets = [];

var BOSS_FULL = 0;
var BOSS_HALF = 1;
var BOSS_EMPTY = 2;


var person_anim = [];
person_anim[0] = [0];
person_anim[1] = [1];
person_anim[3] = [2, 3, 4, 5, 6, 7, 8, 9];


// player
var player;

//var robot_frame = 0;

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

//var inertiaX = 0;
//var inertiaY = 0;
var gravity = 0.5;

var waitIndex = 0;
var frameRate = 6;

var canvas = null;
var ctx = null;
var keys = [];

// entities
var entity_anim = [];
entity_anim[INITIALIZE] = [0, 0, 0];
entity_anim[ACTIVATED] = [0, 1, 2];
entity_anim[DEACTIVATED] = [3, 4, 5];

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


function ImageManager() {
	"use strict";
	var 
	i,
    directory = "images/";

	this.load_image = function(img, name) {
		img.src = directory + name;
		img.onLoad = images_loaded++;
	};

    this.load_images = function() {

		game_images = [
			[level_button_img, 'level_button.png'],
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


function get_trigger(id){
	"use strict";
	var i;

    for(i = 0; i < game_lib.entities.length; ++i) {
        if(game_lib.entities[i].key === id - 16) {
            return game_lib.entities[i];
        }
    }
    return 0;
}

function get_target(id) {
	"use strict";
	var i;
    for(i = 0; i < game_lib.entities.length; ++i) {
        if(game_lib.entities[i].key === id + 16) {
            return game_lib.entities[i];
        }
    }
    return 0;
}

function intersectedTile(entity) {
	"use strict";
    return game_lib.pixel_to_tile(entity.x, entity.y) > 0;
}

function Enemy(x_t, y_t, type, img) {
	"use strict";


    this.enemy_anim = [];
    this.enemy_anim[WALK_RIGHT] = [7, 6, 5, 4];
    this.enemy_anim[WALK_LEFT] = [0, 1, 2, 3];
    this.enemy_anim[STAND] = [6, 6, 6];
    this.boss_anim = [];
    this.boss_anim[BOSS_FULL] = [0, 1, 2, 3, 4];
    this.boss_anim[BOSS_HALF] = [5, 6, 7, 8, 9];
    this.boss_anim[BOSS_EMPTY] = [10, 11, 12, 13, 14];

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

    game_lib.map[this.y_tile][this.x_tile] = 0;


    if(type === T_BOSS_1_START) {
        this.current_anim = this.boss_anim[BOSS_FULL];
        this.hit_points = 10;
    } else {
        this.current_anim = this.enemy_anim[WALK_LEFT];
        this.hit_points = 1;

    }
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

    player.down = keys.hasOwnProperty('40') && keys[40];

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

    //this.easeStrategy = "FLASH";

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


function LevelButton(x, y, width, height, text, action) {
	"use strict";
	
	this.inheritsFrom = Button;
	this.inheritsFrom(x, y, 64, 64, text, action);

	this.draw = function() {
		this.move();
		ctx.drawImage(level_button_img,
					  0, 0, 64, 64,
					  this.x, this.y, 64, 64);
		game_lib.draw_text(this.text, this.text_x, this.text_y);
	};

    this.process_click = function() {
        if(mouseUp) {
			current_level = this.text-1;
			resetLevel();
            mouseUp = false;
        }
    };
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
        game_lib.drawRectangle(x,y, width, height, true);
        ctx.fillStyle = "#000000";
        game_lib.draw_text(this.text, this.text_x, this.text_y);
    };
}
/*
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
*/

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
                                 "START GAME", CHAPTERS));
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
		game_lib.draw_text("ENGINE " + GameLib.VERSION, 2, 308);

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
        game_lib.draw_text("Z:          FIRE",80, 220);
        game_lib.draw_text("X:          JUMP/JETPACK",80, 234);
        game_lib.draw_text("DOWN ARROW: CROUCH", 80, 248);
        game_lib.draw_text("DO NOT GET SHOT", 80, 262);
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
			game_lib.draw_text("GET READY!!!", 80, 248);
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
        current_level = 0;
    }
    game_lib.map = [];

    request = new XMLHttpRequest();
    url = 'maps/level_' + level + '.txt';
    console.log(url);
    request.open('GET', url);
    request.onreadystatechange = function() {
        if (request.readyState !== 4 || request.status !== 200) {
			return;
        }
        game_lib.parse_map(request.responseText);
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
        game_lib.draw_text("CONTAMINATED HUMANS FOUND: " + saved_people, 40, 228);
        game_lib.draw_text("TOTAL TIME WASTED: " + static_time, 80, 260);
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
        game_lib.draw_text("ART AND PROGRAMMING",20, 220);
        game_lib.draw_text("JAMES KERSEY",20, 234);
        game_lib.draw_text("MUSIC AND NOISE", 20, 260);
        game_lib.draw_text("...NO DATA...", 20, 274);
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
        game_lib.draw_text("CONGRATULATIONS",20, 220);
        game_lib.draw_text("YOU HAVE RESCUED THE UNIVERSE",20, 234);
        game_lib.draw_text("TAKE A BREAK!", 20, 248);
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
        game_lib.draw_text("CHAPTERS",20, 20);
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
		this.buttons.push(makeLevelButton(x, y, (i + 1) + ''));
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
        game_lib.draw_text("LEVELS",20, 50);
        for(i = 0; i < this.buttons.length; ++i) {
            this.buttons[i].draw();
        }
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

function showSplashScreen() {
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

function move_entities() {
	"use strict";
	var i;
    // make sure the entities are even on the screen
    for(i = 0; i < game_lib.entities.length; ++i) {
        game_lib.entities[i].move();
    }
}

function move_enemies() {
	"use strict";

	var i, k;

    for(i = 0; i < enemies.length; ++i) {
        if(enemies[i].alive) {
            // check for crate intersections
            for(k = 0; k < game_lib.entities.length; ++k) {
                if(game_lib.entities[k].type === T_CRATE) {
                    if(game_lib.intersect(enemies[i].x, enemies[i].y, 32, 48, 
                                 game_lib.entities[k].x, game_lib.entities[k].y, 32, 32)) {
                        if(enemies[i].x < game_lib.entities[k].x) {
                            enemies[i].x -=4;
                        } else {
                            enemies[i].x += 4;
                            if(game_lib.pixel_to_tile(enemies[i].x, enemies[i].y) > 0 ||
                               game_lib.pixel_to_tile(enemies[i].x + 32, enemies[i].y) > 0) {
                                if(enemies[i].x < game_lib.entities[k].x) {
                                    enemies[i].x +=4;
                                    game_lib.entities[k].x += 4;
                                    player.x += 4;
                                } else {
                                    enemies[i].x -=4;
                                    game_lib.entities[k].x -= 4;
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
            if(game_lib.pixel_to_tile(enemies[i].x + 2, enemies[i].y + 47) > 0 ||
               game_lib.pixel_to_tile(enemies[i].x + 30, enemies[i].y + 47) > 0) {
                enemies[i].y -= enemies[i].y_inertia;
                enemies[i].y_inertia = 1;
            }

            if(game_lib.vertical_intersect(enemies[i].y, 48, player.y, 48)) {
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
						enemies[i].current_anim = enemies[i].enemy_anim[WALK_RIGHT];
					} else {
						enemies[i].current_anim = enemies[i].enemy_anim[WALK_LEFT];
					}
                }
                continue;  // we're done here, robot stops and shoots
            }

            enemies[i].x += enemies[i].direction;

            // if there is a tile in front of them, change directions
            if(game_lib.pixel_to_tile(enemies[i].x, enemies[i].y + 30) > 0 ||
               game_lib.pixel_to_tile(enemies[i].x + 32, enemies[i].y + 30) > 0) {
                enemies[i].direction = -enemies[i].direction;
                enemies[i].x += enemies[i].direction;
            }
            // if they would be walking on an empty tile, change direction
            if(game_lib.pixel_to_tile(enemies[i].x + 32, enemies[i].y + 50) < 1 ||
               game_lib.pixel_to_tile(enemies[i].x, enemies[i].y + 50) < 1) {
                enemies[i].direction = -enemies[i].direction;
            }

            if(enemies[i].type === T_BOSS_1_START) {
				enemies[i].current_anim = enemies[i].enemy_anim[WALK_RIGHT];
                //enemies[i].current_anim = boss_anim[BOSS_FULL];
            } else {
                if(enemies[i].direction === -1) {
                    enemies[i].current_anim = enemies[i].enemy_anim[WALK_RIGHT];
                } else {
                    enemies[i].current_anim = enemies[i].enemy_anim[WALK_LEFT];
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
				game_lib.fire_particles(enemy_bullets[i].x, enemy_bullets[i].y, 2, 'red');
            } else {
                if(game_lib.intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4, 
                             player.x + 10, robot_y_top, 12, 30)) {
                    enemy_bullets[i].alive = false;
                    game_lib.fire_particles(enemy_bullets[i].x, enemy_bullets[i].y,
                                   2, 'red');
                    game_lib.fire_particles(player.x + 16, player.y + 16, 4,'grey');
                    if(!god_mode) {
                        reset_level = true;
                        player.alive = false;
                    }
                }

                for(k = 0; k < game_lib.entities.length; ++k) {
                    if(isOnScreen(game_lib.entities[k]) && game_lib.entities[k].type === T_CRATE) {
                        if(game_lib.intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4,
									 game_lib.entities[k].x, game_lib.entities[k].y, 32, 32)) {
                            enemy_bullets[i].alive = false;
                            game_lib.fire_particles(enemy_bullets[i].x,
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
			} else if (game_lib.pixel_to_tile(bullets[i].x, bullets[i].y) > 0) {
				bullets[i].x -= bullet_speed * bullets[i].direction; // back the bullet up
                bullets[i].alive = false;
                game_lib.fire_particles(bullets[i].x, bullets[i].y, 2, 'red');
            } else {
                for(j = 0; j < enemies.length; ++j) {
                    if(enemies[j].alive) {
                        if(bullets[i] && game_lib.intersect(bullets[i].x, bullets[i].y, 4, 4,
												   enemies[j].x + 10, enemies[j].y, 12, 48)) {
                            enemies[j].hit_points -= 1;
                            game_lib.fire_particles(bullets[i].x, bullets[i].y, 2, 'red');
                            bullets[i].alive = false;

                            if(enemies[j].type === T_BOSS_1_START) {
                                current_boss = enemies[j];
                                if(enemies[j].hit_points < 3) {
                                    enemies[j].current_anim = enemies[j].boss_anim[BOSS_EMPTY];
                                } else if (enemies[j].hit_points < 8) {
                                    enemies[j].current_anim = enemies[j].boss_anim[BOSS_HALF];
                                }
                            }
                            if(enemies[j].hit_points <= 0) {
                                enemies[j].alive = false;
                                game_lib.fire_particles(enemies[j].x + 16, enemies[j].y+ 16, 4,'red');
                            }
                        }
                    }
                }
                for(k = 0; k < game_lib.entities.length; ++k) {
                    if(game_lib.entities[k].type === T_CRATE) {
						/*
                        if(entities[k].x < bullets[i].x) {
                            //entities[k].x++;
                        } else {
                            //entities[k].x--;
                        }*/
                        if(bullets[i] && game_lib.intersect(bullets[i].x, bullets[i].y, 4, 4,
												   game_lib.entities[k].x, game_lib.entities[k].y, 32, 32)) {
                            bullets[i].alive = false;
                            game_lib.fire_particles(bullets[i].x, bullets[i].y, 2, 'red');
                        }

                    }
                }
            }
        }
    }
}

function move_stuff() {
	"use strict";

    game_lib.move_stuff();

    player.move();
    move_bullets();
    move_entities();
    move_enemies();
    move_enemy_bullets();
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

function draw_people_count() {
	"use strict";

    game_lib.draw_text("RESCUED: " + saved_people + "/" + total_people, 100, 3);
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

    game_lib.draw_text(static_time, 300, 3);
}

function draw_hud() {
	"use strict";

    ctx.drawImage(hud_img, 0, 0, canvas.width, 16);
    ctx.fillStyle = "#000000";
    game_lib.drawRectangle(40,4, 50, 8, true);
    ctx.fillStyle = "#990000";
    game_lib.drawRectangle(40, 4, player.jetpack_fuel/4, 8, true);
    ctx.drawImage(images.fuel_overlay, 2, 2);
    //draw_text(current_level + " " + map_name,100, 3);

    draw_timer();
    draw_people_count();
    if(current_boss) {
        game_lib.drawRectangle(40, 24, current_boss.hit_points*2, 8, true);
        game_lib.draw_text("BRAIN BOSS", 40, 34);
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

function build_frame() {
    move_stuff();
	if(window_x > -3) { window_x = -3; }
	if(window_x < canvas.width - (game_lib.map[0].length * 32)) { 
		window_x = canvas.width - (game_lib.map[0].length * 32); 
	}
	if(window_y > 8) { window_y = 8; }
	if(window_y < canvas.height - (game_lib.map.length * 32 - 8)) {
		window_y = canvas.height - (game_lib.map.length * 32 - 8);
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
	
    game_lib.game_loop();

    draw_bullets();
    if(player.alive) {
        player.draw();
    }
    draw_enemies();
    draw_enemy_bullets();
    draw_hud();
    if(reset_level) {
        resetting_level();
    }
}

function game_loop() {
    "use strict";
    get_input();

	if(game_state === RUNNING) {
		build_frame();
	} else if(game_state === CREDITS) {
        showCreditsScreen();
    } else if (game_state === RESET_LEVEL) {
        resetLevel();
    } else if (game_state === HELP) {
        showHelpScreen();
    } else if (game_state === CHAPTERS) {
        showChaptersScreen();
    } else if (game_state === LEVELS) {
        showLevelsScreen();
    } else if(game_state === INITIALIZE) {
        showSplashScreen();
    } else if(game_state === INTERSTITIAL) {
        showInterstitial();
    } else if(game_state === LEVEL_END) {
        showLevelEnd();
    } else if(game_state === PAUSED) {
        showPauseScreen();
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

    console.log("initializing data");
    image_manager.load_images();

    enemies = [];
    game_lib.entities = [];
    enemy_bullets = [];
    bullets = [];
    make_bullets();
    game_lib.make_particles();
    entity_factory.make_entities();
    entity_factory.make_enemies();
    enemy_bullets = entity_factory.make_enemy_bullets();
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

function finishedLoading(bufferList) {
    // Create two sources and play them both together.
    var source1 = soundContext.createBufferSource();
    var source2 = soundContext.createBufferSource();
    console.log(bufferList[0]);
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(soundContext.destination);
    source2.connect(soundContext.destination);
    console.log("starting sounds");
    source1.start(0);
    source2.start(0);
}

function initialize_sound() {
    var bufferLoader = new BufferLoader(
        soundContext,
        [
            'sounds/bark.ogg',
            'sounds/drip.ogg'
        ],
        finishedLoading);
    bufferLoader.load();
}


function init() {
    "use strict";
    console.log("initializing");
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    image_manager = new ImageManager();

    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        soundContext = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
    console.log("Initializing sound");
    initialize_sound();
    entity_factory = new EntityFactory(game_lib);
    ctx.mozImageSmoothingEnabled = false;
    current_level = 0;
    load_map(0);
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

game_lib = new GameLib();
//var map = game_lib.map;

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
console.log("loaded html5.js");
