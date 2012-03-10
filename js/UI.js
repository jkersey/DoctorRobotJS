
function draw_hud() {
    ctx.drawImage(hud_img, 0, 0, canvas.width, 16);
    ctx.fillStyle = "#000000";
    drawRectangle(40,4, 50, 8, true);
    ctx.fillStyle = "#990000";
    drawRectangle(40, 4, player.jetpack_fuel/4, 8, true);
    ctx.drawImage(images['fuel_overlay'], 2, 2);

    //draw_text("1000", 300, 2);
}
