class InputHandler {
    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
    }
    initialize() {
        let canvas = this.canvas;
        this.canvas.element.addEventListener('click', () => {
            var x = event.pageX - canvas.elementLeft,
                y = event.pageY - canvas.elementTop;
        }, false);
        return this;
    }
}
export class LagerInputHandler extends InputHandler {
    constructor(world, canvas) {
        super(world, canvas);
    }
}
export class UeberfaellerInputHandler extends InputHandler {
    constructor(world, canvas) {
        super(world, canvas);
    }
}

