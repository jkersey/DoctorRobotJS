function ImageManager() {

    var images_loaded = 0;
    var directory = "/play/doctor-robot/images/";

    this.load_splash_screen_img = function() {
        splash_screen_img.src = directory + 'splash_screen.png';
    };

    this.load_images = function() {

        alert_jetpack_img.src = directory + 'jetpack.png';
        font_img.src = directory + 'small_font.gif';
        tile_img.src = directory + 'tiles.png';
        hud_img.src = directory + 'hud.png';
        dude_img.src = directory + 'dude_2.png';
        //map_img.src = directory + 'map.png';
        map_img.src = directory + 'Infiltrator.png';
        bullet_img.src = directory + 'bullet.png';
        enemy_img.src = directory + 'enemy_1b.png';
        enemy_2_img.src = directory + 'enemy_2.png';
        parallax_img.src = directory + 'parallax.png';
        images['switch_1'].src = directory + 'switch_1.png';
        images['switch_2'].src = directory + 'switch_2.png';
        images['teleport_1'].src = directory + 'teleport_1.png';
        images['teleport_2'].src = directory + 'teleport_2.png';
        images['crate_1'].src = directory + 'crate_1.png';
        images['door_1'].src = directory + 'door_1.png';
        images['door_2'].src = directory + 'door_2.png';
        images['door_3'].src = directory + 'door_3.png';
        images['door_4'].src = directory + 'door_4.png';
        images['fluid_1'].src = directory + 'fluid_1.png';
        images['jetpack_icon'].src = directory + 'jetpack_icon.png';
        images['fuel_overlay'].src = directory + 'fuel_overlay.png';
    };

}
