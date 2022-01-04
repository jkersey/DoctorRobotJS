function GameLib() {
    this.map = [];
    this.entities = [];
    this.particles = [];
}

GameLib.VERSION = "v0.1.1";
GameLib.MAX_PARTICLES = 500;
GameLib.TILE_WIDTH = 32;

GameLib.prototype.map_iterate = function(func) {
    
    var x, y;

    for(y = 0; y < this.map.length; y++) {
        for(x = 0; x< this.map[0].length; x++) {
            func(x, y);
        }
    }

};

GameLib.prototype.pixel_to_tile = function(x, y) {

    var tile, x_tile = x >> 5, y_tile = y >> 5;

    try {
	tile = this.map[y_tile][x_tile];
	if(tile > 47) {
	    return this.map[y_tile][x_tile];
	} else {
	    return 0;
	}
    } catch(err) {
        return 0;
    }
};

GameLib.prototype.vertical_intersect = function (y, yh, y2, y2h) {
    
    return y + yh > y2 && y < y2 + y2h;

};

GameLib.prototype.intersect = function (sx, sy, sw, sh, tx, ty, tw, th) {
    
    return sx + sw > tx && sx < tx + tw && sy + sh > ty && sy < ty + th;
};

GameLib.prototype.contains = function (sx, sy, sw, sh, tx, ty, tw, th) {
    
    return sx + 5 > tx && sx + sw - 5 < tx + tw && sy + 5 > ty && sy + sh - 5 < ty + th;
};

GameLib.prototype.on_top_of = function(sx, sy, sw, sh, tx, ty, tw) {
    
    return sx + sw > tx && sx < tx + tw && sy + sh -1 < ty && sy + sh + 1 > ty;
};

GameLib.prototype.parse_map = function(map_data) {
    
    console.log("parsing map");

    var	cols, x, y,
	rows = map_data.split('\n');
    console.log("got " + rows.length + " rows");

    this.map = [];
    //map_name = rows[0];
    for(y = 1; y < rows.length; ++y) {
        cols = rows[y].split(',');
        console.log("got " + cols.length + " columns");
	if(cols[0] === '0') {
	    break;
	}
        this.map[y-1] = [];
        for(x = 0; x < cols.length; ++x) {
	    if(cols[x] === '') {
		break;
	    }
            this.map[y-1][x] = cols[x] - 1;
        }
    }
    this.map_loaded = true;
    console.log("Loaded map");
};

GameLib.prototype.Entity = function(x_t, y_t, tp, img, tile, key) {

    this.x_tile = x_t;
    this.y_tile = y_t;
    this.direction = 1;
    this.y_index = 0;
    this.y_inertia = 0;
    this.type = tp;
    this.key = key;
    this.x = this.x_tile * GameLib.TILE_WIDTH;
    this.y = this.y_tile * GameLib.TILE_WIDTH;
    this.image = img;
    this.current_anim = [];
    this.frame = this.current_anim.length - 1;
    this.state = ACTIVATED;
    this.is_teleportable = false;
    this.is_being_pushed = false;
    this.wait_index = 0;
    this.alive = true;
    this.loop_animation = false;
    game_lib.map[this.y_tile][this.x_tile] = tile;

    this.draw = function() {
		var x_index;

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
                x_index = this.current_anim[this.frame];
                if(this.type === 256) {
                    console.log("index is " + this.frame)
                }
                if(this.type === T_PERSON && this.state === 9) {
                    game_lib.draw_text("Thanks Doctor Robot!", this.x - 32 + window_x, this.y - 16 + window_y);
                }
                ctx.drawImage(this.image, 
			      x_index * 32, this.y_index, 32, 32,
			      this.x + window_x,this.y + window_y, 32, 32);
            }
        }

    };

    this.move = function() {
        // override this
    };

    this.check_player = function() {
        // override this
    };

};

GameLib.prototype.move_stuff = function() {
    this.move_particles();
};

GameLib.prototype.draw_entities = function () {
    
    var i;
    for(i = 0; i < this.entities.length; ++i) {
        this.entities[i].draw();
    }
};

