function build_door(x_t, y_t, tp, img, tile, key) {
    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.move = function() {
        var trigger = get_trigger(this.key);
        if(trigger.state == DEACTIVATED && !this.state == DEACTIVATED) {
            console.log("opening door");
            this.state = DEACTIVATED;
            this.current_anim = door_anim[DEACTIVATED];
            this.frame = 0;
            map[this.y_tile][this.x_tile] = EMPTY;
        } else if(trigger.state == ACTIVATED && !this.state == ACTIVATED) {
            console.log("opening door");
            this.state = ACTIVATED;
            map[this.y_tile][this.x_tile] = EMPTY_BLOCKING;
            this.current_anim = door_anim[ACTIVATED];
            this.frame = 0;
            for(var j = 0; j < enemies.length; ++j) {
                if(enemies[j].alive) {
                    if(this && intersect(this.x, this.y, 32, 32,
                        enemies[j].x + 10, enemies[j].y, 12, 48)) {
                        trigger.state = DEACTIVATED;
                        enemies[j].alive = false;
                        fire_particles(enemies[j]['x'] + 16, enemies[j]['y']+ 16, 4,'red');
                    }
                }
            }
        }
    };
    
    return entity;

}
