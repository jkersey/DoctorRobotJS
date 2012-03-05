/**
 * Created by JetBrains PhpStorm.
 * User: James
 * Date: 1/25/12
 * Time: 7:37 PM
 * To change this template use File | Settings | File Templates.
 */

function EntityManager() {

    this.entities = new Array();

    this.add_entity = function(entity) {
        this.entities.push(entity);
    };

    this.move_stuff = function() {
        if(this.entities && this.entities.length > 0) {
            for(var i = 0; i < this.entities.length - 1; ++i) {
                entities[i].move();
                for(var j = i + 1; j < this.entities.length; ++j) {
                    if(entities[i].type == CRATE) {
                        if(entities[j] == CRATE) {
                            this.handle_crate_crate_collision(entities[i], entities[j]);
                        } else if(entities[j].type == PLAYER) {
                            this.handle_crate_player_collision(entities[i], entities[j]);
                        } else if(entities[j].type == ENEMY) {
                            this.handle_crate_enemy_collision(entities[i], entities[j]);
                        } else if(entities[j].type == BULLET || entities[j].type == ENEMY_BULLET) {
                            this.handle_crate_bullet_collision(entities[i], entities[j]);
                        }
                    } else if(entities[i].type == PLAYER) {
                        if(entities[j].type == ENEMY_BULLET) {
                            this.handle_player_enemy_bullet_collision(entities[i], entities[j]);
                        } else if (entities[j].type == ENEMY) {
                            this.handle_player_enemy_collision(entities[i], entities[j]);
                        }
                    } else if(entities[i].type == ENEMY){
                        if(entities[j].type == BULLET) {
                            this.handle_enemy_bullet_collision(entities[i], entities[j]);
                        }
                    }
                }
            }
        }
    };

    this.handle_crate_crate_collision = function(crate_1, crate_2) {};

    this.handle_crate_player_collision = function(crate, player) {};

    this.handle_crate_enemy_collision = function(crate, enemy) {};

    this.handle_crate_bullet_collision = function(crate, bullet) {};

    this.handle_player_enemy_bullet_collision = function(player, bullet) {};

    this.handle_player_enemy_collision = function(player, enemy) {};

    this.handle_enemy_bullet_collision = function(enemy, bullet) {};

    this.draw_stuff = function() {
        if(this.entities && this.entities.length > 0) {
            for(var i = 0; i < this.entities.length - 1; ++i) {
                for(var j = i + 1; j < this.entities.length; ++j) {

                }
            }
        }
    };





}