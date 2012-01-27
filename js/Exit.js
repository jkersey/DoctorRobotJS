function build_exit(x_t, y_t, tp, img, tile, key) {
    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.move = function() {
        if (contains(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            current_level++;
            load_map(current_level);
        }
    };
    return entity;

}
