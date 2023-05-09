import {Woelfling, Jupfi, Pfadi, Rover, Leiter} from "../entities/person.js";
import {Position} from "../../math/vector.js";
import {Lagerfeuer, Dixi, WeissZelt1, WeissZelt2, Jurte} from "../entities/structures.js";
import {DirectionEnum} from "../../math/vector.js";

export class ScoutCamp {
    constructor(position) {
        this.position = position;

        this.people = initialize_list_of_people();
        for (let p of this.people) {
            p.position = p.position.add(position);
            p.bounding_box = p.bounding_box.move(position);
        }

        this.tents = initialize_list_of_tents();
        this.campfires = initialize_list_of_campfires();
        this.dixies = initialize_list_of_dixies();

        this.structures = this._structures();
        for (let s of this.structures) {
            s.position = s.position.add(position);
            s.bounding_box = s.bounding_box.move(position);
        }
    }

    _structures() {
        return [].concat(
            this.tents,
            this.campfires,
            this.dixies,
        );
    }
}

const initialize_list_of_tents = () => {
    let woelflings_zelt = new WeissZelt2(new Position(-10, 8));
    let jupfi_zelt = new WeissZelt2(new Position(-11, 3));
    let pfadi_zelt = new WeissZelt2(new Position(-10, -2));
    let rover_zelt = new WeissZelt1(new Position(10, 5));
    let geruest_zelt = new WeissZelt1(new Position(-3, -11));
    let kuechen_zelt = new WeissZelt1(new Position(-8, -9));
    let leiter_jurte = new Jurte(new Position(-2, 13));
    let aufenthalts_jurte = new Jurte(new Position(5, 11));
    let party_jurte = new Jurte(new Position(12, -3));
    let tents = [
        woelflings_zelt, jupfi_zelt, pfadi_zelt, rover_zelt,
        geruest_zelt, leiter_jurte, kuechen_zelt, aufenthalts_jurte, party_jurte
    ];
    tents = tents.sort((tent_a, tent_b) => {
        return (tent_a.position.x + tent_a.position.y) - (tent_b.position.x + tent_b.position.y);
    });
    return tents;
}

const initialize_list_of_people = () => {
    let w1 = new Woelfling(new Position(2, 5), DirectionEnum.SOUTH);
    let w2 = new Woelfling(new Position(1, 5), DirectionEnum.SOUTH);
    let w3 = new Woelfling(new Position(-1, 5), DirectionEnum.SOUTH);
    let j1 = new Jupfi(new Position(0, 5), DirectionEnum.SOUTH);
    let p1 = new Pfadi(new Position(5, 0), DirectionEnum.WEST);
    let p2 = new Pfadi(new Position(5, 1), DirectionEnum.WEST);
    let r1 = new Rover(new Position(5, 2), DirectionEnum.WEST);
    let l1 = new Leiter(new Position(5, -1), DirectionEnum.WEST);
    let l2 = new Leiter(new Position(-5, 0), DirectionEnum.EAST);
    let l3 = new Leiter(new Position(-5, 1), DirectionEnum.EAST);
    let people = [w1, w2, w3, j1, p1, p2, r1, l1, l2, l3];
    return people;
}

const initialize_list_of_campfires = () => {
    let campfire_1 = new Lagerfeuer(new Position(0, 0));
    let campfire_2 = new Lagerfeuer(new Position(50, 40));
    let campfires = [campfire_1, campfire_2];
    return campfires;

}

const initialize_list_of_dixies = () => {
    let dixi_1 = new Dixi(new Position(3, -10));
    let dixi_2 = new Dixi(new Position(5, -10));
    let dixi_3 = new Dixi(new Position(7, -10));
    let dixi_4 = new Dixi(new Position(-8, 16));
    let dixi_5 = new Dixi(new Position(-8, 14));
    let dixies = [dixi_1, dixi_2, dixi_3, dixi_4, dixi_5];
    return dixies;

}
