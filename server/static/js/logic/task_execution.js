import {MoveTask, IdleTask, PatrolTask} from "../data/tasks.js";
import {CollisionDetector} from "./collision.js"
import {XFirstMovementPlanningStrategy} from "./movement.js"
import {Direction, Position, Vector} from "../math/vector.js";


var dt = 1; // TODO
var idle_task = new IdleTask();


export class TaskExecutor {

    constructor(world) {
        this.world = world;
        this.collision_detector = new CollisionDetector(this.world);
        this.movement_planning_strategy = new XFirstMovementPlanningStrategy(world, this.collision_detector);
    }

    execute_move(task) {
        let person = task.owner;
        let rotation_speed = dt * Math.PI * 0.05;

        this.handle_rotation(person, rotation_speed);

        // Obstacle Avoidance
        let step_size = person.speed * dt;
        let [movement_finished, future_position] = this.movement_planning_strategy.execute(person, task.target_position, step_size)
        let current_movement_direction = Direction.from_vector(future_position.sub(person.position)).scale(1 / step_size);
        try {
            person.direction = current_movement_direction.discretize();
        } catch (Error) {} // Do not change direction when stopping (current_movement_direction == 0)
        person.move(future_position);
        this.collision_detector.update_cells(person);

        return movement_finished;
    }

    handle_rotation(person, rotation_speed) {
        // Rotation handling
        let rotation_difference = person.direction - person.rotation
        // Handle case when transitioning beyond 2*Math.PI
        if (Math.abs(rotation_difference) >= Math.PI) {
            rotation_difference += -Math.sign(rotation_difference) * 2 * Math.PI;
        }
        person.rotation += Math.sign(rotation_difference) * rotation_speed;
        if (Math.abs(rotation_difference) < rotation_speed) {
            person.rotation = person.direction;
        }
    }

    execute(task) {
        switch (task.constructor) {
            case IdleTask:
                return false;
            case MoveTask:
                return this.execute_move(task);
            case PatrolTask:
                // Loop patrol points.
                let patrol_towards_next_point = this.execute_move(task);
                if (!patrol_towards_next_point) {
                    task.owner.task_list.circular_shift();
                }
                return false;
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
