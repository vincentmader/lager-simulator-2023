import {ButtonPane} from "./user_interface.js";
import {MoveTask, PatrolTask} from "../../data/tasks.js";

export class UserInputHandler {

    constructor(game_display, input_handler) {
        this.game_display = game_display;
        this.input_handler = input_handler;
        this.panes = {};
        this.is_visible = false;
    }

    overwrite_command(task_cls) {
        // Reset task list of active person.
        this.input_handler.active_entity["person"].task_list.reset();
        // Assign new task.
        this.input_handler.current_task = task_cls;
    }

    initialize() {
        for(let type in this.panes) {
            this.panes[type].clear();
        }
        let screen_height = this.game_display.height;
        let screen_width = this.game_display.width;
        let button_width = Math.min(screen_width*0.1, 100);
        this.panes["command"] = new ButtonPane(
            screen_width-button_width*2, 
            screen_height*0.5-button_width, 
            2, 
            3, 
            button_width,
            button_width,
            0
        );
        this.panes["command"].add(() => {this.overwrite_command(MoveTask)}, "/img/move_icon.png");
        this.panes["command"].add(() => {this.overwrite_command(PatrolTask)}, "/img/patrol_icon.png");
        this.panes["command"].add(() => {console.log("command 2")});
        this.panes["command"].add(() => {console.log("command 3")});
        this.panes["command"].add(() => {console.log("command 4")});
        this.panes["command"].add(() => {console.log("command 5")});

        this.panes["inventory"] = new ButtonPane(
            screen_width/2-3*button_width, 
            screen_height-button_width, 
            6, 
            1, 
            button_width,
            button_width,
            0
        );
        this.panes["inventory"].add(() => {console.log("item 0")});
        this.panes["inventory"].add(() => {console.log("item 1")});
        this.panes["inventory"].add(() => {console.log("item 2")});
        this.panes["inventory"].add(() => {console.log("item 3")});
        this.panes["inventory"].add(() => {console.log("item 4")});
        this.panes["inventory"].add(() => {console.log("item 5")});

        this.visible(this.is_visible, this.input_handler.active_entity["person"]);
    }

    visible(is_visible, context_person=null) {
        this.is_visible = is_visible;
        for(let type in this.panes) {
            this.panes[type].visible(is_visible);
        }
        if (is_visible && context_person !== null) {
            let items = context_person.inventory.items;
            for (const [index, item] of Object.entries(items)) {
                this.panes["inventory"].buttons[index].set_icon(item.icon_texture);
            }
        }
    }
}
