import {Renderer} from "../io/output/renderer.js";
import {LagerInputHandler} from "../io/input/input_handler.js";

export class IO {
    constructor(world, game_display) {
        this.renderer = new Renderer(world, game_display);
        this.input_handler = new LagerInputHandler(world, game_display).initialize();
    }
}
