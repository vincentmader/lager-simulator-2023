class Input {
    constructor(element_id) {
        this.element = document.getElementById(element_id);
    }
}

export class Slider extends Input {

    constructor(
        element_id,
        {
            oninput = () => {},
            onchange = () => {},
            min = 0,
            max = 100,
            step = 1,
            value = 50,
        }
    ) {
        super(element_id);
        this.element.oninput = () => oninput(this.element.value);
        this.element.onchange = () => onchange(this.element.value);
        this.element.min = min;
        this.element.max = max;
        this.element.step = step;
        this.element.value = value;
    }
}
