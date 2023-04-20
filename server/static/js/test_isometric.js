import {Position} from "./position.js";
import {Rectangle} from "./rectangle.js";


export const create_rectangles = (world) => {
    let N = 100;
    let W = 1,
        H = 1;
    let rectangles = [];
    for (let idx = 0; idx < N; idx++) {
        for (let jdx = 0; jdx < N; jdx++) {
            let x = idx * W - N * W / 2;
            let y = jdx * H - N * H / 2;
            let position = new Position(x, y);
            let rect = new Rectangle(position, [W, H]);
            rectangles.push(rect);
        }
    }
    return rectangles;
};
