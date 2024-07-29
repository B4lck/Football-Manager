import { updateTable } from "./main.js";
import { Kamp } from "./kamp.js";

export class Liga {
    static hold = [];
    static kommendeKampe = [];
    static spilledeKampe = [];

    static Simulatematch(Hold1, Hold2) {
        // Opdater UI
        opdaterKommendeKampe();
        Liga.kommendeKampe.splice(0,1);

        let kamp = new Kamp(Hold1, Hold2);
        let minut = 0;
        let Hold1Mål = 0;
        let Hold2Mål = 0;

        Hold1.energi = 100;
        Hold2.energi = 100;

        kamp.hold1 = Hold1;
        kamp.hold2 = Hold2;

        let InPossession;
        let notInPossession;

        // Reset UI
        let TimeLine = $("hold1Tidslinje");
        TimeLine.innerHTML = "";
        TimeLine = $("hold2Tidslinje");
        TimeLine.innerHTML = "";

        let Minuttæller = setInterval(() => {
            // Hvis der er gået mere end 90 minutter, skal den slutte kampen
            if (minut > 90) { 
                // Slut kamp
                if (Hold1Mål > Hold2Mål) {
                    // Hold 1 vandt
                    Liga.hold[Liga.hold.indexOf(Hold1)].point += 3;
                    Liga.hold[Liga.hold.indexOf(Hold1)].vundet += 1;
                    Liga.hold[Liga.hold.indexOf(Hold2)].tabt += 1;
                } else if (Hold1Mål == Hold2Mål) {
                    // Uafgjort
                    Liga.hold[Liga.hold.indexOf(Hold1)].point += 1;
                    Liga.hold[Liga.hold.indexOf(Hold2)].point += 1;
                    Liga.hold[Liga.hold.indexOf(Hold1)].uafgjort += 1;
                    Liga.hold[Liga.hold.indexOf(Hold2)].uafgjort += 1;
                } else {
                    // Hold 2 vandt
                    Liga.hold[Liga.hold.indexOf(Hold2)].point += 3;
                    Liga.hold[Liga.hold.indexOf(Hold2)].vundet += 1;
                    Liga.hold[Liga.hold.indexOf(Hold1)].tabt += 1;
                }

                // Opdater hold stats
                // Hold 1
                Liga.hold[Liga.hold.indexOf(Hold1)].målFor += Hold1Mål;
                Liga.hold[Liga.hold.indexOf(Hold1)].målImod += Hold2Mål;
                Liga.hold[Liga.hold.indexOf(Hold1)].spillet += 1;

                // Hold 2
                Liga.hold[Liga.hold.indexOf(Hold2)].målFor += Hold2Mål;
                Liga.hold[Liga.hold.indexOf(Hold2)].målImod += Hold1Mål;
                Liga.hold[Liga.hold.indexOf(Hold2)].spillet += 1;

                // Stop timer
                clearInterval(Minuttæller)

                // Opdater UI
                updateTable();
                opdaterResultaterne();

                // Start ny kamp
                if (Liga.kommendeKampe.length > 0) Liga.Simulatematch(Liga.kommendeKampe[0][0], Liga.kommendeKampe[0][1]);
            }

            // 2/15 (13%) chance for at der sker en mål chance
            if (Math.random() * 15 > 13) {

                // Giv boldbesiddelse
                let MidtbaneDifference = Hold1.midtbane - Hold2.midtbane;
                let fysikDifference = Hold1.fysik - Hold2.fysik;
                let afleveringDifference = Hold1.aflevering - Hold2.aflevering;
                let energiDifference = Hold1.energi - Hold2.energi;

                let randomTal = Math.random()*100;
                let chanceForHold1 = 50+(MidtbaneDifference*2.5)+(fysikDifference*.3)+(afleveringDifference*.5)+energiDifference;
                if (randomTal < chanceForHold1) {
                    //Giv hold 1 bolden
                    InPossession = Hold1;
                    notInPossession = Hold2;
                    kamp.hold1boldbesiddelse++;
                } else {
                    // Giv hold 2 bolden
                    InPossession = Hold2;
                    notInPossession = Hold1;
                    kamp.hold2boldbesiddelse++;
                }

                // Forsøg at scorer mål
                let AngrebsDifference = InPossession.angreb - notInPossession.forsvar;
                let MålChance = 15+(AngrebsDifference * 1.25)+(InPossession.aflevering)
                if (Math.random()*100 < MålChance) {
                    // MÅÅÅÅÅÅL!!!!
                    switch (InPossession) {
                        case Hold1: 
                            Hold1Mål++;
                            Mål(Hold1, 1, minut, kamp);
                            break;
                        case Hold2:
                            Hold2Mål++;
                            Mål(Hold2, 2, minut, kamp);
                            break;
                        default:
                            console.log("Kunne ikke finde en målscorer")
                            break;
                    }
                    // Opdater kampstats
                    if (InPossession == Hold1) {
                        kamp.hold1farligeChancer++;
                        kamp.hold1xG += (100-MålChance)/100;
                    } else {
                        kamp.hold2farligeChancer++;
                        kamp.hold2xG += (100-MålChance)/100;;
                    }
                } else {
                    // Opdater kampstats
                    if (MålChance < 50) {
                        if (InPossession == Hold1) {
                            kamp.hold1farligeChancer++;
                            kamp.hold1xG += (100-MålChance)/100;;
                        } else {
                            kamp.hold2farligeChancer++;
                            kamp.hold2xG += (100-MålChance)/100;;
                        }
                    }

                    // Måske en lille kontra?
                    let PaceDifference = notInPossession.pace - InPossession.pace;
                    energiDifference = notInPossession.energi - InPossession.energi;
                    if (Math.random()*100<5+(PaceDifference*1.5)+(notInPossession.aflevering)-(energiDifference*2)) {
                        // Kan de scorer på kontraen?
                        MålChance = 20-AngrebsDifference-energiDifference
                        if (Math.random()*100<MålChance) {
                            //MÅÅÅÅÅÅL!!!!
                            switch (notInPossession) {
                                case Hold1: 
                                    Hold1Mål++;
                                    Mål(Hold1, 1, minut, kamp);
                                    break;
                                case Hold2:
                                    Hold2Mål++;
                                    Mål(Hold2, 2, minut, kamp);
                                    break;
                                default:
                                    console.log("Kunne ikke finde en målscorer")
                                    break;
                            }
                        }

                        // Opdater kampstats
                        if (InPossession == Hold2) {
                            kamp.hold1farligeChancer++;
                            kamp.hold1xG += (100-MålChance) / 100;
                        } else {
                            kamp.hold2farligeChancer++;
                            kamp.hold2xG += (100-MålChance) / 100;
                        }
                    }
                }
            }

            // Dræn energi
            Math.random()*100<10+(Hold1.fysik*1.5) ? Hold1.energi-- : Hold1.energi++;
            Math.random()*100<10+(Hold2.fysik*1.5) ? Hold2.energi-- : Hold2.energi++;

            opdaterTidslinje(Hold1, Hold2, Hold1Mål, Hold2Mål, minut);
            opdaterKampStats(kamp);

            minut++;

        }, 100); // Sæt op på 1000 igen når færdigt
        this.spilledeKampe.push(kamp);
    }

