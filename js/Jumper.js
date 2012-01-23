function build_jumper(x_t, y_t, tp, img, tile, key) {
    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.check_player = function() {
        if (contains(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            if(player.grounded) {
                // play animation
                player.standing = false;
                player.y_inertia = -15;
                player.grounded = false;
            }
        }
    };
    return entity;
}
