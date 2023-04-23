export class CollisionDetector {

    constructor(world, granularity=10) {
        this.world = world;
        this.granularity = granularity;
        this.cells = new Array(this.granularity * this.granularity);
        for (let i = 0; i < this.granularity * this.granularity; i++) {
            this.cells[i] = new Cell();
        }
        this.world.structures.forEach((structure) => {
            this.update_cells(structure)
        });
        // this.update_cells(this.world.fire)
    }

    update_cells(entity) {
        let cell_coords = this.cell_coordinates(entity.position);
        let expected_cell = this.cells[this.cell_index(cell_coords[0], cell_coords[1])];
        if (!expected_cell.contains(entity)) {
            let neighbour_cells = this.get_neighbouring_cells(entity.position);
            neighbour_cells.forEach((cell) => {
                if (cell.contains(entity)) {
                    cell.remove(entity);
                    return;
                }
            });
            expected_cell.add(entity);
        }
    }

    get_neighbouring_cells(position) {
        let cell_coords = this.cell_coordinates(position);
        let cell_x = cell_coords[0],
            cell_y = cell_coords[1];
        let neighbouring_cells = [];
        [cell_x-1, cell_x, cell_x+1].forEach((x) => {
            [cell_y-1, cell_y, cell_y+1].forEach((y) => {
                if (this.in_bounds(x) && this.in_bounds(y)) {
                    neighbouring_cells.push(this.cells[this.cell_index(x, y)])
                }
            });
        });
        return neighbouring_cells;
    }

    cell_coordinates(position) {
        let cell_x = Math.floor((position.x + this.world.dimensions[0]/2)/(this.world.dimensions[0]/this.granularity));
        let cell_y = Math.floor((position.y + this.world.dimensions[1]/2)/(this.world.dimensions[1]/this.granularity));
        return [cell_x, cell_y];
    }

    cell_index(coord_x, coord_y) {
        return coord_x*this.granularity + coord_y;
    }

    in_bounds(cell_coordinate) {
        return cell_coordinate >= 0 && cell_coordinate < this.granularity;
    }
}


export class Cell {

    constructor() {
        this._entities = []
    }

    add(item) {
        this._entities.push(item)
    }

    remove(item) {
        let index = this._entities.indexOf(item);
        if (index > -1) {
            this._entities.splice(index, 1);
        }
    }

    contains(item) {
        return this._entities.indexOf(item) >= 0;
    }
}
