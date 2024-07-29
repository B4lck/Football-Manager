import {navne} from "./navne.js"

export class spiller {
    navn;
    hold;
    mål = 0;
    assist = 0;
    constructor(hold) {
        // Giv et random navn
        let rTal = Math.round(Math.random() * navne.length);
        this.navn = navne[rTal];
        navne.splice(rTal, 1);

        // Tilføj hold
        this.hold = hold;
    }
}