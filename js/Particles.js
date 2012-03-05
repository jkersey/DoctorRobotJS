
function fire_particles(x, y, size, col) {
	var num_particles = 10;
	for(var i = 0; i < max_particles; ++i) {
		if(!particles[i]['alive']) {
			particles[i]['alive'] = true;
			particles[i]['x'] = x;
            particles[i]['y'] = y;
			particles[i]['age'] = 0;
            particles[i]['size'] = size;
            particles[i]['col'] = col;
			num_particles--;
			if(num_particles < 0) {
				break;
			}
		}
	}
}
function make_particles() {
	for(var i = 0; i < max_particles; i++) {
		particles[i] = new Array();
		particles[i]['alive'] = false;
		particles[i]['x_vel'] = Math.floor(Math.random()*10 - 5);
		particles[i]['y_vel'] = Math.floor(Math.random()*10 - 5);
		particles[i]['age'] = 0;
	}
}

function move_particles() {
    for(var i = 0; i < max_particles; ++i) {
   		particles[i]['age']++;
   		if(particles[i]['age'] > 100) { particles[i]['alive'] = false; particles[i]['age'] = 0; }
   		if(particles[i]['alive']) {
               particles[i]['x'] += particles[i]['x_vel'];
   			if(pixel_to_tile(particles[i]['x'], particles[i]['y']) > 0) {
   				particles[i]['x'] -= particles[i]['x_vel'];
   				particles[i]['x_vel'] = -particles[i]['x_vel'];
   			}
   			particles[i]['y_vel'] += .3 / particles[i].size;
               particles[i]['y'] += particles[i]['y_vel'];
   			if(pixel_to_tile(particles[i]['x'], particles[i]['y']) > 0) {
   				particles[i]['y'] -= particles[i]['y_vel'] * gravity / particles[i].size;
                   particles[i]['y_vel'] = -particles[i]['y_vel'];
   			}
   		}
   	}

}

function draw_particles() {
	for(var i = 0; i < max_particles; ++i) {
		if(particles[i]['alive']) {
            if(particles[i]['col'] == 'red') {
                ctx.fillStyle = "#" + (99 - particles[i]['age']) + "0000";
            } else if(particles[i]['col'] == 'gray') {
                ctx.fillStyle = "#" + (99 - particles[i]['age']) + "7777";
            } else {
                ctx.fillStyle = "#" + (99 - particles[i]['age']) + "7777";
            }
			drawRectangle(particles[i]['x'] + window_x, particles[i]['y'] + window_y, particles[i].size, particles[i].size, true);
		}
	}
}
