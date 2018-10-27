function EntityFactory(game_lib) {
    this.game_lib = game_lib;
}

EntityFactory.prototype.make_entity = function(x, y, type, parent_type) {

    var entity;
    var game_lib = this.game_lib;
    // Switches
    if(game_lib.map[y][x-1] === E_SWITCH) {
        entity = this.build_switch(x, y, SWITCH, images.switch_1, T_EMPTY, type);
    } else if (game_lib.map[y][x+1] === E_SWITCH) {
        entity = this.build_switch(x, y, SWITCH,  images.switch_2, T_EMPTY, type);
        // Teleporter
    } else if(game_lib.map[y+1][x] === E_TELEPORTER) {
        entity = build_teleporter(x, y, TELEPORTER, images.teleport_1, T_EMPTY, type, parent_type);
    } else if(game_lib.map[y-1][x] === E_TELEPORTER) {
        entity = build_teleporter(x, y, TELEPORTER, images.teleport_2, T_EMPTY, type, parent_type);
        // Doors
    } else if(game_lib.map[y-1][x] === E_DOOR) {
        entity = build_door(x, y, DOOR, images.door_1, EMPTY_BLOCKING, type);
    } else if(game_lib.map[y+1][x] === E_DOOR) {
        entity = build_door(x, y, DOOR, images.door_2, EMPTY_BLOCKING, type);
    } else if(game_lib.map[y][x-1] === E_DOOR) {
        entity = build_door(x, y, DOOR, images.door_3, EMPTY_BLOCKING, type);
    } else if(game_lib.map[y][x+1] === E_DOOR) {
        entity = build_door(x, y, DOOR, images.door_4, EMPTY_BLOCKING, type);
        // Jetpack
    } else if(type === T_JETPACK) {
        entity = build_jetpack(x, y, type, images.jetpack_icon, T_EMPTY);
        // Crate
    } else if(type === T_CRATE) {
        entity = build_crate(x, y, type, images.crate_1, T_EMPTY);
    } else if(type === T_PERSON) {
        entity = build_person(x, y, type, people_img, T_EMPTY);
        // Exit
    } else if (type === T_EXIT) {
        entity = build_exit(x, y, type, null, T_EMPTY);
        // Fluid
    } else if (type === T_FLUID || type === 13) {
        entity = build_fluid(x, y, type, images.fluid_1, T_EMPTY);
        // Jumper
    } else if (type === T_JUMPER) {
        entity = build_jumper(x, y, type, images.jumper, T_EMPTY);
        // Platform
    } else if (type === T_PLATFORM) {
        entity = build_platform(x, y, type, images.platform_1, T_EMPTY);
        // Unknown
    } else {
        entity = new game_lib.Entity(x, y, type, images.door_2, T_EMPTY);
    }

    return entity;
};

EntityFactory.prototype.build_switch = function(x_t, y_t, tp, img, tile, key) {

    var game_lib = this.game_lib;

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    entity.current_anim = entity_anim[ACTIVATED];
    entity.current_frame = entity_anim[ACTIVATED].length - 1;

    entity.move = function() {
        if(game_lib.contains(player.x, player.y + 18, 32, 30, this.x, this.y, 32, 32)) {
            if(!this.is_being_pushed && this.state === ACTIVATED) {
                this.state = DEACTIVATED;
                this.current_anim = entity_anim[DEACTIVATED];
                this.wait_index = 0;
                this.frame = 0;
                this.is_being_pushed = true;
            } if (!this.is_being_pushed && this.state === DEACTIVATED) {
                this.state = ACTIVATED;
                this.wait_index = 0;
                this.current_anim = entity_anim[ACTIVATED];
                this.frame = 0;
                this.is_being_pushed = true;
            }
        }
        if(!game_lib.intersect(player.x + 14, player.y + 18, 4, 30, this.x, this.y, 32, 32) && this.is_being_pushed) {
            this.is_being_pushed = false;
        }

    };
    return entity;
};


