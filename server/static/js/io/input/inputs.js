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

    constructor(width, height, position_top, position_left) {
        this.button = document.createElement("button");
        this.button.style.position = "absolute";
        this.button.style.width = width;
        this.button.style.height = height;
        this.button.style.top = position_top;
        this.button.style.left = position_left;
        this.button.innerHTML = "Click me now!";
        document.body.appendChild(this.button);
    }
}
