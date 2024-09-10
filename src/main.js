import {Hold} from "./hold.js"
import { Liga } from "./liga.js";
import { navne } from "./navne.js";

function $(id) {
    return document.getElementById(id);
}

/*
--------------------------------
--------------------------------
            FORSIDE
--------------------------------
--------------------------------
*/

function opretHold() {
    // Læs formular data
    let HoldNavn = $("holdNavn").value;
    let hjemmeBaneFarve = $("hjemmeBaneFarve").value;
    let udeBaneFarve = $("udeBaneFarve").value;

    let holdStats = {
        angreb: parseInt($("angrebText").innerHTML),
        midtbane: parseInt($("midtbaneText").innerHTML),
        forsvar: parseInt($("forsvarText").innerHTML),
        pace: parseInt($("paceText").innerHTML),
        fysik: parseInt($("fysikText").innerHTML),
        aflevering: parseInt($("afleveringText").innerHTML)
    }

    // Opret nyt hold, og indsæt det i ligaen
    let hold = new Hold(HoldNavn, hjemmeBaneFarve, udeBaneFarve, holdStats);

    Liga.hold.push(hold);

    console.log(Liga.hold);

    $("tabel").insertRow(-1);

    updateListe(hold);
}

function updateListe(hold) {
    let liste = $("holdDivListe");

    let holdDiv = document.createElement("div")
    holdDiv.classList.add("Hold");
    holdDiv.style.backgroundColor = hold.hjemmeBaneFarve;

    let navneText = document.createElement("h2");
    navneText.innerText = hold.holdNavn;
    navneText.classList.add("holdNavnText")


    liste.appendChild(holdDiv);
    holdDiv.appendChild(navneText);
}

$("opretHold").addEventListener("mousedown", ()=> {
    opretHold()
});


// Start spil
$("startSpil").addEventListener("mousedown", ()=> {
    // Dobbelt tjek om det hele er okay
    if (Liga.hold < 2){
        alert("Der skal være mindst 2 hold");
        return
    }
    if (!confirm("Er du sikker? Når først spillet er startet, kan du ikke ændre på holdende")) { return; }
    if (Liga.hold > 10) {
        if (!confirm("Vær opmærksom på at spil med flere end 10 hold kan opleve fejl")) { return; }
    }
    $("forside").classList.add("hidden");
    $("spilSide").classList.remove("hidden");
    updateTable();

    //for (let i = 0; i < 10; i++) // Tænd hvis du vil køre en sæson flere gange
        Liga.GenerateMatchSchedule();
    Liga.Simulatematch(Liga.kommendeKampe[0][0], Liga.kommendeKampe[0][1])
})


/*
STILLING
*/

