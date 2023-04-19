import {Position} from "./position.js";
import {Rectangle} from "./rectangle.js";


export const create_rectangles = () => {
    let N = 10;
    let W = 30,
        H = 30;
    let rectangles = [];
    for (let idx = 0; idx < N; idx++) {
        for (let jdx = 0; jdx < N; jdx++) {
            let position = new Position(idx * W, jdx * H);
            let rect = new Rectangle(position, [W, H]);
            rectangles.push(rect);
        }
    }
    return rectangles;
};
