function build_switch(x_t, y_t, tp, img, tile, key) {

    entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.move = function() {
        if(intersect(player.x, player.y + 16, 32, 32, this.x, this.y, 32, 32)) {
            if(!this.is_being_pushed && this.state == ACTIVATED) {
                this.state = DEACTIVATED;
                this.current_anim = entity_anim[DEACTIVATED];
                this.wait_index = 0;
                this.frame = 0;
                this.is_being_pushed = true;
            } else if (!this.is_being_pushed && this.state == DEACTIVATED) {
                this.state = ACTIVATED;
                this.wait_index = 0;
                this.current_anim = entity_anim[ACTIVATED];
                this.frame = 0;
                this.is_being_pushed = true;
            }
        } else {
            this.is_being_pushed = false;
        }
    };
    return entity;
}