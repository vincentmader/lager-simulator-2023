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
    SoundBoks,
    WaschStelle,
    WeissZelt_1,
    WeissZelt_2,
    Cajon,
    DreiSchritteLaufenFeld,
} from "../entities/structures.js";


export const initialize_list_of_tents = () => {
    return [
        new WeissZelt_1(new Position(0, 17), "south"),
        new WeissZelt_1(new Position(-5, 17), "south"),
        new WeissZelt_1(new Position(-10, 16), "south"),
        new WeissZelt_1(new Position(-6, -8), "north"),
        new WeissZelt_1(new Position(-10, -7), "north"),
        new WeissZelt_1(new Position(-14, -6), "north"),
        new WeissZelt_1(new Position(-16, 0), "east"),
        new WeissZelt_1(new Position(-17, 4), "east"),
        new WeissZelt_1(new Position(-16, 8), "east"),
        new Jurte_1(new Position(9, 0), "west"),
        new Jurte_2(new Position(0, -6), "east"),
    ];
}


export const initialize_list_of_people = () => {
    return [
        new Leiter(new Position(-8, 10), "south"),
        new Leiter(new Position(-7, 10), "south"),
        new Leiter(new Position(-6, 10), "south"),
        new Rover(new Position(-5, 10), "south"),
        new Rover(new Position(-4, 10), "south"),
        new Pfadi(new Position(-2, 8), "west"),
        new Pfadi(new Position(-2, 7), "west"),
        new Jupfi(new Position(-2, 6), "west"),
        new Jupfi(new Position(-2, 5), "west"),
        new Pfadi(new Position(-2, 4), "west"),
        new Pfadi(new Position(-4, 2), "north"),
        new Pfadi(new Position(-8, 2), "north"),
        new Woelfling(new Position(-5, 2), "north"),
        new Woelfling(new Position(-6, 2), "north"),
        new Woelfling(new Position(-7, 2), "north"),
        new Leiter(new Position(-9, 6), "east"),
        new Leiter(new Position(-9, 7), "east"),
    ];
}


export const initialize_list_of_campfires = () => {
    return [
        new Lagerfeuer(new Position(-6, 6)),
    ];

}


export const initialize_list_of_dixies = () => {
    return [
        new Dixi(new Position(8, 17), "south"),
        new Dixi(new Position(10, 17), "south"),
        new Dixi(new Position(12, 15), "west"),
    ];
}


export const initialize_list_of_waschstellen = () => {
    return [
        new WaschStelle(new Position(8, 13), "north"),
        new WaschStelle(new Position(5, 13), "south"),
    ]
}

export const initialize_list_of_bierbaenke = () => {
    return [
        new BierBank(new Position(-1, 4), "west"),
        new BierBank(new Position(-1, 9), "west"),
        new BierBank(new Position(-4, 11), "south"),
        new BierBank(new Position(-9, 11), "south"),
        new BierBank(new Position(-11, 3), "east"),
        new BierBank(new Position(-11, 8), "east"),
        new BierBank(new Position(-8, 0), "north"),
        new BierBank(new Position(6, 6), "south"),
        new BierBank(new Position(11, 6), "south"),
        new BierBank(new Position(6, 8), "south"),
        new BierBank(new Position(11, 8), "south"),
    ];
}


export const initialize_list_of_biertische = () => {
    return [
        new BierTisch(new Position(6, 7), "south"),
        new BierTisch(new Position(11, 7), "south"),
    ];
}


export const initialize_list_of_banners = () => {
    return [
        new BannerMast(new Position(0, 0), "east"),
    ];
}

export const initialize_list_of_pofferballfelder = () => {
    return [];
}


export const initialize_list_of_soundbokses = () => {
    return [
        new SoundBoks(new Position(-3, 1), "north"),
    ];
}


export const initialize_list_of_cajons = () => {
    return [
        new Cajon(new Position(-10, 3), "south"),
    ];
}


export const initialize_list_of_dreischrittelaufenfelder = () => {
    return [
        new DreiSchritteLaufenFeld(new Position(11, -9), "south"),
    ];
}


export const initialize_list_of_bierkaesten = () => {
    return [
        new BierKasten(new Position(8, -5), "east"),
        new BierKasten(new Position(8, -6), "east"),
        new BierKasten(new Position(8, -7), "east"),
        new BierKasten(new Position(9, -5), "east"),
        new BierKasten(new Position(9, -6), "east"),
        new BierKasten(new Position(9, -7), "east"),
        new BierKasten(new Position(11, -5), "north"),
        new BierKasten(new Position(12, -5), "north"),
        new BierKasten(new Position(13, -5), "north"),
        new BierKasten(new Position(11, -6), "north"),
        new BierKasten(new Position(12, -6), "north"),
        new BierKasten(new Position(13, -6), "north"),
    ];
}
