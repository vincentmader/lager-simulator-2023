import {Renderer} from "../io/output/renderer.js";
import {LagerInputHandler} from "../io/input/input_handler.js";

export class IO {
    constructor(world, canvas) {
        this.renderer = new Renderer(world, canvas);
        this.input_handler = new LagerInputHandler(world, canvas).initialize();
    }
}
