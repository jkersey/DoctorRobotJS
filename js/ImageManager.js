function ImageManager() {

    var images_loaded = 0;

    this.load_images = function() {

        alert_jetpack_img.src = 'images/jetpack.png';
        font_img.src = 'images/small_font.gif';
        tile_img.src = 'images/tiles.png';
        hud_img.src = 'images/hud.png';
        dude_img.src = 'images/dude_2.png';
        //map_img.src = 'images/map.png';
        map_img.src = 'images/Infiltrator.png';
        bullet_img.src = 'images/bullet.png';
        enemy_img.src = 'images/enemy_1b.png';
        enemy_2_img.src = 'images/enemy_2.png';
        parallax_img.src = 'images/parallax.png';
        images['switch_1'].src = 'images/switch_1.png';
        images['switch_2'].src = 'images/switch_2.png';
        images['teleport_1'].src = 'images/teleport_1.png';
        images['teleport_2'].src = 'images/teleport_2.png';
        images['crate_1'].src = 'images/crate_1.png';
        images['door_1'].src = 'images/door_1.png';
        images['door_2'].src = 'images/door_2.png';
        images['door_3'].src = 'images/door_3.png';
        images['door_4'].src = 'images/door_4.png';
        images['fluid_1'].src = 'images/fluid_1.png';
        images['jetpack_icon'].src = 'images/jetpack_icon.png';
        images['fuel_overlay'].src = 'images/fuel_overlay.png';
    };

}