    static GenerateMatchSchedule() {
        // Tilføj dummy hold.
        if (Liga.hold.length % 2 == 1) {
            Liga.hold.push("dummy");
        }

        const spilleRunder = Liga.hold.length - 1;
        const kampePrRunde = Liga.hold.length / 2;

        // Generer hjemmekampe
        for (let runde = 0; runde < spilleRunder; runde++) {
            for (let kamp = 0; kamp < kampePrRunde; kamp++) {
                // Hvorfor det her virker? Idk - det er noget matematik
                let hjemmeHold = (runde + kamp) % spilleRunder;
                let udeHold = (spilleRunder - kamp + runde) % spilleRunder;

                if (kamp === 0) {
                    udeHold = spilleRunder;
                }

                Liga.kommendeKampe.push([Liga.hold[hjemmeHold], Liga.hold[udeHold]]);
            }
        }

        // Generer udekampe
        for (let runde = 0; runde < spilleRunder; runde++) {
            for (let kamp = 0; kamp < kampePrRunde; kamp++) {
                // Hvorfor det her virker? Idk - det er noget matematik
                let hjemmeHold = (runde + kamp) % spilleRunder;
                let udeHold = (spilleRunder - kamp + runde) % spilleRunder;

                if (kamp === 0) {
                    udeHold = spilleRunder;
                }

                Liga.kommendeKampe.push([Liga.hold[udeHold], Liga.hold[hjemmeHold]]);
            }
        }

        // Slet dummy hold kampene
        for (let i = 0; i < Liga.kommendeKampe.length; i++) {
            if (Liga.kommendeKampe[i][0] === "dummy" || Liga.kommendeKampe[i][1] === "dummy") {
                Liga.kommendeKampe.splice(i, 1);
            }
        }

        // Slet dummy hold fra hold listen
        for (let i = 0; i < Liga.hold.length; i++) {
            if (Liga.hold[i] === "dummy") {
                Liga.hold.splice(i, 1);
            }
        }
    }
}

