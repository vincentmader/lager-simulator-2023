class Input {
    constructor(
        element_id,
        {
            oninput = () => {},
            onchange = () => {},
            onclick = () => {},
        }
    ) {
        this.element = document.getElementById(element_id);
        this.element.oninput = () => oninput(this.element.value);
        this.element.onchange = () => onchange(this.element.value);
        this.element.onclick = () => onclick(this.element.value);
    }
}


// <button type="button" style="color: white; visibility: visible; position: absolute; top: 50vh; left: 0;">Click me!</button>


export class UIButton {

    constructor(width, height, position_left, position_top, icon, on_click) {
        this.element = document.createElement("button");
        this.element.style.position = "absolute";
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.left = position_left;
        this.element.style.top = position_top;
        this.element.src = icon;
        this.element.onclick = on_click;
        document.body.appendChild(this.element);
    }
}
