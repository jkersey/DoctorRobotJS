function Entity(x_t, y_t, tp, img, tile, key) {

    this.x_tile = x_t;
    this.y_tile = y_t;
    this.y_inertia = 0;
    this.type = tp;
    this.key = key;
    this.x = this.x_tile * TILE_WIDTH;
    this.y = this.y_tile * TILE_WIDTH;
    this.image = img;
    this.current_anim = door_anim[ACTIVATED];
    this.frame = current_anim.length - 1;
    this.state = ACTIVATED;
    this.is_teleportable = false;
    this.is_being_pushed = false;
    this.wait_index = 0;
    this.alive = true;
    this.loop_animation = false;
    map[this.y_tile][this.x_tile] = tile;

    this.draw = function() {
        this.wait_index++;
        if(this.alive) {
            if(this.wait_index > frameRate) {
                this.wait_index = 0;
                this.frame++;
            }
            if(this.frame >= this.current_anim.length) {
                if(this.loop_animation) {
                    this.frame = 0;
                } else {
                    this.frame = this.current_anim.length - 1;
                }
            }
            if(this && this.image) {
                if(this.type == 13) {
                    ctx.drawImage(this.image,
                        this.current_anim[this.frame] * 32, 32, 32, 32,
                        this.x + window_x,this.y + window_y, 32, 32);
                } else {
                    ctx.drawImage(this.image,
                        this.current_anim[this.frame] * 32, 0, 32, 32,
                        this.x + window_x,this.y + window_y, 32, 32);
                }
            }
        }

    };

    this.move = function() {
        // override this
    };
    this.check_player = function() {
        // override this
    };


}

function make_entities() {
    // have to make switches before doors
    // switches and trampolines
    map_iterate(function(x, y) {
        if(map[y][x] > 15 && map[y][x] < 32) {
            entities.push(make_entity(x, y, map[y][x], SWITCH));
        }
    });
    map_iterate(function(x, y) {
        if(map[y][x] > 31 && map[y][x] < 48) {
            entities.push(make_entity(x, y, map[y][x], DOOR));
        }
    });
    map_iterate(function(x, y) {
        if(map[y][x] > 8 && map[y][x] < 16) {
            entities.push(make_entity(x, y, map[y][x], map[y][x]));
        }

    })
}

function make_entity(x, y, type, parent_type) {

    if(map[y][x-1] == 48) {
        // left switch
        return build_switch(x, y, SWITCH, images['switch_1'], EMPTY, type);
    } else if (map[y][x+1] == 48) {
        // right switch
        return build_switch(x, y, SWITCH, images['switch_2'], EMPTY, type);
    } else if(map[y+1][x] == 49) {
        // teleport pad
        return build_teleporter(x, y, TELEPORTER, images['teleport_1'], EMPTY, type, parent_type);
    } else if(map[y-1][x] == 49) {
        return build_teleporter(x, y, TELEPORTER, images['teleport_2'], EMPTY, type, parent_type);
    } else if(map[y-1][x] == 64) {
        console.log('made a top door');
        return build_door(x, y, DOOR, images['door_1'], EMPTY_BLOCKING, type);
    } else if(map[y+1][x] == 64) {
        console.log('made a top door');
        return build_door(x, y, DOOR, images['door_2'], EMPTY_BLOCKING, type);
    } else if(map[y][x-1] == 64) {
        console.log('made a top door');
        return build_door(x, y, DOOR, images['door_3'], EMPTY_BLOCKING, type);
    } else if(map[y][x+1] == 64) {
        console.log('made a top door');
        return build_door(x, y, DOOR, images['door_4'], EMPTY_BLOCKING, type);
    } else if(type == JETPACK) {
        console.log('made a jetpack');
        return build_jetpack(x, y, type, images['jetpack_icon'], EMPTY);
    } else if(type == CRATE) {
        console.log('made a crate');
        return build_crate(x, y, type, images['crate_1'], EMPTY);
    } else if (type == '15') {
        console.log('made an exit');
        return build_exit(x, y, type, null, EMPTY);
    } else if (type == FLUID || type == 13) {
        console.log('made some fluid');
        return build_fluid(x, y, type, images['fluid_1'], EMPTY);
    } else if (type == JUMPER) {
        return build_jumper(x, y, type, null, EMPTY);
    } else {
        console.log('made something else');
        return new Entity(x, y, type, images['door_2'], EMPTY);
    }
}

function move_entities() {
    // make sure the entities are even on the screen
    for(var i = 0; i < entities.length; ++i) {
        entities[i].move();
    }
}

function draw_entities() {
    for(var i = 0; i < entities.length; ++i) {
        entities[i].draw();
    }
}
