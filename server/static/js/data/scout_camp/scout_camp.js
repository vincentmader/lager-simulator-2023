import {Woelfling, Jupfi, Pfadi, Rover, Leiter} from "../entities/person.js";
import {Position} from "../../math/vector.js";
import {
    BannerMast,
    BierBank,
    BierKasten,
    BierTisch,
    Dixi,
    Jurte_1,
    Jurte_2,
    Lagerfeuer,
    WaschStelle,
    WeissZelt_1,
    WeissZelt_2,
} from "../entities/structures.js";


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
        this.bierkaesten = initialize_list_of_bierkaesten();
        this.banners = initialize_list_of_banners();

        this.textured_structures = this._textured_structures();
        this.structures = this._structures();
        for (let s of this.structures) {
            s.position = s.position.add(position);
            s.bounding_box = s.bounding_box.move(position);
        }
    }

    _textured_structures() {
        let textured_structures = [].concat(
            this.banners,
            this.bierbaenke,
            this.bierkaesten,
            this.biertische,
            this.dixies,
            this.tents,
            this.waschstellen,
        );
        textured_structures = textured_structures.sort((structure_b, structure_a) => {
            return (structure_a.position.x + structure_a.position.y) - (structure_b.position.x + structure_b.position.y);
        });
        return textured_structures;
    }

    _structures() {
        let structures = [].concat(
            this._textured_structures(),
            this.campfires,
        );
        structures = structures.sort((structure_b, structure_a) => {
            return (structure_a.position.x + structure_a.position.y) - (structure_b.position.x + structure_b.position.y);
        });
        return structures;
    }
}

const initialize_list_of_tents = () => {
    return [
        new WeissZelt_2(new Position(-11, 9), "west"),
        new WeissZelt_2(new Position(-12, 4), "west"),
        new WeissZelt_2(new Position(-12, -1), "west"),
        new WeissZelt_1(new Position(10, 9), "north"),
        new WeissZelt_1(new Position(14, 6), "north"),
        new WeissZelt_1(new Position(-12, -9), "west"),
        new WeissZelt_1(new Position(-8, -9), "west"),
        new Jurte_1(new Position(-2, 13), "north"),
        new Jurte_2(new Position(-7, 16), "north"),
        new Jurte_2(new Position(4, 13), "north"),
        new Jurte_2(new Position(10, -10), "north"),
        new Jurte_1(new Position(0, -12), "north"),
    ];
}

const initialize_list_of_people = () => {
    return [
        new Woelfling(new Position(2, 5), "south"),
        new Woelfling(new Position(1, 5), "south"),
        new Woelfling(new Position(-1, 5), "south"),
        new Jupfi(new Position(0, 5), "south"),
        new Pfadi(new Position(5, 0), "west"),
        new Pfadi(new Position(5, 1), "west"),
        new Rover(new Position(5, 2), "west"),
        new Leiter(new Position(5, -1), "west"),
        new Leiter(new Position(-5, 0), "east"),
        new Leiter(new Position(-5, 1), "east"),
    ];
}

const initialize_list_of_campfires = () => {
    let campfire_1 = new Lagerfeuer(new Position(0, 0));
    let campfires = [campfire_1];
    return campfires;

}

const initialize_list_of_dixies = () => {
    return [
        new Dixi(new Position(17, -1), "west"),
        new Dixi(new Position(17, -3), "west"),
        new Dixi(new Position(17, -5), "west"),
        new Dixi(new Position(15, 0), "south"),
        new Dixi(new Position(13, 0), "south"),
    ];
}

const initialize_list_of_waschstellen = () => {
    return [
        new WaschStelle(new Position(14, -3), "north"),
        new WaschStelle(new Position(11, -3), "south"),
    ]
}

const initialize_list_of_bierbaenke = () => {
    return [
        new BierBank(new Position(4, 7), "east"),
        new BierBank(new Position(4, 9), "east"),
        new BierBank(new Position(9, 0), "north"),
        new BierBank(new Position(7, 0), "north"),
        // new BierBank(new Position(5, 0), "north"),
        // new BierBank(new Position(0, 5), "east"),
    ];
}

const initialize_list_of_biertische = () => {
    return [
        new BierTisch(new Position(4, 8), "east"),
        new BierTisch(new Position(8, 0), "north"),
    ];
}

const initialize_list_of_banners = () => {
    return [
        new BannerMast(new Position(6, 4), "north"),
    ];
}

const initialize_list_of_bierkaesten = () => {
    return [
        new BierKasten(new Position(-8, -2), "east"),
        new BierKasten(new Position(-8, -1), "east"),
        new BierKasten(new Position(-8, +0), "east"),
        new BierKasten(new Position(-8, +2), "north"),
        new BierKasten(new Position(-8, +3), "north"),
        new BierKasten(new Position(-8, +4), "north"),
        new BierKasten(new Position(-7, -2), "east"),
        new BierKasten(new Position(-7, -1), "east"),
        new BierKasten(new Position(-7, +0), "east"),
        new BierKasten(new Position(-7, +2), "north"),
        new BierKasten(new Position(-7, +3), "north"),
        new BierKasten(new Position(-7, +4), "north"),
    ];
}
