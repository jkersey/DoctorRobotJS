/**
 * Created by JetBrains PhpStorm.
 * User: James
 * Date: 1/28/12
 * Time: 9:15 PM
 * To change this template use File | Settings | File Templates.
 */
function build_fluid(x_t, y_t, tp, img, tile, key) {

    var entity = new Entity(x_t, y_t, tp, img, tile, key);
    entity.current_anim = fluid_anim;
    entity.loop_animation = true;

    entity.check_player = function() {
    };

    entity.move = function() {
    };
    return entity;
}