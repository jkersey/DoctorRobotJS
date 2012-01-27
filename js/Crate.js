function build_crate(x_t, y_t, tp, img, tile, key) {

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
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
                    this.x += 2;
                    if(pixel_to_tile(this.x + 32, this.y) > 0) {
                        this.x -= 2;
                        player.x-=4;
                    }
                }
                player.x-=4;
            } else if (this.x + 15 < player.x) {
                if(player.grounded) {
                    this.x -= 2;
                    if(pixel_to_tile(this.x, this.y) > 0) {
                        this.x += 2;
                        player.x+=4;
                    }
                }
                player.x+=4;
            }
        }
    };

    entity.move = function() {
        for(var i = 0; i < entities.length; ++i) {
            if(intersect(this.x, this.y, 32, 32, entities[i].x, entities[i].y, 32, 23)) {
                if(entities[i].type == CRATE) {
                    if(this.y > entities[i].y) {
                        entities.y--;
                    }
                    if(this.x > entities[i].x) {
                        this.x++;
                        entities.x--;
                    } else if(this.x < entities[i].x) {
                        this.x--;
                        entities.x++;
                    }

                }
            }
        }

        for(var k = 0; k < enemies.length; ++k) {
            if(intersect(this.x, this.y, 32, 32, enemies[k].x, enemies[k].y + 8, 32, 48)) {
                if(this.y_inertia > 1 && enemies[k].y_inertia == 1 && this.y < enemies[k].y) {
                    enemies[k].alive = false;
                    fire_particles(enemies[k].x, enemies[k].y, 4, 'red');
                }
            }
        }
        if(this.y_inertia < 10) {
            this.y_inertia = this.y_inertia * 2;
        } else {
            this.y_inertia = 10;
        }
        this.y += this.y_inertia;
        if(pixel_to_tile(this.x, this.y + 32) > 0 ||
            pixel_to_tile(this.x + 32, this.y + 32) > 0) {
            this.y -= this.y_inertia;
            this.y_inertia = 1;
        }
    };
    return entity;
}
