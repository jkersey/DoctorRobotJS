function build_crate(x_t, y_t, tp, img, tile, key) {

    var entity = new Entity(x_t, y_t, tp, img, tile, key);

    entity.move = function() {
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
        if(intersect(player.x, player.y+32,32, 32, this.x, this.y, 32, 32 )) {
            if(player.y + 48 > this.y) {
                if (this.x > player.x) {
                player.x--;
                this.x += 2;
                if(pixel_to_tile(this.x + 32, this.y) > 0) {
                    this.x -= 2;
                    player.x-=4;
                }
            } else {
                player.x++;
                this.x -= 2;
                if(pixel_to_tile(this.x, this.y) > 0) {
                    this.x += 2;
                    player.x+=4;
                }
                }
            } else {

            }
        }
    };
    return entity;
}
