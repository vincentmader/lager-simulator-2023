class Item {
    constructor(icon_texture, ingame_texture) {
        this.icon_texture = icon_texture;
        this.ingame_texture = ingame_texture;
    }
}


export class Knife extends Item {
    constructor() {
        super("/img/sprites/items/knife.png", "/img/sprites/items/knife.png");
    }
}


