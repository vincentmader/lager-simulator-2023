import {GameDisplay} from "./io/output/game_display.js";
import {IO} from "./io/io.js";
import {TaskExecutor} from "./logic/task_execution.js";
import {World} from "./data/world.js";
import {ScoutCamp} from "./data/scout_camp/scout_camp.js";
import {random_randint} from "./math/random.js";
import {run_tests} from "./tests/main.js";
import {Position} from "./math/vector.js";
import {Tree} from "./data/entities/structures.js";

const INITIAL_ZOOM_LEVEL = 20;
const WORLD_DIMENSIONS = [128, 128]; // TODO Make dynamic?


export class Game {

    constructor() {
        // These two values will be updated every loop.
        this.time_at_start_of_iteration = new Date();
        this.dt = 0;

        let scout_camp = new ScoutCamp(new Position(0, 0));
        let scout_camps = [scout_camp];

        let trees = initialize_list_of_trees(WORLD_DIMENSIONS);

        this.world = new World(WORLD_DIMENSIONS, trees, scout_camps);
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
            let task_finished = this.task_executor.execute(task);
            if (task_finished) {
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
    const MINIMUM_DISTANCE_FROM_WORLD_ORIGIN = 22;
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
