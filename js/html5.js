/* TODO
move config to an external file
move animation frame numbers to an external file
code non-blocking graphic tiles
code tile switches
 */


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    image_manager = new ImageManager();
    ctx.mozImageSmoothingEnabled = false;
    current_level = 0;
    load_map("0");
}

function initialize_data() {

    image_manager.load_images();

    //load_images();
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

function game_loop() {
    get_input();
    move_stuff();


    if(game_state == INITIALIZE) {
        showSplashScreen();
    } else if(game_state == RUNNING) {

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
        draw_parallax();
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
    }

}

function showSplashScreen() {

    if(splashScreen == null) {
        splashScreen = new SplashScreen();
        splashScreen.load_image();
        console.log("made a splash screen");
    }
    splashScreen.update();
    splashScreen.draw();
}

function draw_parallax() {
    ctx.drawImage(parallax_img, 0, 0, 512, 512, window_x >> 4, window_y >> 4, 512, 512);
}


function move_stuff() {
    player.move();
    move_bullets();
    move_particles();
    move_entities();
    move_enemies();
    move_enemy_bullets();
}

function collides_with(type_1, type_2) {

    if(type_1 == CRATE || type_2 == CRATE) {
        return true;
    }
}

window.onload = init;
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);
function keyDown(evt){ keys[evt.keyCode] = true; }
function keyUp(evt){ keys[evt.keyCode] = false; }
