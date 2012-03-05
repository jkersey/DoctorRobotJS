function build_jetpack(x_t, y_t, tp, img, tile, key) {
    entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.check_player = function() {
        if(intersect(player.x, player.y+32,32, 32, this.x, this.y, 32, 32 )) {
            this.alive = 0;
            player.has_jetpack = true;
            player.jetpack_fuel = 200;
        }
    };
    return entity;

}
