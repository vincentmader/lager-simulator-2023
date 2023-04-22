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

export class Slider extends Input {

    constructor(
        element_id,
        {
            oninput = () => {},
            onchange = () => {},
            onclick = () => {},
            min = 0,
            max = 100,
            step = 1,
            value = 50,
        }
    ) {
        super(
            element_id,
            {
                oninput: oninput,
                onchange: onchange,
                onclick: onclick,
            }
        );
        this.element.min = min;
        this.element.max = max;
        this.element.step = step;
        this.element.value = value;
    }
}

export class CheckBox extends Input {
    constructor(
        element_id,
        {
            oninput = () => {},
            onchange = () => {},
            onclick = () => {},
            checked = false,
        }
    ) {
        super(
            element_id,
            {
                oninput: oninput,
                onchange: onchange,
                onclick: onclick,
            }
        );
        this.element.checked = checked;
    }
}