function build_fluid(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    if(tp === 13) {
        entity.y_index = 32;
    }
    entity.current_anim = fluid_anim;
    entity.loop_animation = true;

    entity.check_player = function() {
        player.alive = false;
        reset_level = true;

    };

    entity.move = function() {
    };
    return entity;
}

function build_teleporter(x_t, y_t, tp, img, tile, key, parent_type) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    entity.parent_type = parent_type;
    entity.state = OPEN;
    entity.teleporter_anim = [];
    entity.teleporter_anim[OPEN] = [0, 1, 2, 3, 4];
    entity.teleporter_anim[CLOSED] = [5, 5, 5];

    entity.current_anim = entity.teleporter_anim[OPEN];
    entity.loop_animation = true;

    entity.get_trigger = function() {
        if(!this.trigger) {
            if(this.parent_type === DOOR) {
                this.trigger = get_trigger(key);
            } else {
                this.trigger = get_target(key);
            }
        }
        return this.trigger;
    };

    entity.move = function() {
        var
            i,
            y_modified,
            stay_closed,
            trigger = this.get_trigger();

        if(this.state === OPEN && trigger.state === OPEN) {
            if(game_lib.contains(player.x, player.y + 18, 32, 32, this.x, this.y, 32, 32)) {
                if(game_lib.map[trigger.y_tile - 1][trigger.x_tile] > 1) {
                    y_modified = trigger.y;
                } else {
                    y_modified = trigger.y - 20;
                }
                player.teleport(trigger.x, y_modified);
                trigger.state = CLOSED;
                this.state = CLOSED;
                this.current_anim = entity.teleporter_anim[CLOSED];
                trigger.current_anim = entity.teleporter_anim[CLOSED];
                return;
            }
            for(i = 0; i < game_lib.entities.length; ++i) {
                if(game_lib.entities[i].is_teleportable) {
                    if(game_lib.contains(game_lib.entities[i].x, game_lib.entities[i].y, 32, 32, this.x, this.y, 32, 32)) {
                        game_lib.entities[i].x = trigger.x;
                        game_lib.entities[i].y = trigger.y;
                        this.state = CLOSED;
                        trigger.state = CLOSED;
                        this.current_anim = entity.teleporter_anim[CLOSED];
                        trigger.current_anim = entity.teleporter_anim[CLOSED];
                        return;
                    }
                }
            }
        }
        if(this.state === CLOSED) {
            stay_closed = game_lib.intersect(player.x, player.y, 32, 32, this.x, this.y, 32, 32);
            if(!stay_closed) {
                for(i = 0; i < game_lib.entities.length; ++i) {
                    if(game_lib.entities[i].is_teleportable && game_lib.intersect(game_lib.entities[i].x, game_lib.entities[i].y, 32, 32, this.x, this.y, 32, 32)) {
                        stay_closed = true;
                        break;
                    }
                }
            }
            if(!stay_closed) {
                this.state = OPEN;
                this.current_anim = entity.teleporter_anim[OPEN];
            }
        }
    };

    entity.check_player = function() {
    };
    return entity;
}

function build_door(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);

    entity.door_anim = [];
    entity.door_anim[ACTIVATED] = [5, 4, 3, 2, 1, 0];
    entity.door_anim[DEACTIVATED] = [0, 1, 2, 3, 4, 5];
    entity.current_anim = entity.door_anim[ACTIVATED];
    entity.current_frame = entity.door_anim[ACTIVATED].length - 1;

    entity.move = function() {
        var
            j,
            trigger = get_trigger(this.key);

        if(trigger.state === DEACTIVATED && this.state !== DEACTIVATED) {
            this.state = DEACTIVATED;
            this.current_anim = this.door_anim[DEACTIVATED];
            this.frame = 0;
            game_lib.map[this.y_tile][this.x_tile] = T_EMPTY;
        } else if(trigger.state === ACTIVATED && this.state !== ACTIVATED) {
            this.state = ACTIVATED;
            game_lib.map[this.y_tile][this.x_tile] = EMPTY_BLOCKING;
            this.current_anim = this.door_anim[ACTIVATED];
            this.frame = 0;
            for(j = 0; j < enemies.length; ++j) {
                if(enemies[j].alive) {
                    if(this && game_lib.intersect(this.x, this.y, 32, 32,
                            enemies[j].x + 10, enemies[j].y, 12, 48)) {
                        trigger.state = DEACTIVATED;
                        enemies[j].alive = false;
                        game_lib.fire_particles(enemies[j].x + 16, enemies[j].y+ 16, 4,'red');
                    }
                }
            }
        }
    };

    return entity;

}

