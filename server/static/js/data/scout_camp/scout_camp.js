import {Woelfling, Jupfi, Pfadi, Rover, Leiter} from "../entities/person.js";
import {Position} from "../../math/vector.js";
import {Lagerfeuer, Dixi, WeissZelt_1, WeissZelt_2, Jurte_1, Jurte_2, WaschStelle, BierBank, BierTisch} from "../entities/structures.js";
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
        this.waschstellen = initialize_list_of_waschstellen();
        this.biertische = initialize_list_of_biertische();
        this.bierbaenke = initialize_list_of_bierbaenke();

        this.textured_structures = this._textured_structures();
        this.structures = this._structures();
        for (let s of this.structures) {
            s.position = s.position.add(position);
            s.bounding_box = s.bounding_box.move(position);
        }
    }

    _textured_structures() {
        return [].concat(
            this.tents,
            this.dixies,
            this.waschstellen,
            this.bierbaenke,
            this.biertische,
        );
    }

    _structures() {
        return [].concat(
            this._textured_structures(),
            this.campfires,
        );
    }
}

const initialize_list_of_tents = () => {
    let woelflings_zelt = new WeissZelt_2(new Position(-11, 9), "north");
    let jupfi_zelt = new WeissZelt_2(new Position(-12, 4), "north");
    let pfadi_zelt = new WeissZelt_2(new Position(-12, -1), "north");
    let rover_zelt_1 = new WeissZelt_1(new Position(9, 8), "east");
    let rover_zelt_2 = new WeissZelt_1(new Position(13, 5), "east");
    let geruest_zelt = new WeissZelt_1(new Position(-12, -9), "south");
    let kuechen_zelt = new WeissZelt_1(new Position(-8, -9), "south");
    let leiter_jurte_1 = new Jurte_1(new Position(-2, 13), "north");
    let leiter_jurte_2 = new Jurte_2(new Position(-7, 16), "north");
    let leiter_jurte_3 = new Jurte_2(new Position(4, 13), "north");
    let aufenthalts_jurte = new Jurte_2(new Position(10, -10), "north");
    let party_jurte = new Jurte_1(new Position(0, -12), "north");
    let tents = [
        woelflings_zelt,
        jupfi_zelt,
        pfadi_zelt,
        rover_zelt_1,
        rover_zelt_2,
        geruest_zelt,
        kuechen_zelt,
        aufenthalts_jurte,
        party_jurte,
        leiter_jurte_1,
        leiter_jurte_2,
        leiter_jurte_3,
    ];
    tents = tents.sort((tent_b, tent_a) => {
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
    let campfires = [campfire_1];
    return campfires;

}

const initialize_list_of_dixies = () => {
    let dixi_1 = new Dixi(new Position(17, -1), "west");
    let dixi_2 = new Dixi(new Position(17, -3), "west");
    let dixi_3 = new Dixi(new Position(17, -5), "west");
    let dixi_4 = new Dixi(new Position(15, 0), "south");
    let dixi_5 = new Dixi(new Position(13, 0), "south");
    let dixies = [dixi_1, dixi_2, dixi_3, dixi_4, dixi_5];
    return dixies;

}

const initialize_list_of_waschstellen = () => {
    let waschstelle_1 = new WaschStelle(new Position(14, -3), "west");
    let waschstelle_2 = new WaschStelle(new Position(12, -3), "east");
    let waschstellen = [waschstelle_1, waschstelle_2];
    return waschstellen;

}

const initialize_list_of_bierbaenke = () => {
    let bierbank_1 = new BierBank(new Position(-1, 6), "north");
    let bierbank_2 = new BierBank(new Position(4, 6), "north");
    let bierbaenke = [bierbank_1, bierbank_2];
    return bierbaenke;

}

const initialize_list_of_biertische = () => {
    let biertisch_1 = new BierTisch(new Position(-1, 8), "north");
    let biertisch_2 = new BierTisch(new Position(4, 8), "north");
    let biertische = [biertisch_1, biertisch_2];
    return biertische;

}
