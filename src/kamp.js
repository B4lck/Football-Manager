export class Kamp {
    hold1;
    hold2;

    hold1Mål = 0;
    hold2Mål = 0;

    hold1målscorer = [];
    hold2målscorer = [];

    hold1assister = [];
    hold2assister = [];

    hold1boldbesiddelse = 5;
    hold2boldbesiddelse = 5;

    hold1farligeChancer = 0;
    hold2farligeChancer = 0;

    hold1xG = 0;
    hold2xG = 0;

    constructor(hold1, hold2) {
        this.hold1 = hold1;
        this.hold2 = hold2;
    }
}


// TODO: Tilføj stats til kamp i kamp simulation