function build_jetpack(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    console.log("jetpack fuel is " + tp);
    entity.frame = 1;

    entity.check_player = function() {
        if(this.alive === 1 && game_lib.intersect(player.x, player.y+32,32, 32, this.x, this.y, 32, 32 )) {
            this.alive = 0;
            player.has_jetpack = true;
            player.jetpack_fuel = 200;
        }
    };
    return entity;
}

function build_platform(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);

    entity.check_player = function() {
        if(player.y < this.y - 10) {
            console.log("adjusting");
            //player.y = this.y - 48;
        }
        if(this.y + 16 > player.y) {
            player.y -= 5;
        } else {
            player.y += 5;
        }
        if(this.x + 16 > player.x) {
            player.x -= 2 + this.direction;
        } else {
            player.x += 2 + this.direction;
        }
    };

    entity.move = function() {
        this.x += this.direction;
        if(game_lib.pixel_to_tile(this.x, this.y) > 0 ||
            game_lib.pixel_to_tile(this.x + 32, this.y) > 0) {
            this.direction = -this.direction;
        }

    };

    return entity;
}

function build_crate(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    entity.is_teleportable = true;

    entity.check_player = function() {
        if(!player.grounded && player.y + 32 < this.y) {
            if(player.y > this.y - 48) {
                player.y = this.y - 48;
            }
            player.on_a_crate = true;
        }
        if(player.grounded && !player.on_a_crate){
            if (this.x - 15 > player.x) {
                if(player.grounded) {
                    //this.x += 2;
                    if(game_lib.pixel_to_tile(this.x + 32, this.y) > 0) {
                        //this.x -= 2;
                        player.x-=4;
                    }
                }
                player.x-=4;
            } else if (this.x + 15 < player.x) {
                if(player.grounded) {
                    //this.x -= 2;
                    if(game_lib.pixel_to_tile(this.x, this.y) > 0) {
                        //this.x += 2;
                        player.x+=4;
                    }
                }
                player.x+=4;
            }
        }
    };

    entity.move = function() {

        var
            i, k;

        for(i = 0; i < game_lib.entities.length; ++i) {
            if(game_lib.intersect(this.x, this.y, 32, 32, game_lib.entities[i].x, game_lib.entities[i].y, 32, 23)) {
                if(game_lib.entities[i].type === T_CRATE) {
                    if(this.y > game_lib.entities[i].y) {
                        game_lib.entities.y--;
                    }
                    if(this.x > game_lib.entities[i].x) {
                        //this.x++;
                        game_lib.entities.x--;
                    } else if(this.x < game_lib.entities[i].x) {
                        //this.x--;
                        game_lib.entities.x++;
                    }

                }
            }
        }

        for(k = 0; k < enemies.length; ++k) {
            if(game_lib.intersect(this.x, this.y, 32, 32, enemies[k].x, enemies[k].y + 8, 32, 48)) {
                if(this.y_inertia > 1 && enemies[k].y_inertia === 1 && this.y < enemies[k].y) {
                    enemies[k].alive = false;
                    game_lib.fire_particles(enemies[k].x, enemies[k].y, 4, 'red');
                }
            }
        }
        if(this.y_inertia < 10) {
            this.y_inertia = this.y_inertia * 2;
        } else {
            this.y_inertia = 10;
        }
        this.y += this.y_inertia;
        if(game_lib.pixel_to_tile(this.x, this.y + 32) > 0 ||
            game_lib.pixel_to_tile(this.x + 32, this.y + 32) > 0) {
            this.y -= this.y_inertia;
            this.y_inertia = 1;
        }
    };
    return entity;
}