function opdaterKampStats(kamp) {
    let boldbesiddelse = Math.round((kamp.hold1boldbesiddelse / (kamp.hold1boldbesiddelse + kamp.hold2boldbesiddelse)) * 100);
    // Boldbesiddelse filler
    $("statFill1Hold1").style.width = boldbesiddelse + "%";
    $("statFill1Hold2").style.width = (100 - boldbesiddelse) + "%";

    // Boldbesiddelse text
    $("StatText1Hold1").innerText = boldbesiddelse + "%";
    $("StatText1Hold2").innerText = (100 - boldbesiddelse) + "%";

    // Farlige chancer fill
    let farligeChancerProcent = Math.round((kamp.hold1farligeChancer / (kamp.hold1farligeChancer + kamp.hold2farligeChancer)) * 100);
    if (kamp.hold1farligeChancer == kamp.hold2farligeChancer) farligeChancerProcent = 50;
    $("statFill2Hold1").style.width = farligeChancerProcent + "%";
    $("statFill2Hold2").style.width = (100 - farligeChancerProcent) + "%";

    // Farlige chancer text
    $("StatText2Hold1").innerText = kamp.hold1farligeChancer;
    $("StatText2Hold2").innerText = kamp.hold2farligeChancer;

    // Farlige chancer fill
    let xgProcent = Math.round((kamp.hold1xG / (kamp.hold1xG + kamp.hold2xG)) * 100);
    if (kamp.hold1xG == kamp.hold2xG) xgProcent = 50;
    $("statFill3Hold1").style.width = xgProcent + "%";
    $("statFill3Hold2").style.width = (100 - xgProcent) + "%";

    // Farlige chancer text
    $("StatText3Hold1").innerText = Math.round(kamp.hold1xG * 100) / 100;
    $("StatText3Hold2").innerText = Math.round(kamp.hold2xG * 100) / 100;
}


