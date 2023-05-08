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