function build_person(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    entity.is_teleportable = true;
    entity.frame = 0;
    entity.current_anim = person_anim[0];

    total_people++;

    entity.check_player = function() {
        if(this.state !== 9) {
            saved_people++;
            this.frame = 0;
            this.current_anim = person_anim[3];
        }
        this.state = 9;
    };

    entity.move = function() {
        if(this.frame === 7) {
            this.alive = false;
        }
        /*
         for(var i = 0; i < entities.length; ++i) {
         if(game_lib.intersect(this.x, this.y, 32, 32, entities[i].x, entities[i].y, 32, 23)) {
         if(entities[i].type == T_CRATE) {
         if(this.y > entities[i].y) {
         entities.y--;
         }
         if(this.x > entities[i].x) {
         //this.x++;
         entities.x--;
         } else if(this.x < entities[i].x) {
         //this.x--;
         entities.x++;
         }

         }
         }
         }
         */
    };

    return entity;
}


function build_jumper(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    entity.current_anim = jumper_anim[ACTIVATED];
    entity.frame = 0;

    entity.loop_animation = false;

    entity.check_player = function() {
        if (game_lib.contains(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            if(player.grounded) {
                // play animation
                this.current_anim = jumper_anim[ACTIVATED];
                this.frame = 0;
                player.standing = false;
                player.y_inertia = -15;
                player.grounded = false;
            }
        }
    };
    return entity;
}

function build_exit(x_t, y_t, tp, img, tile, key) {
    "use strict";

    var entity = new game_lib.Entity(x_t, y_t, tp, img, tile, key);
    entity.move = function() {
        if (game_lib.intersect(player.x, player.y+16,32, 32, this.x, this.y, 32, 32 )) {
            player.x = 33;
            player.y = 33;
            current_level++;
            game_state = LEVEL_END;
        }
    };
    return entity;

}


function build_player() {
    "use strict";

    //current_anim = anim[WALK_RIGHT];
    player = Object;

    game_lib.map_iterate(function(x, y) {
        if(game_lib.map[y][x] === T_PLAYER_START) {
            player = entity_factory.make_entity(x, y, game_lib.map[y][x], T_EMPTY, T_PLAYER_START);
            // players are taller than normal stuff
            player.y -= 23;
        }
    });

    player.initialize = function() {
        game_lib.map_iterate(function(x, y) {
            if(game_lib.map[y][x] === T_PLAYER_START) {
                this.x = x * 32;
                this.y = y * 32 - 23;
                game_lib.map[y][x] = 0;
            }
        });
        this.anim = [];
        this.anim[WALK_RIGHT] = [0, 1, 2, 3, 4, 5];
        this.anim[WALK_LEFT] = [8, 7, 6, 11, 10, 9];
        this.anim[JET_RIGHT] = [15, 16, 17];
        this.anim[JET_LEFT] = [12, 13, 14];
        this.anim[STAND_LEFT] = [18];
        this.anim[STAND_RIGHT] = [19];
        this.anim[CROUCH_LEFT] = [20];
        this.anim[CROUCH_RIGHT] = [21];

        this.direction = 1;
        this.crouching = false;
        this.has_jetpack = true;
        this.jetpack_fuel = 200;
        this.moving_left = false;
        this.moving_right = false;
        this.up = false;
        this.down = false;
//        this.can_teleport = true;
        this.alive = true;
        this.pause_timer = 0;
        this.NORMAL = 0;
//        this.TELEPORT_START = 1;
//        this.TELEPORT_END = 2;
        this.target_x = 0;
        this.target_y = 0;
        this.state = this.NORMAL;
        this.on_a_crate = false;
    };

    player.move = function() {
        var i, adjusted_y, adjusted_height;

        this.pause_timer--;
        if(this.pause_timer > 0) {
            return;
        } else {
            this.pause_timer = 0;
        }

        if(this.alive) {
            this.on_a_crate = false;
            for(i = 0; i < game_lib.entities.length; ++i) {
                adjusted_y = this.y;
                adjusted_height = 48;
                if(this.crouching) {
                    adjusted_y = this.y + 18;
                    adjusted_height = 30;
                }
                if(game_lib.entities[i] && game_lib.intersect(this.x, adjusted_y, 32, adjusted_height,
                        game_lib.entities[i].x, game_lib.entities[i].y, 32, 32)) {
                    game_lib.entities[i].check_player();
                }
                if(game_lib.entities[i].type === T_PLATFORM &&
                    game_lib.on_top_of(this.x + 8, this.y, 16, 48,
                        game_lib.entities[i].x, game_lib.entities[i].y, 32)) {
                    console.log("on a platform");
                    this.x += game_lib.entities[i].direction;
                    this.on_a_crate = true;
                }
            }
            this.y_inertia = this.y_inertia + gravity;
            this.y += this.y_inertia;
            if(game_lib.pixel_to_tile(this.x + 8, this.y+15) > 0 || game_lib.pixel_to_tile(this.x + 24, this.y+15) > 0) {
                this.y -= this.y_inertia;
                this.y_inertia = 0;
            } else if(this.on_a_crate || game_lib.pixel_to_tile(this.x + 8, this.y+48) > 0 || game_lib.pixel_to_tile(this.x + 24, this.y + 48) > 0) {
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
                if(game_lib.pixel_to_tile(this.x + 8, this.y+32) > 0
                    || game_lib.pixel_to_tile(this.x + 24, this.y + 32) > 0
                    || game_lib.pixel_to_tile(this.x + 8, this.y+15) > 0
                    || game_lib.pixel_to_tile(this.x + 24, this.y+15) > 0
                    || game_lib.pixel_to_tile(this.x + 8, this.y+48) > 0
                    || game_lib.pixel_to_tile(this.x + 24, this.y+48) > 0) {
                    this.x += 3;
                    this.standing = true;
                    this.current_anim = this.anim[STAND_LEFT];
                } else {
                    this.current_anim = this.anim[WALK_LEFT];
                }

                this.direction = -1;
                this.standing = false;
            }

            if(this.moving_right) {
                if(!this.crouching) {
                    //inertiaX += 1;
                    this.x += 3;
                }
                if(game_lib.pixel_to_tile(this.x + 8, this.y+32) > 0
                    || game_lib.pixel_to_tile(this.x + 24, this.y + 32) > 0
                    || game_lib.pixel_to_tile(this.x + 8, this.y+15) > 0
                    || game_lib.pixel_to_tile(this.x + 24, this.y+15) > 0
                    || game_lib.pixel_to_tile(this.x + 8, this.y+48) > 0
                    || game_lib.pixel_to_tile(this.x + 24, this.y+48) > 0) {
                    this.x -= 3;
                    this.standing = true;
                    this.current_anim = this.anim[STAND_RIGHT];
                } else {
                    this.current_anim = this.anim[WALK_RIGHT];
                }
                this.direction = 1;
                this.standing = false;
            }
            if(this.up) {
                if(this.grounded || this.on_a_crate) {
                    this.standing = false;
                    this.y -= 1;
                    this.y_inertia = -9;
                    this.grounded = false;
                    this.on_a_crate = false;
                    console.log("trying to go up");
                } else {
                }
                if(this.has_jetpack) {
                    this.grounded = false;
                    this.y_inertia = -4;
                    this.jetpack_fuel -= 1;
                    if(this.direction > 0) {
                        this.current_anim = this.anim[JET_LEFT];
                    } else {
                        this.current_anim = this.anim[JET_RIGHT];
                    }
                }
            }
            if(this.down) {
                if(this.grounded || this.on_a_crate) {
                    this.crouching = true;
                }
            } else {
                this.crouching = false;
            }
            if(this.standing) {
                if(this.direction > 0) {
                    this.current_anim = this.anim[STAND_RIGHT];
                } else {
                    this.current_anim = this.anim[STAND_LEFT];
                }

            }
            if(this.crouching && (this.grounded || this.on_a_crate)) {
                if(this.direction > 0) {
                    this.current_anim = this.anim[CROUCH_RIGHT];
                } else {
                    this.current_anim = this.anim[CROUCH_LEFT];
                }
            } else if (this.crouching) {
                if(this.direction > 0) {
                    this.current_anim = this.anim[STAND_RIGHT];
                } else {
                    this.current_anim = this.anim[STAND_LEFT];
                }
            }
            if(this.jetpack_fuel < 0) {
                this.has_jetpack = false;
            }
        }
    };

    player.teleport = function(x, y) {
        this.x = x;
        this.y = y;
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
            if(this.frame >= this.current_anim.length) {
                this.frame = 0;
            }
            ctx.drawImage(dude_img, this.current_anim[this.frame] * 32, 0, 32, 48,
                this.x + window_x,this.y + window_y, 32, 48);
        }
    };
    return player;
}


