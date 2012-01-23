function clear_screen() {
    ctx.drawImage(tile_img, 0, 0, canvas.width, canvas.height);
}

function draw_text(str, x, y) {
    for (var i=0; i<str.length; i++){
        var index = str.charCodeAt(i) - 32;
        var sx = index%10 * 10;
        var sy = Math.floor(index/10) * 10;
        ctx.drawImage(font_img, sx, sy, 10, 10,
                      x + (i * 12) , y, 10, 10);
    }
}

function vertical_intersect(y, yh, y2, y2h) {
    return y + yh > y2 && y < y2 + y2h;

}

function intersect(sx, sy, sw, sh, tx, ty, tw, th) {
    return sx + sw > tx && sx < tx + tw && sy + sh > ty && sy < ty + th;
}

function contains(sx, sy, sw, sh, tx, ty, tw, th) {
    return sx + 5 > tx && sx + sw - 5 < tx + tw && sy + 5 > ty && sy + sh - 5 < ty + th;
}

function drawRectangle(x, y, w, h, fill) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.stroke();
    if (fill) ctx.fill();
}

function animate() {
    window.requestAnimFrame(animate);
    game_loop();
}

function get_trigger(id){
    for(var i = 0; i < entities.length; ++i) {
        if(entities[i].key == id - 16) {
            return entities[i];
        }
    }
    return 0;
}

function get_target(id) {
    for(var i = 0; i < entities.length; ++i) {
        if(entities[i].key == id + 16) {
            return entities[i];
        }
    }
    return 0;
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

