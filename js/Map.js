function load_map(level) {
    if(level > 1) {
        level = 0;
        current_level = 0;
    }
    var request = new XMLHttpRequest();
    request.open('GET', 'http://scoab/maps/level_'+level+'.txt');
    //request.open('GET', 'http://badbattery.com/maps/level_'+level+'.txt');
    request.onreadystatechange = function() {
        if (request.readyState != 4 || request.status != 200) {
          return;
        }
        parse_map(request.responseText);
        initialize_data();
    };
    request.send(null);
}

function parse_map(map_data) {
    var rows = map_data.split('\n');
    map = new Array(rows.length);
    for(var y = 0; y < rows.length; ++y) {
        var cols = rows[y].split(',');
        map[y] = new Array(cols.length);
        for(var x = 0; x < cols.length; ++x) {
            map[y][x] = cols[x] - 1;
        }
    }
    map_loaded = true;
}

function draw_map() {
    map_iterate(function(x, y) {
        if(map[y][x] > 47) {
            var x_pos = window_x + x * 32;
            var y_pos = window_y + y * 32;
            if(x_pos > -32 || x_pos < ctx.width || y_pos > -32 || y_pos < ctx.height) {
                var index = map[y][x];
                var sx = index%16 * 32;
                var sy = Math.floor(index/16) * 32;
                ctx.drawImage(map_img, sx, sy, 32, 32, x_pos, y_pos, 32, 32);
            }
        }
    });
}
function pixel_to_tile(x, y) {
    var x_tile = x >> 5;
    var y_tile = y >> 5;
    var tile = map[y_tile][x_tile];
    if(tile > 47) {
        return map[y_tile][x_tile];
    } else {
        return 0;
    }
}

function true_pixel_to_tile(x, y) {
    var x_tile = x >> 5;
    var y_tile = y >> 5;
    return map[y_tile][x_tile];
}

function map_iterate(func) {
    for(y = 0; y<map.length; y++) {
        for(x = 0; x< map[0].length; x++) {
            func(x, y);
        }
    }
}

function resetting_level() {
    reset_timer++;
    if(reset_timer > 100) {
        reset_level = false;
        reset_timer = 0;
        load_map(current_level);
        //initialize_data();
    }
}
