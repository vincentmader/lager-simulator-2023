import {MoveTask, IdleTask} from "./tasks.js";


var dt = 1; // TODO
var idle_task = new IdleTask();


export class TaskExecutor {

    constructor(world) {
        this.world = world;
    }

    execute_move(task) {
        let person = task.owner
        let directionX = task.target_position.x - person.position.x; // TODO Define `Vector` class.
        let directionY = task.target_position.y - person.position.y;
        let distance = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2))
        directionX /= distance;
        directionY /= distance;
        person.position.x += person.speed * directionX * dt;
        person.position.y += person.speed * directionY * dt;
        return distance > 1;
    }

    execute(task) {
        switch (task.constructor) {
            case IdleTask:
                return true
            case MoveTask:
                return this.execute_move(task)
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