GameLib.prototype.game_loop = function() {
    this.clear_screen();
    this.draw_map();
    this.draw_particles();
    this.draw_entities();
};

GameLib.prototype.clear_screen = function() {
	
    ctx.drawImage(tile_img, 0, 0, canvas.width, canvas.height);
};

GameLib.prototype.draw_map = function() {

	var x_pos, y_pos, sx, sy, index;

	this.map_iterate(function(x, y) {
        if(game_lib.map[y][x] > 47) {
            x_pos = window_x + x * 32;
            y_pos = window_y + y * 32;
            if(x_pos > -32 || x_pos < ctx.width || y_pos > -32 || y_pos < ctx.height) {
                index = game_lib.map[y][x];
                sx = index%16 * 32;
                sy = Math.floor(index/16) * 32;
                ctx.drawImage(map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
            }
        }
    });
};

GameLib.prototype.draw_particles = function() {
    
    var i;
    for(i = 0; i < GameLib.MAX_PARTICLES; ++i) {
        if(this.particles[i].alive) {
            if(this.particles[i].col === 'red') {
                ctx.fillStyle = "#" + (99 - this.particles[i].age) + "0000";
            } else if(this.particles[i].col === 'gray') {
                ctx.fillStyle = "#" + (99 - this.particles[i].age) + "7777";
            } else {
                ctx.fillStyle = "#" + (99 - this.particles[i].age) + "7777";
            }
            this.drawRectangle(this.particles[i].x + window_x,
                this.particles[i].y + window_y,
                this.particles[i].size,
                this.particles[i].size, true);
        }
    }
};

GameLib.prototype.draw_text = function (str, x, y) {
	
	var i, sx, sy, index;
    for (i=0; i<str.length; i++){
        index = str.charCodeAt(i) - 32;
        sx = index%10 * 10;
        sy = Math.floor(index/10) * 10;
        ctx.drawImage(font_img, sx, sy, 10, 10,
                      x + (i * 12) , y, 10, 10);
    }
};

GameLib.prototype.drawRectangle = function (x, y, w, h, fill) {

	ctx.beginPath();
	ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.stroke();
    if (fill) { ctx.fill(); }
};

GameLib.prototype.fire_particles = function (x, y, size, col) {
    
    var num_particles = 10;

    for(var i = 0; i < GameLib.MAX_PARTICLES; ++i) {
        if(!this.particles[i].alive) {
            this.particles[i].alive = true;
            this.particles[i].x = x;
            this.particles[i].y = y;
            this.particles[i].age = 0;
            this.particles[i].size = size;
            this.particles[i].col = col;
            this.particles[i].x_vel = Math.floor(Math.random()*10 - 5);
            this.particles[i].y_vel = -Math.floor(Math.random()*10 - 5);
            num_particles--;
            if(num_particles < 0) {
                break;
            }
        }
    }
};


GameLib.prototype.make_particles = function () {

    for(var i = 0; i < GameLib.MAX_PARTICLES; i++) {
        this.particles[i] = [];
        this.particles[i].alive = false;
        this.particles[i].age = 0;
    }
};

GameLib.prototype.move_particles = function () {

    for(var i = 0; i < GameLib.MAX_PARTICLES; ++i) {
        var particle = this.particles[i];

        particle.age += 1;
        particle.size -= .05;

        if(particle.age > 100) {
            particle.alive = false;
            particle.age = 0;
        }

        if(particle.alive) {

            particle.x += particle.x_vel;

            if(game_lib.pixel_to_tile(particle.x, particle.y) > 0) {
                particle.x -= particle.x_vel;
                particle.x_vel = -particle.x_vel;
            }

            particle.y_vel += 0.3;  // particle.size;
            particle.y += particle.y_vel;

            if(game_lib.pixel_to_tile(particle.x, particle.y) > 0) {
                particle.y -= particle.y_vel * gravity / particle.size;
                particle.y_vel = -particle.y_vel;
            }
        }
    }
};


