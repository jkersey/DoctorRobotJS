function build_exit(x_t, y_t, tp, img, tile, key) {
    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.check_player = function() {
        if (contains(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            current_level++;
            load_map(current_level);
        }
    };
    return entity;

}
