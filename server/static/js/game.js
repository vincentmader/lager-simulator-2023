import {World} from "./data/world.js";
import {Woelfling, Jupfi, Pfadi, Rover, Leiter} from "./data/entities/person.js";
import {GameDisplay} from "./io/output/game_display.js";
import {TaskExecutor} from "./logic/task_list.js";
import {Position} from "./math/vector.js";
import {run_tests} from "./tests/main.js";
import {random_randint} from "./math/random.js";
import {IO} from "./io/io.js";
import {RoverZelt, LeiterJurte, Lagerfeuer, Tree} from "./data/entities/structures.js";

const INITIAL_ZOOM_LEVEL = 20;
const WORLD_DIMENSIONS = [128, 128]; // TODO Make dynamic?


export class Game {

    constructor() {
        // These two values will be updated every loop.
        this.time_at_start_of_iteration = new Date();
        this.dt = 0;

        // Define entities.
        let tents = initialize_list_of_tents();
        let people = initialize_list_of_people();
        let campfires = initialize_list_of_campfires();
        let trees = initialize_list_of_trees(WORLD_DIMENSIONS);

        this.world = new World(WORLD_DIMENSIONS, people, tents, trees, campfires);
        this.game_display = new GameDisplay(INITIAL_ZOOM_LEVEL); // <- TODO Use `let game_display` here instead?
        this.io = new IO(this.world, this.game_display);
        this.task_executor = new TaskExecutor(this.world);

        run_tests(this.io);
    }

    forward() {
        let display_origin = this.io.renderer.game_display.display_origin,
            camera_velocity = this.io.renderer.game_display.camera_velocity;
        this.io.renderer.game_display.display_origin = display_origin.add(camera_velocity);
        this.io.renderer.game_display.camera_velocity = camera_velocity.mul(0.9);

        this.world.people.forEach((person) => {
            let task = person.task_list.peek();
            if (!this.task_executor.execute(task)) {
                person.task_list.shift();
            }
        });
        this.io.renderer.game_display.dt = this.dt;

        // Calculate temporal difference between start & end of iteration.
        let time_at_end_of_iteration = new Date();
        this.dt = (time_at_end_of_iteration - this.time_at_start_of_iteration) / 1000;
        this.time_at_start_of_iteration = time_at_end_of_iteration;
    }

    run() {
        window.setInterval(() => {
            this.forward();
            this.io.renderer.display();
        }, 1000 / 60);
    }
}

const initialize_list_of_trees = (world_dimensions) => {
    const NR_OF_TREES = 500;
    const MINIMUM_DISTANCE_FROM_WORLD_ORIGIN = 20;
    let trees = [];
    for (let idx = 0; idx < NR_OF_TREES; idx++) {
        // Choose position randomly.
        let x = (2 * Math.random() - 1) * (world_dimensions[0] / 2 - 1);
        let y = (2 * Math.random() - 1) * (world_dimensions[1] / 2 - 1);
        let position = new Position(x, y).round();
        // Check if position is inside the "Lagerplatz"
        let r = position.abs();
        if (r < MINIMUM_DISTANCE_FROM_WORLD_ORIGIN) {continue;}
        // Get random tree texture.
        let texture_idx = random_randint(1, 6);
        let texture = "/img/sprites/structures/trees/tree_" + texture_idx + ".png";
        // Push tree to `trees` array.
        trees.push(new Tree(position, texture));
    }
    trees = trees.sort((tree_a, tree_b) => {
        return (tree_a.position.x + tree_a.position.y) - (tree_b.position.x + tree_b.position.y);
    });
    // TODO Only use free tiles for a tree, a tree takes up 3x3 tiles. => No overlapping trees
    return trees;
};

const initialize_list_of_tents = () => {
    // TODO Rename classes: `RoverZelt` -> name of actual tent. (Jurte, GJ, "WeissZelt1", ...)
    let woelflings_zelt = new RoverZelt(new Position(-10, 8));
    let jupfi_zelt = new RoverZelt(new Position(-11, 3));
    let pfadi_zelt = new RoverZelt(new Position(-10, -2));
    let rover_zelt = new LeiterJurte(new Position(-3, -10));
    let leiter_jurte = new LeiterJurte(new Position(3, -9));
    let tents = [woelflings_zelt, jupfi_zelt, pfadi_zelt, rover_zelt, leiter_jurte];
    tents = tents.sort((tent_a, tent_b) => {
        return (tent_a.position.x + tent_a.position.y) - (tent_b.position.x + tent_b.position.y);
    });
    return tents;
}

const initialize_list_of_people = () => {
    let w1 = new Woelfling(new Position(2, 5));
    let w2 = new Woelfling(new Position(1, 5));
    let w3 = new Woelfling(new Position(-1, 5));
    let j1 = new Jupfi(new Position(0, 5));
    let p1 = new Pfadi(new Position(5, 0));
    let p2 = new Pfadi(new Position(5, 1));
    let r1 = new Rover(new Position(5, 2));
    let l1 = new Leiter(new Position(5, -1));
    let l2 = new Leiter(new Position(-5, 0));
    let l3 = new Leiter(new Position(-5, 1));
    let people = [w1, w2, w3, j1, p1, p2, r1, l1, l2, l3];
    return people;
}

const initialize_list_of_campfires = () => {
    let campfire_1 = new Lagerfeuer(new Position(0, 0));
    let campfire_2 = new Lagerfeuer(new Position(50, 40));
    let campfires = [campfire_1, campfire_2];
    return campfires;

}
