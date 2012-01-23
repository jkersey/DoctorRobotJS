/**
 * Created by JetBrains PhpStorm.
 * User: James
 * Date: 1/21/12
 * Time: 2:29 PM
 * To change this template use File | Settings | File Templates.
 */

    var SWITCH = 256;
    var DOOR = 257;
    var TELEPORTER = 258;

    var map;
    var map_loaded = false;
    var current_level = '0';

    var TILE_WIDTH = 32;

    // control tiles
    var EMPTY = 0;
    var PLAYER_START = 1;
    var ENEMY_1_START = 3;
    var ENEMY_2_START = 4;
    var EMPTY_BLOCKING = 255;

    var JETPACK = 9;
    var JUMPER = 10;
    var CRATE = 11;

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
    var OPEN = 1;
    var CLOSED = 0;

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
    var player;
    var robot_frame = 0;
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
    images['crate_1'] = new Image();
    images['switch_1'] = new Image();
    images['door_1'] = new Image();
    images['door_2'] = new Image();
    images['door_3'] = new Image();
    images['door_4'] = new Image();
    images['jetpack_icon'] = new Image();
    images['teleport_1'] = new Image();
