import {ButtonPane} from "./user_interface.js";
import {MoveTask} from "../../data/tasks.js";

export class UserInputHandler {

    constructor(game_display, input_handler) {
        this.game_display = game_display;
        this.input_handler = input_handler;
        this.panes = [];
    }

    initialize() {
        this.panes.forEach((pane) => {
            pane.clear();
        });
        this.panes = [];
        let screen_height = this.game_display.height;
        let screen_width = this.game_display.width;
        let button_width = Math.min(screen_width*0.1, 100);
        let command_pane = new ButtonPane(
            screen_width-((2 + 0.2)*button_width), 
            screen_height*0.5, 
            2, 
            5, 
            Math.min(screen_width*0.1, 100));
        command_pane.add(() => {this.input_handler.current_task = MoveTask});
        command_pane.add(() => {console.log("1")});
        command_pane.add(() => {console.log("2")});
        command_pane.add(() => {console.log("3")});
        command_pane.add(() => {console.log("4")});
        command_pane.add(() => {console.log("5")});
        command_pane.visible(false);

        this.panes.push(command_pane);

        let inventory_pane = new ButtonPane(
            screen_width*0.2, 
            screen_height*0.9, 
            6, 
            1, 
            Math.min(screen_width*0.1, 100));
        inventory_pane.add(() => {console.log("0")});
        inventory_pane.add(() => {console.log("1")});
        inventory_pane.add(() => {console.log("2")});
        inventory_pane.add(() => {console.log("3")});
        inventory_pane.add(() => {console.log("4")});
        inventory_pane.add(() => {console.log("5")});
        inventory_pane.visible(false);

        this.panes.push(inventory_pane);
    }

    visible(is_visible) {
        this.panes.forEach((pane) => {
            pane.visible(is_visible);
        })
    }
}
