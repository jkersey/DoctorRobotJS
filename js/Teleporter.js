function build_teleporter(x_t, y_t, tp, img, tile, key, parent_type) {
    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.parent_type = parent_type;
    entity.state = OPEN;
    entity.current_anim = teleporter_anim[OPEN];
    entity.loop_animation = true;

    entity.get_trigger = function() {
        if(!this.trigger) {
            if(this.parent_type == DOOR) {
                this.trigger = get_trigger(key);
            } else {
                this.trigger = get_target(key);
            }
        }
        return this.trigger;
    };

    entity.move = function() {
        var trigger = this.get_trigger();
        if(this.state == OPEN && trigger.state == OPEN) {
            if(contains(player.x, player.y + 18, 32, 32, this.x, this.y, 32, 32)) {
                player.x = trigger.x;
                player.y = trigger.y - 18;
                trigger.state = CLOSED;
                this.state = CLOSED;
                this.current_anim = teleporter_anim[CLOSED];
                trigger.current_anim = teleporter_anim[CLOSED];
                return;
            }
            for(var i = 0; i < entities.length; ++i) {
                if(entities[i].is_teleportable) {
                    if(contains(entities[i].x, entities[i].y, 32, 32, this.x, this.y, 32, 32)) {
                        entities[i].x = trigger.x;
                        entities[i].y = trigger.y;
                        this.state = CLOSED;
                        trigger.state = CLOSED;
                        this.current_anim = teleporter_anim[CLOSED];
                        trigger.current_anim = teleporter_anim[CLOSED];
                        return;
                    }
                }
            }
        }
        if(this.state == CLOSED) {
            var stay_closed = false;
            if(intersect(player.x, player.y, 32, 32, this.x, this.y, 32, 32)) {
                stay_closed = true;
            }
            if(!stay_closed) {
                for(var i = 0; i < entities.length; ++i) {
                    if(entities[i].is_teleportable && intersect(entities[i].x, entities[i].y, 32, 32, this.x, this.y, 32, 32)) {
                        stay_closed = true;
                        break;
                    }
                }
            }
            if(!stay_closed) {
                this.state = OPEN;
                this.current_anim = teleporter_anim[OPEN];
            }
        }
    };

    entity.check_player = function() {
/*
        trigger = this.get_trigger();
        if (trigger.state == OPEN && contains(player.x, player.y+18,32, 32, this.x, this.y, 32, 32 )) {
            console.log('teleport as ' + this.parent_type);
            player.x = trigger.x;
            player.y = trigger.y - 16;
            this.state = CLOSED;
        }
         */
    };
/*
     entity.check_crate = function() {
        for(j = 0; j < entities.length; ++j) {
            if(entities[j].type == CRATE) {
                if (trigger.state == OPEN && contains(entities[j].x, entities[j].y,30, 30, this.x, this.y, 32, 32 )) {
                    console.log('teleport as switch');
                    entities[j].x = trigger.x;
                    entities[j].y = trigger.y;
                    trigger.state = CLOSED;
                    this.state = CLOSED;
                } else {
                    if(intersect(entities[j].x, entities[j].y,32, 32, this.x, this.y, 32, 32 )) {
                        this.state = CLOSED;
                    }
                }
            }
        }
    };
    */
    return entity;
}