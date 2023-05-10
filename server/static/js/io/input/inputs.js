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

    add(on_click, icon_texture="/img/empty_item.png", background_texture="/img/inventory_slot.png", x=-1, y=-1) {
        let num_buttons = Object.keys(this.buttons).length;
        if (x < 0 || y < 0) {
            x = num_buttons % this.width;
            y = Math.floor(num_buttons/this.width)
        }
        let pos_x = this.origin_left + x*(this.btn_width + this.padding);
        let pos_y = this.origin_top + y*(this.btn_height + this.padding);
        let button = new UIButton(this.btn_width, this.btn_height, pos_x, pos_y, icon_texture, background_texture, on_click);
        this.buttons[y*this.width + x] = button;
    }

    clear() {
        for (let idx in this.buttons) {
            this.buttons[idx].clear();
        }
    }

    visible(is_visible) {
        for (let idx in this.buttons) {
            let btn = this.buttons[idx];
            btn.visible(is_visible);
        }
    }
}


export class UIButton {

    constructor(width, height, position_left, position_top, icon, background_icon, on_click) {
        this.background = document.createElement("img");
        this.background.src = background_icon;
        this.background.style.position = "absolute";
        this.background.style.width = width;
        this.background.style.height = height;
        this.background.style.left = position_left;
        this.background.style.top = position_top;
        this.background.style.backgroundSize = "cover";
        document.body.appendChild(this.background);

        this.element = document.createElement("button");
        this.element.style.position = "absolute";
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.left = position_left;
        this.element.style.top = position_top;
        this.set_icon(icon);
        this.element.onclick = on_click;
        document.body.appendChild(this.element);
    }

    set_icon(icon) {
        if (icon == null) {
            icon = "/img/empty_item.png";
        }
        this.element.style.background = "url(" + icon + ")";
        this.element.style.backgroundSize = "80%";
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.backgroundPosition = "center";
    }

    visible(is_visible) {
        let visibility_category = is_visible ? "visible" : "hidden";
        this.element.style.visibility = visibility_category;
        this.background.style.visibility = visibility_category;
    }

    clear() {
        this.element.remove();
        this.background.remove();
    }
}
