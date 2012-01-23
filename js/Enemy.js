function Enemy(x_t, y_t, tp, img) {

    this.x_tile = x_t;
    this.y_tile = y_t;
    this.type = tp;

    this.x = this.x_tile * TILE_WIDTH;
    this.y = this.y_tile * TILE_WIDTH - 18;
    this.y_inertia = 1;

    this.image = img;

    this.current_anim = enemy_anim[WALK_LEFT];
    this.frame = 0;
    this.state = ACTIVATED;

    this.is_being_pushed = false;
    this.wait_index = 0;
    this.alive = true;

    this.direction = 1;
    this.bullet_timer = 21;

    map[this.y_tile][this.x_tile] = 0;
}

function make_enemies() {
    for(var y = 0; y<map.length; y++) {
        for(var x = 0; x< map[0].length; x++) {
            if(map[y][x] == ENEMY_1_START || map[y][x] == ENEMY_2_START) {
                enemies.push(make_enemy(x, y, map[y][x]));
            }
        }
    }
}

function make_enemy(x, y, type) {

    if(type == 3) {
        image = enemy_img;
    } else if (type == 4) {
        image = enemy_2_img;
    }

    return new Enemy(x, y, type, image, EMPTY);
/*
    var enemy = new Array();

    enemy.type = type;
    enemy.direction = 1;
    enemy.x = x * 32;
    enemy.y = y * 32 - 18;
    enemy.y_inertia = 1;
    enemy.current_anim = enemy_anim[WALK_LEFT];
    enemy.frame = 0;
    enemy.wait_index = 0;
    enemy.bullet_timer = 21;
    enemy.alive = true;
    return enemy;
    */
}

function make_enemy_bullets() {
    for(var i = 0; i < max_enemy_bullets; ++i) {
        enemy_bullets[i] = new Array();
        enemy_bullets[i].alive = false;
        enemy_bullets[i].bullet_timer = 10;
    }
}

function move_enemies() {
    for(var i = 0; i < enemies.length; ++i) {
        if(enemies[i].alive) {
            // check for crate intersections
            for(var k = 0; k < entities.length; ++k) {
                if(entities[k].type == CRATE) {
                    if(intersect(enemies[i].x, enemies[i].y, 32, 48, entities[k].x, entities[k].y, 32, 32)) {
                        if(enemies[i].x < entities[k].x) {
                            enemies[i].x -=4;
                        } else {
                            enemies[i].x += 4;
                            if(pixel_to_tile(enemies[i].x, enemies[i].y) > 0 || pixel_to_tile(enemies[i].x + 32, enemies[i].y) > 0) {
                                if(enemies[i].x < entities[k].x) {
                                    enemies[i].x +=4;
                                    entities[k].x += 4;
                                    player.x += 4;
                                } else {
                                    enemies[i].x -=4;
                                    entities[k].x -= 4;
                                    player.x -= 4;
                                }
                            }
                        }
                    }
                }
            }
            if(enemies[i].y_inertia < 10) {
                enemies[i].y_inertia = enemies[i].y_inertia * 2;
            } else {
                enemies[i].y_inertia = 10;
            }
            enemies[i].y += enemies[i].y_inertia;
            if(pixel_to_tile(enemies[i].x + 2, enemies[i].y + 47) > 0 ||
                pixel_to_tile(enemies[i].x + 30, enemies[i].y + 47) > 0) {
                enemies[i].y -= enemies[i].y_inertia;
                enemies[i].y_inertia = 1;
            }

            if(vertical_intersect(enemies[i].y, 48, player.y, 48)) {
                if(enemies[i].x > player.x) {
                    enemies[i].direction = -1;
                } else {
                    enemies[i].direction = 1;
                }
                if(enemies[i].bullet_timer < 20) {
                    enemies[i].bullet_timer++;
                } else {
                    enemy_fire(enemies[i].x, enemies[i].y, enemies[i].direction);
                    enemies[i].bullet_timer = 0;
                }
                if(enemies[i].direction == -1) {
                    enemies[i].current_anim = enemy_anim[WALK_RIGHT];
                } else {
                    enemies[i].current_anim = enemy_anim[WALK_LEFT];
                }
                continue;  // we're done here, robot stops and shoots
            }

            enemies[i].x += enemies[i].direction;

            // if there is a tile in front of them, change directions
            if(pixel_to_tile(enemies[i].x, enemies[i].y + 30) > 0 ||
                pixel_to_tile(enemies[i].x + 32, enemies[i].y + 30) > 0) {
                enemies[i].direction = -enemies[i].direction;
                enemies[i].x += enemies[i].direction;
            }
            // if they would be walking on an empty tile, change direction
            if(pixel_to_tile(enemies[i].x + 32, enemies[i].y + 50) < 1 ||
                pixel_to_tile(enemies[i].x, enemies[i].y + 50) < 1) {
                enemies[i].direction = -enemies[i].direction;
            }

            if(enemies[i].direction == -1) {
                enemies[i].current_anim = enemy_anim[WALK_RIGHT];
            } else {
                enemies[i].current_anim = enemy_anim[WALK_LEFT];
            }
        }
    }
}


