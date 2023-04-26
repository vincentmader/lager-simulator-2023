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

export class Game {

    constructor() {
        let person_1 = new Woelfling(new Position(-1, 3));
        let person_2 = new Jupfi(new Position(-2, -3));
        let person_3 = new Pfadi(new Position(4, 3));
        let person_4 = new Rover(new Position(-4, -3));
        let person_5 = new Leiter(new Position(2, -3));
        let people = [person_1, person_2, person_3, person_4, person_5];

        let leiter_jurte = new LeiterJurte(new Position(7, 6));
        let rover_zelt = new RoverZelt(new Position(-5, 3));
        let tents = [leiter_jurte, rover_zelt];

        let campfire_1 = new Lagerfeuer(new Position(0, 0));
        let campfire_2 = new Lagerfeuer(new Position(50, 40));
        let campfires = [campfire_1, campfire_2];
        //                           ^ added for testing -> TODO Fix flames, not drawn at the moment!

        let trees = test_create_random_tree_distribution();
        //                ^ TODO Rename/Move this function.

        this.world = new World(people, tents, trees, campfires);
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
        this.io.renderer.game_display.frame_idx += 1;
    }

    run() {
        window.setInterval(() => {
            this.forward();
            this.io.renderer.display();
        }, 1000 / 60);
    }
}

const test_create_random_tree_distribution = () => {
    const NR_OF_TREES = 200;
    let trees = [];
    for (let idx = 0; idx < NR_OF_TREES; idx++) {
        // Choose position randomly (in polar coordinates).
        let [r_min, r_max] = [20, 50];
        let r = r_min + Math.random() * (r_max - r_min),
            phi = Math.random() * 2 * Math.PI;
        // Convert to cartesian coordinates.
        let x = r * Math.cos(phi),
            y = r * Math.sin(phi);
        let position = new Position(Math.round(x), Math.round(y));
        // Get random tree texture.
        let texture_idx = random_randint(1, 10);
        let texture = "/img/sprites/structures/trees/tree_" + texture_idx + ".png";
        // Push tree to array.
        let tree = new Tree(position, texture);
        trees.push(tree);
    }
    trees = trees.sort((tree_a, tree_b) => {
        return (tree_a.position.x+tree_a.position.y) - (tree_b.position.x+tree_b.position.y);
    });
    // TODO Only use free tiles for a tree, a tree takes up 3x3 tiles. => No overlapping trees
    return trees;
};
