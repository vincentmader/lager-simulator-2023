export class Canvas {
    constructor() {
        this.element = document.getElementById("canvas-0");
        this.elementLeft = this.element.offsetLeft + this.element.clientLeft;
        this.elementTop = this.element.offsetTop + this.element.clientTop;
        this.ctx = this.element.getContext('2d');
        this.W = this.element.width;
        this.element.height = this.element.width;
        this.H = this.element.height;
    }
}
