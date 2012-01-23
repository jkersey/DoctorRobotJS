function make_bullets() {
    for(var i = 0; i < max_bullets; i++) {
        bullets[i] = new Array();
        bullets[i]['alive'] = false;
    }
}
function move_bullets() {
    bullet_timer++;
    for(var i = 0; i < max_bullets; ++i) {
        if(bullets[i]['alive']) {
            bullets[i]['x'] += bullet_speed * bullets[i]['direction'];
            if(bullets[i]['x'] > canvas.width - window_x || bullets[i]['x'] < 0 - window_x) {
				bullets[i]['alive'] = false
			} else if (pixel_to_tile(bullets[i]['x'], bullets[i]['y']) > 0) {
				bullets[i]['x'] -= bullet_speed * bullets[i]['direction']; // back the bullet up
                bullets[i]['alive'] = false;
                fire_particles(bullets[i]['x'], bullets[i]['y'], 2, 'red');
            } else {
                for(var j = 0; j < enemies.length; ++j) {
                    if(enemies[j].alive) {
                        if(bullets[i] && intersect(bullets[i].x, bullets[i].y, 4, 4,
                            enemies[j].x + 10, enemies[j].y, 12, 48)) {
                            enemies[j].alive = false;
                            bullets[i].alive = false;
                            fire_particles(bullets[i]['x'], bullets[i]['y'], 2, 'red');
                            fire_particles(enemies[j]['x'] + 16, enemies[j]['y']+ 16, 4,'red');
                        }
                    }
                }
                for(var k = 0; k < entities.length; ++k) {
                    if(entities[k].type == CRATE) {
                        if(bullets[i] && intersect(bullets[i].x, bullets[i].y, 4, 4,
                            entities[k].x, entities[k].y, 32, 32)) {
                            bullets[i].alive = false;
                            fire_particles(bullets[i]['x'], bullets[i]['y'], 2, 'red');
                        }
                    }
                }
            }
        }
    }
}

function dude_fire() {
    if(bullet_timer > 10) {
        bullet_timer = 0;
        for(var i = 0; i < max_bullets; ++i) {
            if(!bullets[i]['alive']) {
                bullets[i]['x'] = player.x + 26;
                bullets[i]['y'] = player.y + 25;
                if(player.crouching) {
                    bullets[i]['y'] += 10;
                }
                bullets[i]['direction'] = player.direction;
                bullets[i]['alive'] = true;
                break;
            }
        }
    }
}
function draw_bullets() {
    for(var i = 0; i < bullets.length; ++i) {
        if(bullets[i]['alive']) {
            ctx.drawImage(bullet_img, 0, 0, 4, 4, bullets[i]['x'] + window_x, bullets[i]['y'] + window_y, 4, 4);
        }
    }
}

