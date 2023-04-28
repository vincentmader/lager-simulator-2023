/**
 * Define whether Task is executed 
    * - directly after assigning it (INSTANT),
    * - after giving a single input-position (PARAMETER),
    * - or keep executing it after n inputs (SERIES).
    */
export const ExecutionMode = {
    INSTANT: 0,
    SINGLE: 1,
    SERIES: 2
}


class Task {
    constructor(execution_mode, possible_execution_modes) {
        this.owner = null;
        this.execution_mode = execution_mode;
        this.possible_execution_modes = possible_execution_modes;
    }
}


export class MoveTask extends Task {

    /**
    * Task to move from current position towards the `target_position`.
    * Stop after arriving at `target_position`.
    */
    constructor(target_position) {
        super(ExecutionMode.SERIES, [
            ExecutionMode.SERIES
        ]);
        this.target_position = target_position;
    }
}


export class PatrolTask extends Task {

    /**
    * Task to move between `target_position`s.
    * When arriving at a certain `target_position`, move on to the next one in a loop.
    */
    constructor(target_position) {
        super(ExecutionMode.SERIES, [
            ExecutionMode.SERIES
        ]);
        this.target_position = target_position;
    }
}


export class IdleTask extends Task {

    /**
    * Do not do anything, wait for orders.
    */
    constructor() {
        super(ExecutionMode.INSTANT, [ExecutionMode.INSTANT]);
    }
}