function Mål(Hold, holdnr, minut, kamp) {

    // Vælg random spiller til at scorer:
    let randomTal = Math.random() * 10;
    let spiller;
    if (randomTal > 4) {
        // Vælg random angriber
        let playerTal = Math.round(Math.random()*2);
        spiller = Liga.hold[Liga.hold.indexOf(Hold)].angribere[playerTal];
        Liga.hold[Liga.hold.indexOf(Hold)].angribere[playerTal].mål++;
    } else if(randomTal > 1) {
        // Vælg random midtbane
        let playerTal = Math.round(Math.random()*2);
        spiller = Liga.hold[Liga.hold.indexOf(Hold)].midtbaneSpillere[playerTal];
        Liga.hold[Liga.hold.indexOf(Hold)].midtbaneSpillere[playerTal].mål++;
    } else {
        // Vælg random forsvar
        let playerTal = Math.round(Math.random()*4);
        spiller = Liga.hold[Liga.hold.indexOf(Hold)].forsvarsSpillere[playerTal];
        Liga.hold[Liga.hold.indexOf(Hold)].forsvarsSpillere[playerTal].mål++;
    }

    // Opdater tidslinje
    let TimeLine = $("hold"+holdnr+"Tidslinje");
    let text = document.createElement("p");
    text.innerText = spiller.navn + " " + minut + "'";
    TimeLine.appendChild(text);
    
    // Opdater kampstats
    if (holdnr === 1) {
        kamp.hold1Mål++;
        kamp.hold1målscorer.push(spiller);
    } else {
        kamp.hold2Mål++;
        kamp.hold2målscorer.push(spiller);
    }
    
    // Vælg random spiller til at assist:
    randomTal = Math.random() * 3;
    if (randomTal < 2) {
        randomTal = Math.random() * 10;
        // En spiller har lavet assist
        if (randomTal > 4) {
            // Vælg random midtbane
            let playerTal = Math.round(Math.random()*2);
            spiller = Liga.hold[Liga.hold.indexOf(Hold)].midtbaneSpillere[playerTal];
            Liga.hold[Liga.hold.indexOf(Hold)].midtbaneSpillere[playerTal].assist++;
        } else if(randomTal > 1) {
            // Vælg random angriber
            let playerTal = Math.round(Math.random()*2);
            spiller = Liga.hold[Liga.hold.indexOf(Hold)].angribere[playerTal];
            Liga.hold[Liga.hold.indexOf(Hold)].angribere[playerTal].assist++;
        } else {
            // Vælg random forsvar
            let playerTal = Math.round(Math.random()*4);
            spiller = Liga.hold[Liga.hold.indexOf(Hold)].forsvarsSpillere[playerTal];
            Liga.hold[Liga.hold.indexOf(Hold)].forsvarsSpillere[playerTal].assist++;
        }
    }

    // Opdater kampstats
    if (holdnr === 1) {
        kamp.hold1assister.push(spiller)
    } else {
        kamp.hold2assister.push(spiller)
    }
}

function opdaterTidslinje(Hold1, Hold2, Mål1, Mål2, Tid) {
    let KampHoldText = $("KampHoldText");
    let ScorerText = $("ScorerText");
    let TidText = $("TidText");

    KampHoldText.innerText = Hold1.holdNavn + " VS " + Hold2.holdNavn; 
    ScorerText.innerText = Mål1 + " - " + Mål2; 
    TidText.innerText = Tid + "'"; 
}

function $(id) {
    return document.getElementById(id);
}

function opdaterKommendeKampe() {
    // Clear
    let menu = $("kommendeKampe");
    menu.innerHTML = "";

    // Indstil titel igen
    let titel = document.createElement("h1");
    titel.innerHTML = "Kommende Kampe";
    menu.appendChild(titel);

    // Indsæt kampe
    for (let i = 1; i < 6; i++) {
        // Hvis der ikke er flere kommende kampe, slut loop
        if (i > Liga.kommendeKampe.length - 1) break;

        // Style tha' shi
        let kamp = Liga.kommendeKampe[i];
        let block = document.createElement("div");
        block.classList.add("matchinfo");
        block.style.background = "linear-gradient(to right, "+ kamp[0].hjemmeBaneFarve +", "+ kamp[0].hjemmeBaneFarve +", "+ kamp[1].udeBaneFarve +", " + kamp[1].udeBaneFarve + ")";
        let text = document.createElement("p");
        text.classList.add("invertTextColor");
        text.innerHTML = kamp[0].holdNavn + " - " + kamp[1].holdNavn;
        // Placer korrekt i hieraki
        menu.appendChild(block);
        block.appendChild(text);
    }
}

function opdaterResultaterne() {
    console.log(Liga.spilledeKampe[Liga.spilledeKampe.length - 1])
    let kamp = Liga.spilledeKampe[Liga.spilledeKampe.length - 1];
    let block = document.createElement("div");
    block.classList.add("matchinfo");
    block.style.background = "linear-gradient(to right, "+ kamp.hold1.hjemmeBaneFarve +", "+ kamp.hold1.hjemmeBaneFarve +", "+ kamp.hold2.udeBaneFarve +", " + kamp.hold2.udeBaneFarve + ")";
    let text = document.createElement("p");
    text.classList.add("invertTextColor");
    text.innerHTML = kamp.hold1.holdNavn + " " + kamp.hold1Mål +  " - " + kamp.hold2Mål + " " + kamp.hold2.holdNavn;

    let menu = $("resultater");
    // Placer korrekt i hieraki
    menu.appendChild(block);
    block.appendChild(text);

}