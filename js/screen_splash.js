function SplashScreen() {

    this.load_image = function() {
        image_manager.load_splash_screen_img();
        console.log("loaded the splash screen image");
    };

    this.update = function() {
        if(key_pressed) {
            game_state = RUNNING;
        }
     };

    this.draw = function() {
        ctx.drawImage(splash_screen_img, 0, 0);
        draw_text("Z:          FIRE",80, 220);
        draw_text("X:          JUMP/JETPACK",80, 234);
        draw_text("DOWN ARROW: CROUCH", 80, 248);
        //draw_text("PRESS A KEY TO CONTINUE", 80, 260);
    };

}