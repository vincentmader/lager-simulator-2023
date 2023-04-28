export class UIButton {

    constructor(width, height, position_left, position_top, icon, on_click) {
        this.element = document.createElement("button");
        this.element.style.position = "absolute";
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.left = position_left;
        this.element.style.top = position_top;
        this.element.style.background = "url(" + icon + ")";
        this.element.style.backgroundSize = "cover";
        this.element.onclick = on_click;
        document.body.appendChild(this.element);
    }

}
