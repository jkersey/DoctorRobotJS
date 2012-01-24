function build_player() {

    map_iterate(function(x, y) {
        if(map[y][x] == PLAYER_START) {
            player = make_entity(x, y, map[y][x], EMPTY, PLAYER_START);
            // players are taller than normal stuff
            player.y -= 23;
        }
    });

    player.initialize = function() {
        map_iterate(function(x, y) {
            if(map[y][x] == PLAYER_START) {
                this.x = x * 32;
                this.y = y * 32 - 23;
                map[y][x] = 0;
            }
        });
        this.direction = 1;
        this.crouching = false;
        this.has_jetpack = true;
        this.jetpack_fuel = 200;
        this.moving_left = false;
        this.moving_right = false;
        this.up = false;
        this.down = false;
        this.can_teleport = true;
        this.alive = true;
    };

    player.move = function() {
        for(var i = 0; i < entities.length; ++i) {
            if(intersect(this.x, this.y, 32, 48, entities[i].x, entities[i].y, 32, 32)) {
                entities[i].check_player();
            }
        }
        this.y_inertia = this.y_inertia + gravity;
        this.y += this.y_inertia;
        if(pixel_to_tile(this.x + 8, this.y+15) > 0 || pixel_to_tile(this.x + 24, this.y+15) > 0) {
            this.y -= this.y_inertia;
            this.y_inertia = 0;
        } else if(pixel_to_tile(this.x + 8, this.y+48) > 0 || pixel_to_tile(this.x + 24, this.y + 48) > 0) {
            this.y -= this.y_inertia;
            this.y_inertia = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }
        if(this.moving_left) {
            if(!this.crouching) {
                this.x -= 3;
            }
            if(pixel_to_tile(this.x + 8, this.y+32) > 0 || pixel_to_tile(this.x + 24, this.y + 32) > 0
                || pixel_to_tile(this.x + 8, this.y+15) > 0 || pixel_to_tile(this.x + 24, this.y+15) > 0
                || pixel_to_tile(this.x + 8, this.y+48) > 0 || pixel_to_tile(this.x + 24, this.y+48) > 0) {
                this.x += 3;
                this.standing = true;
                current_anim = anim[STAND_LEFT];
            } else {
                current_anim = anim[WALK_LEFT];
            }

            this.direction = -1;
            this.standing = false;
        }
        
        if(this.moving_right) {
            if(!this.crouching) {
                //inertiaX += 1;
                this.x += 3;
            }
            if(pixel_to_tile(this.x + 24, this.y+32) > 0 || pixel_to_tile(this.x + 24, this.y + 32) > 0
                || pixel_to_tile(this.x + 24, this.y+15) > 0 || pixel_to_tile(this.x + 24, this.y + 15) > 0
                || pixel_to_tile(this.x + 24, this.y+48) > 0 || pixel_to_tile(this.x + 24, this.y+48) > 0) {
                this.x -= 3;
                this.standing = true;
                current_anim = anim[STAND_RIGHT];
            } else {
                current_anim = anim[WALK_RIGHT];
            }
            this.direction = 1;
            this.standing = false;
        }
        if(this.up) {
            if(this.grounded) {
                this.standing = false;
                this.y_inertia = -9;
                this.grounded = false;
            }
            if(this.has_jetpack) {
                this.y_inertia = -4;
                this.jetpack_fuel -= 1;
                if(this.direction > 0) {
                    current_anim = anim[JET_LEFT];
                } else {
                    current_anim = anim[JET_RIGHT];
                }
            }
        }
        if(this.down) {
            if(this.grounded) {
                this.crouching = true;
            }
        } else {
            this.crouching = false;
        }
        if(this.standing) {
            if(this.direction > 0) {
                current_anim = anim[STAND_RIGHT];
            } else {
                current_anim = anim[STAND_LEFT];
            }

        }
        if(this.crouching && this.grounded) {
            if(this.direction > 0) {
                current_anim = anim[CROUCH_RIGHT];
            } else {
                current_anim = anim[CROUCH_LEFT];
            }
        } else if (this.crouching) {
            if(this.direction > 0) {
                current_anim = anim[STAND_RIGHT];
            } else {
                current_anim = anim[STAND_LEFT];
            }
        }
        if(this.jetpack_fuel < 0) {
            this.has_jetpack = false;
        }
    };

    player.draw = function() {
        if(player.alive) {
        waitIndex++;
        if(waitIndex > frameRate) {
            waitIndex = 0;
            if(this.grounded) {
                this.frame++;
            }
        }
        if(this.frame >= current_anim.length) {
            this.frame = 0;
        }
        ctx.drawImage(dude_img, current_anim[this.frame] * 32, 0, 32, 48,
            this.x + window_x,this.y + window_y, 32, 48);
        }
    };

    return player;

}
