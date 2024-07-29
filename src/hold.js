import {spiller} from "./spiller.js"

export class Hold {
    // Basic stats
    holdNavn;
    hjemmeBaneFarve;
    udeBaneFarve;
    
    // Hold Stats
    angreb = 0;
    midtbane = 0;
    forsvar = 0;
    pace = 0;
    fysik = 0;
    aflevering = 0;

    // Spillere
    angribere = [];
    midtbaneSpillere = [];
    forsvarsSpillere = [];

    // Liga Stats
    point = 0;
    vundet = 0;
    tabt = 0;
    uafgjort = 0;
    spillet = 0;
    målFor = 0;
    målImod = 0;

    // Kamp stats
    energi = 100;

    
    constructor(_holdNavn, _hjemmeBaneFarve, _udeBaneFarve, holdStats) {
        // Indstil basic stats
        this.holdNavn = _holdNavn;
        this.hjemmeBaneFarve = _hjemmeBaneFarve;
        this.udeBaneFarve = _udeBaneFarve;

        // Indstil hold stats
        this.angreb = holdStats.angreb;
        this.midtbane = holdStats.midtbane;
        this.forsvar = holdStats.forsvar;
        this.pace = holdStats.pace;
        this.fysik = holdStats.fysik;
        this.aflevering = holdStats.aflevering;

        // Opret spillere
        // Opret angribere
        for (let i = 0; i < 3; i++) {
            this.angribere.push(new spiller(this));
        }

        // Opret midtbane
        for (let i = 0; i < 3; i++) {
            this.midtbaneSpillere.push(new spiller(this));
        }

        // Opret forsvar & målmand
        for (let i = 0; i < 5; i++) {
            this.forsvarsSpillere.push(new spiller(this));
        }
    }

    // Nulstil kamp stats
    resetMatchdayStats() {
        this.energi = 100;
    }
    
}