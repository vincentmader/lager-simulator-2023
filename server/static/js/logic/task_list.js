import {MoveTask, IdleTask, PatrolTask} from "../data/tasks.js";
import {CollisionDetector} from "./collision.js"
import {Direction, Position, Vector} from "../math/vector.js";


var dt = 1; // TODO
var idle_task = new IdleTask();


export class TaskExecutor {

    constructor(world) {
        this.world = world;
        this.collision_detector = new CollisionDetector(this.world);
    }

    execute_move(task) {
        let person = task.owner
        let step_size = person.speed * dt;
        let diff = Direction.from_vector(task.target_position.sub(person.position));
        let distance = Math.abs(diff.x) + Math.abs(diff.y);
        let move_along_x_axis = Math.abs(diff.x) >= step_size;
        let discrete_diff = new Direction(
            Math.sign(diff.x) * move_along_x_axis,
            Math.sign(diff.y) * (1-move_along_x_axis),
        );
        let target_direction = discrete_diff.to_radian() + Math.PI/4;
        let turn_difference = (target_direction - person.direction);
        person.direction += Math.max(0.1*Math.sign(turn_difference), turn_difference)
        let future_turn_difference = (target_direction - person.direction);
        if (Math.abs(future_turn_difference) > Math.abs(turn_difference)) {
            person.direction = target_direction;
        }

        let direction = new Position(
            discrete_diff.x * step_size,
            discrete_diff.y * step_size,
        );
        let future_position = new Position(
            person.position.x + direction.x,
            person.position.y + direction.y
        );
        let collision = false;
        this.collision_detector.get_neighbouring_cells(person.position).forEach((cell) => {
            let relevant_entities = cell._entities.filter((obj) => obj !== person);
            if (person.bounding_box.overlaps_towards_direction(relevant_entities.map(e => e.bounding_box), direction)) {
                collision = true;
            }
        });

        if (!collision
            && this.world.floor_grid.boundary.contains(future_position)) {
            // Math.sqrt(2) since both axes may have an offset of < step-size due to smooth movement.
            if (distance >= Math.sqrt(2) * step_size) {
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
            case PatrolTask:
                // Loop patrol points.
                let patrol_towards_next_point = this.execute_move(task);
                if (!patrol_towards_next_point) {
                    task.owner.task_list.circular_shift();
                }
                return true;
        }
    }
}


export class TaskList {

    constructor(owner, entries) {
        this.owner = owner;
        this._entries = entries;
    }

    push(task) {
        task.owner = this.owner;
        this._entries.push(task);
    }

    peek() {
        if (this.is_executable()) {
            return this._entries[0];
        } else {
            return idle_task;
        }
    }

    shift() {
        this._entries.shift();
    }

    circular_shift() {
        this._entries.push(this._entries.shift());
    }

    reset() {
        this._entries = [];
    }

    is_executable() {
        return this._entries.length > 0;
    }
}
