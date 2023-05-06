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
        let person = task.owner;
        let step_size = person.speed * dt;
        let rotation_speed = dt * Math.PI * 0.05;
        let diff = Direction.from_vector(task.target_position.sub(person.position));
        let move_along_x_axis = Math.abs(diff.x) >= step_size;
        let current_movement_direction = new Direction(
            Math.sign(diff.x) * move_along_x_axis,
            Math.sign(diff.y) * (1-move_along_x_axis),
        );
        if (current_movement_direction.length() > step_size) {
            person.direction = current_movement_direction.discretize();
        }

        let rotation_difference = person.direction - person.rotation;
        // Handle case when transitioning beyond 2*Math.PI.
        if (Math.abs(rotation_difference) >= Math.PI) {
            rotation_difference += -Math.sign(rotation_difference) * 2*Math.PI;
        }
        person.rotation += Math.sign(rotation_difference) * rotation_speed;
        if (Math.abs(rotation_difference) < rotation_speed) {
            person.rotation = person.direction;
        }

        let stride = new Position(
            current_movement_direction.x * step_size,
            current_movement_direction.y * step_size,
        );
        let future_position = new Position(
            person.position.x + stride.x,
            person.position.y + stride.y
        );
        let collision = false;
        this.collision_detector.get_neighbouring_cells(person.position).forEach((cell) => {
            let relevant_entities = cell._entities.filter((obj) => obj !== person);
            if (person.bounding_box.overlaps_towards_direction(relevant_entities.map(e => e.bounding_box), stride)) {
                collision = true;
            }
        });

        if (!collision
            && this.world.floor_grid.boundary.contains(future_position)) {
            // Math.sqrt(2) since both axes may have an offset of < step-size due to smooth movement.
            if (diff.length() >= Math.sqrt(2) * step_size) {
                person.move(future_position);
                this.collision_detector.update_cells(person);
                return true;
            } else {
                person.move(task.target_position);
                person.rotation = person.direction;
            }
        }
        person.move(new Position(
            Math.round(person.position.x), 
            Math.round(person.position.y)
        ));
        person.rotation = person.direction;
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
