import {Slider} from "../input/inputs.js";

const RESOLUTION_FACTOR = 4;

export class Canvas {

    constructor(zoom_level) {
        this.element = document.getElementById("canvas-0");
        this.ctx = this.element.getContext('2d');

        let W_internal = this.element.width;
        let H_internal = W_internal;

        this.W = W_internal * RESOLUTION_FACTOR;
        this.H = H_internal * RESOLUTION_FACTOR;

        this.element.width = this.W;
        this.element.height = this.H;

        this.zoom_level = zoom_level;

        this._setup_sliders();
    }

    _setup_sliders() {
        var oninput = (value) => {
            this.zoom_level = value;
        };
        new Slider(
            "zoom_slider", {
            oninput: oninput,
            min: 1,
            max: 21,
            step: 0.01,
            value: this.zoom_level,
        });
    }
}
