import {MoveTask, IdleTask} from "../data/tasks.js";
import {CollisionDetector} from "./collision.js"
import {Position} from "../math/vector.js";


var dt = 1; // TODO
var idle_task = new IdleTask();


export class TaskExecutor {

    constructor(world) {
        this.world = world;
        this.collision_detector = new CollisionDetector(this.world);
    }

    execute_move(task) {
        let person = task.owner
        let dx = task.target_position.x - person.position.x; // TODO Define `Vector` class.
        let dy = task.target_position.y - person.position.y;
        let distance = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5)
        let ux = dx / distance;
        let uy = dy / distance;
        let future_position = new Position(person.position.x + person.speed * ux * dt,
            person.position.y + person.speed * uy * dt);

        let collision = false;
        this.collision_detector.get_neighbouring_cells(person.position).forEach((cell) => {
            cell._entities.forEach((neighbour) => {
                if (neighbour.bounding_box !== undefined
                    && neighbour.bounding_box.contains(future_position)) {
                    collision = true;
                    return;
                }
            });
            if (collision) {
                return;
            }
        });

        if (!collision 
            && distance >= person.speed * dt
            && this.world.floor_grid.boundary.contains(future_position)) {
            person.position = future_position;
            person.bounding_box.position = future_position;
            person.bounding_box.corners = person.bounding_box._corners();
            this.collision_detector.update_cells(person);
            return true;
        }
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
