function UIBase(x, y, width, height, action) {

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    this.target_x;
    this.target_y;

    this.action = action;

    this.START = 0;
    this.HOVER = 1;
    this.ACTIVATED = 2;

    this.easeStrategy = "FLASH";

    this.animations = new Array();
    this.animations[this.START] = [0];
    this.animations[this.HOVER] = [1, 2, 3];
    this.animations[this.ACTIVATED] = [4, 5, 6];
    this.current_animation = this.animations[this.START];
    this.current_frame = 0;

    this.state = this.START;

    window.addEventListener('mouseup', this.process_click, true);

    this.activate = function() {
        this.state = this.ACTIVATED;
        game_state = this.action;
    }

    this.process_click = function() {
        if(mouseUp) {
            mouseUp = false;
            this.activate();
            this.current_animation = this.animations[this.ACTIVATED];
        }
    };

    this.move = function() {
        if(mouseX > this.x && mouseX < this.x + this.width &&
           mouseY > this.y && mouseY < this.y + this.height) {
            this.state = this.HOVER;
            this.process_click();
        } else {
            this.state = this.START;
        }

        if(Math.abs(this.x - this.target_x) > 1) {
            // use easing function
        }
        
        if(Math.abs(this.y - this.target_y) > 1) {
            // use easing function
        }
    };


}

function Button(x, y, width, height, text, action) {
    this.inheritsFrom = UIBase;
    this.inheritsFrom(x, y, width, height, action);
    this.isAButton = "true";

    if(text === null) { text = "TEXT"; }

    this.text_x = (width - text.length * 12) / 2 + x;

    this.text_y = (height - 10) / 2 + y;
    this.text = text;

    this.draw = function() {
        this.move();
        if(this.state === this.START) {
            ctx.fillStyle = "#330000";
        } else if(this.state === this.HOVER) {
            ctx.fillStyle = "#333300";
        }
        drawRectangle(x,y, width, height, true);
        ctx.fillStyle = "#000000";
        draw_text(this.text, this.text_x, this.text_y);
    };
}

function ImageButton(image, x, y, width, height, action) {
    this.inheritsFrom = Button;
    this.inheritsFrom(x, y, width, height, action);
    this.image = "I have an image";

    this.draw = function() {n
        this.move();
        ctx.drawImage(this.image, 
                      this.current_animation[this.current_frame] * 32, 0, 
                      this.width, this.height,
                      this.x,this.y, this.width, this.height);
        this.current_frame++;
        if(this.current_animation.length >= this.current_frame) {
            this.current_frame = 0;
        }
    };

}

function Screen(background) {
    this.buttons = new Array();
    this.background_image = background;
}
