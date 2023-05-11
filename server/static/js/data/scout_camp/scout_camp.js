import * as layout_v1 from "./layout_v1.js";
import * as layout_v2 from "./layout_v2.js";


export class ScoutCamp {

    constructor(position, layout_variant) {
        this.position = position;
        this.initialize_lists_of_structures(layout_variant)
        this.textured_structures = this._textured_structures();
        this.structures = this._structures();
        this.entities = [].concat(this.structures, this.people);
        for (let s of this.entities) {
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
            this.pofferballfelder,
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

    initialize_lists_of_structures(layout_variant) {
        if (layout_variant == "layout_v1") {
            this.banners = layout_v1.initialize_list_of_banners();
            this.bierbaenke = layout_v1.initialize_list_of_bierbaenke();
            this.bierkaesten = layout_v1.initialize_list_of_bierkaesten();
            this.biertische = layout_v1.initialize_list_of_biertische();
            this.campfires = layout_v1.initialize_list_of_campfires();
            this.dixies = layout_v1.initialize_list_of_dixies();
            this.people = layout_v1.initialize_list_of_people();
            this.tents = layout_v1.initialize_list_of_tents();
            this.pofferballfelder = layout_v1.initialize_list_of_pofferballfelder();
            this.waschstellen = layout_v1.initialize_list_of_waschstellen();
        } else if (layout_variant == "layout_v2") {
            this.banners = layout_v2.initialize_list_of_banners();
            this.bierbaenke = layout_v2.initialize_list_of_bierbaenke();
            this.bierkaesten = layout_v2.initialize_list_of_bierkaesten();
            this.biertische = layout_v2.initialize_list_of_biertische();
            this.campfires = layout_v2.initialize_list_of_campfires();
            this.dixies = layout_v2.initialize_list_of_dixies();
            this.people = layout_v2.initialize_list_of_people();
            this.tents = layout_v2.initialize_list_of_tents();
            this.pofferballfelder = layout_v2.initialize_list_of_pofferballfelder();
            this.waschstellen = layout_v2.initialize_list_of_waschstellen();
        }
    }
}
