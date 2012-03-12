function get_input() {

    key_pressed = keys.length > 0;
    console.log(key_pressed);

    if (88 in keys && keys[88]) {
        if (player.alive) {
            dude_fire();
        }
    }
    player.standing = true;
    if (37 in keys && keys[37]) { // || (21 in keys && keys[21]) || (65 in keys && keys[65])){ //left
        player.moving_left = true;
    } else {
        player.moving_left = false;
    }

    if (39 in keys && keys[39]) { //|| (22 in keys && keys[22]) || (68 in keys && keys[68])){ //right
        player.moving_right = true;
    } else {
        player.moving_right = false;
    }

    if (40 in keys && keys[40]) { // DOWN
        player.down = true;
    } else {
        player.down = false;
        crouching = false;
    }
    if (90 in keys && keys[90]) {
        player.up = true;
    } else {
        player.up = false;
    }
    //energy++;
}