EntityFactory.prototype.make_enemy = function(x, y, type) {
    "use strict";

    var image;

    if(type === T_ENEMY_1_START) {
        image = enemy_img;
    } else if (type === T_ENEMY_2_START) {
        image = enemy_2_img;
    } else if (type === T_BOSS_1_START){
        image = brain_1_img;
    }

    return new Enemy(x, y, type, image);
};

EntityFactory.prototype.make_enemies = function() {
    "use strict";
    var x, y;

    for(y = 0; y<game_lib.map.length; y++) {
        for(x = 0; x< game_lib.map[0].length; x++) {
            if(game_lib.map[y][x] === T_ENEMY_1_START ||
                game_lib.map[y][x] === T_ENEMY_2_START ||
                game_lib.map[y][x] === T_BOSS_1_START) {
                enemies.push(this.make_enemy(x, y, game_lib.map[y][x]));
            }
        }
    }
}

EntityFactory.prototype.make_enemy_bullets = function() {

    for(var i = 0; i < max_enemy_bullets; ++i) {
        enemy_bullets[i] = [];
        enemy_bullets[i].alive = false;
        enemy_bullets[i].bullet_timer = 10;
    }
    return enemy_bullets;
};

EntityFactory.prototype.make_entities = function() {
    "use strict";


    var self = this;
    // make doors, switches and trampolines.
    // have to make switches before doors
    game_lib.map_iterate(function(x, y) {
        if(game_lib.map[y][x] > 15 && game_lib.map[y][x] < 32) {
            game_lib.entities.push(self.make_entity(x, y, game_lib.map[y][x], SWITCH));
        }
    });
    game_lib.map_iterate(function(x, y) {
        if(game_lib.map[y][x] > 31 && game_lib.map[y][x] < 48) {
            game_lib.entities.push(self.make_entity(x, y, game_lib.map[y][x], DOOR));
        }
    });
    game_lib.map_iterate(function(x, y) {
        if(game_lib.map[y][x] > 7 && game_lib.map[y][x] < 16) {
            game_lib.entities.push(self.make_entity(x, y, game_lib.map[y][x], game_lib.map[y][x]));
        }
    });
}

function make_bullets() {
    "use strict";

    var i;

    for(i = 0; i < max_bullets; i++) {
        bullets[i] = [];
        bullets[i].alive = false;
    }
}

function makeLevelButton(x, y, id) {

    return new LevelButton(x, y, 64, 64, id, RUNNING);

}