function move_enemy_bullets() {
    enemy_bullet_timer++;
    var y_offset;

    if(crouching) {
        y_offset = 30;
    } else {
        y_offset = 10;
    }
    var robot_y_top = player.y + y_offset;
    for(var i = 0; i < enemy_bullets.length; ++i) {
        //console.log(enemy_bullets.length);
        if(enemy_bullets[i].alive) {
            enemy_bullets[i].x += 4 * enemy_bullets[i].direction;
            if(enemy_bullets[i]['x'] > canvas.width - window_x || enemy_bullets[i]['x'] < 0 - window_x) {
                enemy_bullets[i].alive = false;
			} else if (pixel_to_tile(enemy_bullets[i]['x'], enemy_bullets[i]['y']) > 0) {
                enemy_bullets[i]['x'] -= bullet_speed * enemy_bullets[i]['direction']; // back the bullet up
                enemy_bullets[i].alive = false;
				fire_particles(enemy_bullets[i]['x'], enemy_bullets[i]['y'], 2, 'red');
            } else {
                if(intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4, player.x + 10, robot_y_top, 12, 48 - y_offset)) {
                    //enemies[j].alive = false;
                    enemy_bullets[i].alive = false;
                    fire_particles(enemy_bullets[i]['x'], enemy_bullets[i]['y'], 2, 'red');
                    fire_particles(player.x + 16, player.y + 16, 4,'grey');
                    reset_level = true;
                    player_dead = true;
                }
                for(var k = 0; k < entities.length; ++k) {
                    if(entities[k].type == CRATE) {
                        if(enemy_bullets[i] && intersect(enemy_bullets[i].x, enemy_bullets[i].y, 4, 4,
                            entities[k].x, entities[k].y, 32, 32)) {
                            enemy_bullets[i].alive = false;
                            fire_particles(enemy_bullets[i]['x'], enemy_bullets[i]['y'], 2, 'red');
                        }
                    }
                }

            }
        }
    }
}

function enemy_fire(x, y, direc) {

    for(var i = 0; i < enemy_bullets.length; ++i) {
        if(!enemy_bullets[i].alive) {
            enemy_bullets[i].x = x + 26;
            enemy_bullets[i].y = y + 16;
            enemy_bullets[i].direction = direc;
            enemy_bullets[i].alive = true;
            break;
        }
    }
}
function draw_enemy_bullets() {
    for(var i = 0; i < enemy_bullets.length; ++i) {
        if(enemy_bullets[i].alive) {
            ctx.drawImage(bullet_img, 0, 0, 4, 4, enemy_bullets[i].x + window_x, enemy_bullets[i].y + window_y, 4, 4);
        }
    }

}


function draw_enemies() {

    for(var i = 0; i < enemies.length; ++i) {
        enemies[i].wait_index++;
        if(enemies[i].alive) {
            if(enemies[i].wait_index > frameRate) {
                enemies[i].wait_index = 0;
                enemies[i].frame++;
            }
            if(enemies[i].frame >= enemies[i].current_anim.length) {
                enemies[i].frame = 0;
            }
            ctx.drawImage(enemies[i].image, enemies[i].current_anim[enemies[i].frame] * 32, 0, 32, 48,
                enemies[i].x + window_x,enemies[i].y + window_y, 32, 48);
        }
    }
}
