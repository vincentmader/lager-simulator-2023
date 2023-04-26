import {MoveTask, IdleTask} from "../data/tasks.js";
import {CollisionDetector} from "./collision.js"
import {Position} from "../math/vector.js";


var dt = 0.1; // TODO
var idle_task = new IdleTask();


export class TaskExecutor {

    constructor(world) {
        this.world = world;
        this.collision_detector = new CollisionDetector(this.world);
    }

    execute_move(task) {
        let person = task.owner
        let diff = task.target_position.sub(person.position);
        let distance = Math.abs(diff.x) + Math.abs(diff.y);
        let dd = null;
        if (Math.abs(diff.x) > Math.abs(diff.y)) {
            dd = new Position(1, 0);
        } else {
            dd = new Position(0, 1);
        }
        let discrete_diff = null;
        if (Math.abs(diff.x) >= 1) {
            discrete_diff = dd
        }
        let discrete_diff = new Position(
            (Math.abs(diff.x) > Math.abs(diff.y)) * Math.sign(diff.x),
            (Math.abs(diff.x < Math.abs(diff.y))) * Math.sign(diff.y)
        );
        // let distance = Math.abs(diff.x) + Math.abs(diff.y)
        let direction = new Position(
            person.speed * discrete_diff.x * dt,
            person.speed * discrete_diff.y * dt
        );
        let future_position = new Position(person.position.x + direction.x,
            person.position.y + direction.y);

        let collision = false;
        this.collision_detector.get_neighbouring_cells(person.position).forEach((cell) => {
            let relevant_entities = cell._entities.filter((obj) => obj !== person);
            if (person.bounding_box.overlaps_towards_direction(relevant_entities.map(e => e.bounding_box), direction)) {
                collision = true;
            }
        });

        if (!collision
            && this.world.floor_grid.boundary.contains(future_position)) {
            if (distance >= person.speed * dt) {
                person.move(future_position);
                this.collision_detector.update_cells(person);
                return true;
            } else {
                person.move(task.target_position);
            }
        }
        person.move(new Position(
            Math.round(person.position.x), 
            Math.round(person.position.y)
        ));
        return false;
    }

    execute(task) {
        switch (task.constructor) {
            case IdleTask:
                return true;
            case MoveTask:
                return this.execute_move(task);
        }
    }
}


export class TaskList {

    constructor(owner, entries) {
        this.owner = owner
        this._entries = entries;
    }

    push(task) {
        task.owner = this.owner
        this._entries.push(task)
    }

    peek() {
        if (this.is_executable()) {
            return this._entries[0]
        } else {
            return idle_task
        }
    }

    shift() {
        this._entries.shift()
    }

    circular_shift() {
        this._entries.push(this._entries.shift())
    }

    is_executable() {
        return this._entries.length > 0
    }
}
