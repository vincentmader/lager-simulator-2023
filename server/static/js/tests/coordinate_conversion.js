import {Position} from "../math/vector.js";

export const test_coordinate_conversions = (io) => {
    let coordinate_transformer = io.renderer.coordinate_transformer;
    let zoom_level = 1;

    test_conversion_between_world_and_canvas_coords(coordinate_transformer, zoom_level);
    test_conversion_between_cartesian_and_isometric_coords(coordinate_transformer, zoom_level);
};

const test_conversion_between_world_and_canvas_coords = (coordinate_transformer, zoom_level) => {
    let x = 100,
        y = 200;
    let a = new Position(x, y);
    let b = coordinate_transformer.world_to_canvas(a, zoom_level);
    let c = coordinate_transformer.canvas_to_world(b, zoom_level);
    let is_working = (a.x == c.x && a.y == c.y);
    console.log("Conversion \"world -> canvas -> world\" is working: ", is_working);
    if (!is_working) {
        console.log(a, c);
    }
};

const test_conversion_between_cartesian_and_isometric_coords = (coordinate_transformer, zoom_level) => {
    let x = 100,
        y = 200;
    let a = new Position(x, y);
    let b = coordinate_transformer.cartesian_to_isometric(a, zoom_level);
    let c = coordinate_transformer.isometric_to_cartesian(b, zoom_level);
    let is_working = (a.x == c.x && a.y == c.y);
    console.log("Conversion \"cart. -> iso. -> cart.\" is working: ", is_working);
    if (!is_working) {
        console.log(a, c);
    }
};
