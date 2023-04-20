const RESOLUTION_FACTOR = 4;

export class Canvas {

    constructor() {
        this.element = document.getElementById("canvas-0");
        this.ctx = this.element.getContext('2d');

        let W_internal = this.element.width;
        let H_internal = W_internal;

        this.W = W_internal * RESOLUTION_FACTOR;
        this.H = H_internal * RESOLUTION_FACTOR;

        this.element.width = this.W;
        this.element.height = this.H;
    }
}
