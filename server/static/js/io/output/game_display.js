import {CheckBox, Slider} from "../input/inputs.js";

const RESOLUTION_FACTOR = 4;

export class GameDisplay {

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
        this.draw_floor_grid = false;
        this.draw_labeled_positions = false;
        this.draw_floor_background = true;
        this.draw_world_boundary = true;

        this._setup_sliders();
        this._setup_checkboxes();
    }

    _setup_sliders() {
        // Setup slider for updating `zoom_level`.
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

    _setup_checkboxes() {
        // Setup checkbox for toggling display of floor background.
        var oninput = (_value) => {
            this.draw_floor_background = !this.draw_floor_background;
        };
        new CheckBox("floor_background_checkbox", {oninput: oninput, checked: true});

        // Setup checkbox for toggling display of `FloorGrid`.
        var oninput = (_value) => {
            this.draw_floor_grid = !this.draw_floor_grid;
        };
        new CheckBox("floor_grid_checkbox", {oninput: oninput});

        // Setup checkbox for toggling display of in-world coordinates.
        var oninput = (_value) => {
            this.draw_labeled_positions = !this.draw_labeled_positions;
        };
        new CheckBox("labeled_positions_checkbox", {oninput: oninput});

        // Setup checkbox for toggling display of in-world coordinates.
        var oninput = (_value) => {
            this.draw_world_boundary = !this.draw_world_boundary;
        };
        new CheckBox("world_boundary_checkbox", {oninput: oninput, checked: true});
    }
}
