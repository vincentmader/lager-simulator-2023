import {Direction, Position} from "../math/vector.js";

class MovementPlanningStrategy {

    constructor(world, collision_detector) {
        this.world = world;
        this.collision_detector = collision_detector;
    }

    /**
    * Returns [movement_is_finished, future_position].
    */
    execute(person, target_position, step_size) {
        throw new Error("Movement Planning Strategy not implemented.");
    }
}


export class XFirstMovementPlanningStrategy extends MovementPlanningStrategy {

    constructor(world, collision_detector) {
        super(world, collision_detector);
    }

    execute(person, target_position, step_size) {
        let diff = Direction.from_vector(target_position.sub(person.position));
        // Always move along x axis first.
        let move_along_x_axis = Math.abs(diff.x) >= step_size;
        let current_movement_direction = new Direction(
            Math.sign(diff.x) * move_along_x_axis,
            Math.sign(diff.y) * (1 - move_along_x_axis),
        );
        let stride = current_movement_direction.scale(step_size);
        let collision = false;
        this.collision_detector.get_neighbouring_cells(person.position).forEach((cell) => {
            let relevant_entities = cell._entities.filter((obj) => obj !== person);
            if (person.bounding_box.overlaps_towards_direction(relevant_entities.map(e => e.bounding_box), stride)) {
                collision = true;
            }
        });

        let future_position = person.position.add(stride);
        let movement_finished = false;
        if (collision
            || !this.world.floor_grid.boundary.contains(future_position)
            || diff.length() < Math.sqrt(2) * step_size) {
            future_position = new Position(
                Math.round(person.position.x),
                Math.round(person.position.y),
            );
            movement_finished = true;
        }
        return [movement_finished, future_position];
    }
}
