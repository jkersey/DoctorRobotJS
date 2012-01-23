
function draw_hud() {
    ctx.drawImage(tile_img, 0, 0, canvas.width, 15);
    if(player.jetpack_fuel > 0) {
        draw_text("JETPACK", 5, 2);
        ctx.fillStyle = "#990000";
        drawRectangle(92, 2, player.jetpack_fuel, 10, true);
    }
}