export function updateTable() {
    // Tabel
    let tabel = $("tabel");
    let tempHoldList = []

    // Reset Tabel
    for (let i = tabel.rows.length - 1; i > 0; i--) {
        if (i != 0) {
            tabel.deleteRow(i);
        }
    }

    // Tilføj alle holdende til en midlertidig liste, som skal bruges til at sammenligne point
    for (let i = 0; i < Liga.hold.length; i++) {
        tempHoldList.push(Liga.hold[i]);
    }



    // Indsæt i række følgen af flest point
    for (let i = 1; i < Liga.hold.length + 1; i++) {
        let MostPointTeam = tempHoldList[0];
        for (let j = 0; j < tempHoldList.length; j++) {
            if (tempHoldList[j].point > MostPointTeam.point) {
                // Flere point
                MostPointTeam = tempHoldList[j];
            } else if (tempHoldList[j].point == MostPointTeam.point && (tempHoldList[j].målFor - tempHoldList[j].målImod) > MostPointTeam.målFor - MostPointTeam.målImod) {
                // Målforskel
                MostPointTeam = tempHoldList[j];
            } else if (tempHoldList[j].point == MostPointTeam.point && tempHoldList[j].målFor > MostPointTeam.målFor) {
                // Flest mål
                MostPointTeam = tempHoldList[j];
            }
        }
        
        // Indsæt række
        let row = tabel.insertRow(-1);
        row.style.backgroundColor = MostPointTeam.hjemmeBaneFarve;
        row.style.border = "10px solid " + MostPointTeam.hjemmeBaneFarve;

        //Indsæt data i række
        let navn = row.insertCell(0);
        navn.innerText = i + ". " + MostPointTeam.holdNavn;
        navn.classList.add("tableFirst")
        navn.holdId = Liga.hold.indexOf(MostPointTeam);
        navn.onmouseover = function() {onHoverUpdate(navn)};
        //navn.style = "color: " + MostPointTeam.udeBaneFarve;
        row.insertCell(1).innerText = MostPointTeam.point;
        row.insertCell(2).innerText = MostPointTeam.vundet;
        row.insertCell(3).innerText = MostPointTeam.uafgjort;
        row.insertCell(4).innerText = MostPointTeam.tabt;
        row.insertCell(5).innerText = MostPointTeam.målFor;
        row.insertCell(6).innerText = MostPointTeam.målImod;
        row.insertCell(7).innerText = MostPointTeam.spillet;

        tempHoldList.splice(tempHoldList.indexOf(MostPointTeam), 1);

        /// Topscorer tabel

        let Topscorer;
        let spillere = []

        // Tilføj alle spillere til array
        for (let hold of Liga.hold) {
            for (let angriber of hold.angribere) {
                spillere.push(angriber)
            }
            for (let midtbaneSpiller of hold.midtbaneSpillere) {
                spillere.push(midtbaneSpiller)
            }
            for (let forsvarsSpiller of hold.forsvarsSpillere) {
                spillere.push(forsvarsSpiller)
            }
        }

        // Loop igennem array, og find 3 højest scorende spillere
        for (let i = 0; i < 3; i++) {
            Topscorer = undefined;
            for (let spiller of spillere) {
                if (Topscorer == undefined) {
                    Topscorer = spiller;
                    continue;
                }            
                if (spiller.mål > Topscorer.mål) {
                    Topscorer = spiller;
                }
            }

            // Skriv tabel
            let linje = $("topscorer"+i);
            linje.innerHTML = '<span class="invertTextColor">' + Topscorer.navn + " - " + Topscorer.mål + "</span>";
            linje.style.backgroundColor = Topscorer.hold.hjemmeBaneFarve;

            // Slet spiller fra temp liste
            spillere.splice(spillere.indexOf(Topscorer), 1);
        }


        /// Top assister tabel

        let TopAssister;
        spillere = [];

        // Tilføj alle spillere til array
        for (let hold of Liga.hold) {
            for (let angriber of hold.angribere) {
                spillere.push(angriber)
            }
            for (let midtbaneSpiller of hold.midtbaneSpillere) {
                spillere.push(midtbaneSpiller)
            }
            for (let forsvarsSpiller of hold.forsvarsSpillere) {
                spillere.push(forsvarsSpiller)
            }
        }

        // Loop igennem array, og find 3 højest scorende spillere
        for (let i = 0; i < 3; i++) {
            TopAssister = undefined;
            for (let spiller of spillere) {
                if (TopAssister == undefined) {
                    TopAssister = spiller;
                    continue;
                }            
                if (spiller.assist > TopAssister.assist) {
                    TopAssister = spiller;
                }
            }

            // Skriv tabel
            let linje = $("topassister"+i);
            linje.innerHTML = '<span class="invertTextColor">' + TopAssister.navn + " - " + TopAssister.assist + "</span>";
            linje.style.backgroundColor = TopAssister.hold.hjemmeBaneFarve;

            // Slet spiller fra temp liste
            spillere.splice(spillere.indexOf(TopAssister), 1);
        }
    }
}


// Hold kort

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    let holdkort = $("holdkort");
    let kampKort = $("kampKort")
    holdkort.style.left =  mouseX - (16*30 + 2) + "px"; // Offset holdkortet fra musen
    holdkort.style.top = mouseY + 2 + "px";
    kampKort.style.left =  mouseX + "px"; // Offset holdkortet fra musen
    kampKort.style.top = (mouseY - 400) + "px";
})

function onHoverUpdate(objekt) {
    // Det her er noget giga spaghetti kode
    let hold = Liga.hold[objekt.holdId];
    $("hHoldnavn").innerHTML = hold.holdNavn;

    // Angribere
    $("angriber1").innerHTML = hold.angribere[0].navn;
    $("angriber2").innerHTML = hold.angribere[1].navn;
    $("angriber3").innerHTML = hold.angribere[2].navn;

    // Midtbane spillere
    $("midtbane1").innerHTML = hold.midtbaneSpillere[0].navn;
    $("midtbane2").innerHTML = hold.midtbaneSpillere[1].navn;
    $("midtbane3").innerHTML = hold.midtbaneSpillere[2].navn;

    // Forsvars spillere
    $("forsvar1").innerHTML = hold.forsvarsSpillere[0].navn;
    $("forsvar2").innerHTML = hold.forsvarsSpillere[1].navn;
    $("forsvar3").innerHTML = hold.forsvarsSpillere[2].navn;
    $("forsvar4").innerHTML = hold.forsvarsSpillere[3].navn;

    // Målmand
    $("målmand").innerHTML = hold.forsvarsSpillere[4].navn;

    // Spiller farve
    let SpillerElement = document.getElementsByClassName("spiller");
    for (let e of SpillerElement) {
        e.style.backgroundColor = hold.hjemmeBaneFarve;
    }
}