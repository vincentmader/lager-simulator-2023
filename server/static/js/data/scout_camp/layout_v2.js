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


export const initialize_list_of_tents = () => {
    return [
        new WeissZelt_1(new Position(4, 10), "west"),
        new WeissZelt_1(new Position(3, 14), "west"),
        new WeissZelt_1(new Position(-4, 16), "south"),
        new WeissZelt_1(new Position(-8, 16), "south"),
        new WeissZelt_1(new Position(-15, 0), "east"),
        new WeissZelt_1(new Position(-15, 5), "east"),
        new WeissZelt_1(new Position(-15, 10), "east"),
        new WeissZelt_1(new Position(0, -13), "north"),
        new WeissZelt_1(new Position(-5, -13), "north"),
        new WeissZelt_1(new Position(-14, -6), "north"),
        new Jurte_1(new Position(7, 0), "west"),
        new Jurte_2(new Position(12, -1), "east"),
        new Jurte_2(new Position(5, 5), "east"),
    ];
}


export const initialize_list_of_people = () => {
    return [
        new Leiter(new Position(2, -5), "north"),
        new Leiter(new Position(-2, -3), "west"),
        new Leiter(new Position(-2, -4), "west"),
        new Rover(new Position(-3, -5), "west"),
        new Rover(new Position(-4, -7), "north"),
        new Rover(new Position(-5, -7), "north"),
        new Pfadi(new Position(-6, -7), "north"),
        new Pfadi(new Position(-7, -7), "north"),
        new Woelfling(new Position(-8, 13), "north"),
        new Woelfling(new Position(-5, 10), "west"),
        new Woelfling(new Position(-5, 9), "south"),
        new Jupfi(new Position(-8, 0), "south"),
        new Jupfi(new Position(-7, 0), "south"),
        new Jupfi(new Position(-10, -4), "east"),
    ];
}


export const initialize_list_of_campfires = () => {
    return [
        new Lagerfeuer(new Position(-6, -4)),
    ];

}


export const initialize_list_of_dixies = () => {
    return [
        new Dixi(new Position(14, -8), "west"),
        new Dixi(new Position(14, -10), "west"),
    ];
}


export const initialize_list_of_waschstellen = () => {
    return [
        new WaschStelle(new Position(10, -7), "west"),
        new WaschStelle(new Position(10, -9), "west"),
        new WaschStelle(new Position(10, -11), "east"),
    ]
}

export const initialize_list_of_bierbaenke = () => {
    return [
        new BierBank(new Position(-2, 8), "east"),
        new BierBank(new Position(-2, 4), "east"),
        new BierBank(new Position(-4, 8), "east"),
        new BierBank(new Position(-4, 4), "east"),
        new BierBank(new Position(-7, 8), "east"),
        new BierBank(new Position(-7, 4), "east"),
        new BierBank(new Position(-9, 8), "east"),
        new BierBank(new Position(-9, 4), "east"),
        new BierBank(new Position(-1, -4), "west"),
        new BierBank(new Position(-4, -9), "north"),
        new BierBank(new Position(-9, -9), "north"),
    ];
}


export const initialize_list_of_biertische = () => {
    return [
        new BierTisch(new Position(-3, 8), "east"),
        new BierTisch(new Position(-3, 4), "east"),
        new BierTisch(new Position(-8, 8), "east"),
        new BierTisch(new Position(-8, 4), "east"),
    ];
}


export const initialize_list_of_banners = () => {
    return [
        new BannerMast(new Position(0, 0), "south"),
    ];
}


export const initialize_list_of_bierkaesten = () => {
    return [
        new BierKasten(new Position(8, -4), "east"),
        new BierKasten(new Position(7, -4), "north"),
        new BierKasten(new Position(6, -4), "east"),
        new BierKasten(new Position(1, -2), "east"),
        new BierKasten(new Position(1, -3), "north"),
        new BierKasten(new Position(1, -4), "north"),
        new BierKasten(new Position(2, -2), "east"),
        new BierKasten(new Position(2, -3), "east"),
    ];
}
