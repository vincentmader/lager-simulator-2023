import {ButtonPane} from "./inputs.js";
import {MoveTask, PatrolTask} from "../../data/tasks.js";


export class UIHandler {

    constructor() {
        this.active_ui = null;
    }
    
    set_active(ui) {
        this.active_ui = ui;
    }

    get_active() {
        return this.active_ui;
    }
}


class UserInterface {

    constructor(game_display) {
        this.game_display = game_display;
        this.panes = {};
        this.is_visible = false;
    }

    initialize() {}

    visible(is_visible) {
        this.is_visible = is_visible;
        for(let type in this.panes) {
            this.panes[type].visible(is_visible);
        }
    }
}


export class PersonUserInterface extends UserInterface {

    constructor(game_display, active_entity) {
        super(game_display);
        this.active_entity = active_entity;
    }

    initialize() {
        for(let type in this.panes) {
            this.panes[type].clear();
        }
        let screen_height = this.game_display.height;
        let screen_width = this.game_display.width;
        let button_size = Math.min(screen_width*0.1, 100);
        this.panes["command"] = new ButtonPane(
            screen_width-button_size*2, 
            screen_height*0.5-button_size, 
            2, 
            3, 
            button_size,
            button_size,
            0
        );
        this.panes["command"].add(() => {this.overwrite_command(MoveTask)}, "/img/move_icon.png");
        this.panes["command"].add(() => {this.overwrite_command(PatrolTask)}, "/img/patrol_icon.png");
        this.panes["command"].add(() => {console.log("command 2")});
        this.panes["command"].add(() => {console.log("command 3")});
        this.panes["command"].add(() => {console.log("command 4")});
        this.panes["command"].add(() => {console.log("command 5")});

        this.panes["inventory"] = new ButtonPane(
            screen_width/2-3*button_size, 
            screen_height-button_size, 
            6, 
            1, 
            button_size,
            button_size,
            0
        );
        this.panes["inventory"].add(() => {console.log("item 0")});
        this.panes["inventory"].add(() => {console.log("item 1")});
        this.panes["inventory"].add(() => {console.log("item 2")});
        this.panes["inventory"].add(() => {console.log("item 3")});
        this.panes["inventory"].add(() => {console.log("item 4")});
        this.panes["inventory"].add(() => {console.log("item 5")});

        this.visible(this.is_visible, this.active_entity["person"]);
    }

    overwrite_command(task_cls) {
        // Reset task list of active person.
        this.active_entity["person"].task_list.reset();
        // Assign new task.
        this.active_entity["task"] = task_cls;
    }

    visible(is_visible, context_person=null) {
        super.visible(is_visible);
        if (is_visible && context_person !== null) {
            this.draw_inventory(context_person)
        }
    }

    draw_inventory(context_person) {
        let items = context_person.inventory.items;
        console.log(items)
        let buttons = this.panes["inventory"].buttons
        for(let index in buttons) {
            let button = buttons[index]
            if (items[index] !== undefined) {
                button.set_icon(items[index].icon_texture);
            } else {
                button.set_icon(null);
            }
        }
    }
}
