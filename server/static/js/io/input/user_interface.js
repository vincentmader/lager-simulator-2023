import {UIButton} from "./inputs.js";

export class ButtonPane {

    constructor(origin_left, origin_top, width, height, btn_width, btn_height=null, padding=null) {
        if (btn_height == null) {
            btn_height = btn_width;
        }
        if (padding == null) {
            padding = btn_width*0.1;
        }
        this.origin_left = origin_left;
        this.origin_top = origin_top;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.btn_width = btn_width;
        this.btn_height = btn_height;
        this.buttons = {};
    }

    add(on_click, x=-1, y=-1) {
        let num_buttons = Object.keys(this.buttons).length;
        if (x < 0 || y < 0) {
            x = num_buttons % this.width;
            y = Math.floor(num_buttons/this.width)
        }
        let pos_x = this.origin_left + x*(this.btn_width + this.padding);
        let pos_y = this.origin_top + y*(this.btn_height + this.padding);
        let button = new UIButton(this.btn_width, this.btn_height, pos_x, pos_y, "/img/icon.png", on_click);
        this.buttons[y*this.width + x] = button;
    }

    clear() {
        for (let idx in this.buttons) {
            this.buttons[idx].element.remove();
        }
    }

    visible(visible) {
        let visible_str = "hidden";
        if (visible) {
            visible_str = "visible";
        }
        for (let idx in this.buttons) {
            this.buttons[idx].element.style.visibility = visible_str;
        }
    }
}
