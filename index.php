<html>
<head>
    <title>Boys Liga</title>
    <link rel="stylesheet" href="./style.css">
    <meta charset="UTF-8"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
</head>
<body>
<script>
function $(id) {
    return document.getElementById(id);
}

 // Indstil point
let point = 10;
let angreb = 0;
let midtbane = 0;
let forsvar = 0;
let pace = 0;
let fysik = 0;
let aflevering = 0;

// Reset
function resetForm() {
    point = 10;
    angreb = 0;
    midtbane = 0;
    forsvar = 0;
    pace = 0;
    fysik = 0;
    aflevering = 0;

    // Ændre text
    $("angrebText").innerHTML = angreb;
    $("midtbaneText").innerHTML = midtbane;
    $("forsvarText").innerHTML = forsvar;
    $("paceText").innerHTML = pace;
    $("fysikText").innerHTML = fysik;
    $("afleveringText").innerHTML = aflevering;
    $("pointText").innerHTML = "Point Tilbage: " + point;

    $("holdNavn").value = "";

    $("hjemmeBaneFarve").value = "#000000"
    $("udeBaneFarve").value = "#000000"
}

function TilføjTilStat(stat) {
    // Hvis der er flere point tilbage;
    if (point <= 0) {
        return;
    }
    // Fjern point
    point--;

    // Tilføj point til stat
    switch (stat) {
        case 0:
            angreb++;
            $("angrebText").innerHTML = angreb;
            break;
        case 1:
            midtbane++;
            $("midtbaneText").innerHTML = midtbane;
            break;
        case 2:
            forsvar++;
            $("forsvarText").innerHTML = forsvar;
            break;
        case 3: 
            pace++;
            $("paceText").innerHTML = pace;
            break;
        case 4:
            fysik++;
            $("fysikText").innerHTML = fysik;
            break;
        case 5:
            aflevering++;
            $("afleveringText").innerHTML = aflevering;
            break;
        default:
            point++;
            break;       
    }
    $("pointText").innerHTML = "Point Tilbage: " + point;
}

function fjernFraStat(stat) {
    // Fjern point fra stat
    switch (stat) {
        case 0:
            if (angreb == 0 ) {return;}
            angreb--;
            $("angrebText").innerHTML = angreb;
            break;
        case 1:
            if (midtbane == 0 ) {return;}
            midtbane--;
            $("midtbaneText").innerHTML = midtbane;
            break;
        case 2:
            if (forsvar == 0 ) {return;}
            forsvar--;
            $("forsvarText").innerHTML = forsvar;
            break;
        case 3: 
            if (pace == 0 ) {return;}
            pace--;
            $("paceText").innerHTML = pace;
            break;
        case 4:
            if (fysik == 0 ) {return;}
            fysik--;
            $("fysikText").innerHTML = fysik;
            break;
        case 5:
            if (aflevering == 0 ) {return;}
            aflevering--;
            $("afleveringText").innerHTML = aflevering;
            break;
        default:
            point--;
            break;       
    }
    // Tilføj point
    point++;
    $("pointText").innerHTML = "Point Tilbage: " + point;
}


</script>
<div class="forside" id="forside">
    <div class="opretHoldHolder">
        <h1>Lav nyt hold</h1>
        <input type="text" class="HoverButton" id="holdNavn" placeholder="Hold navn..." style="width: 70%; height: 60px; font-size: 36px; border-radius: 0px; border: none;">
        <h2>Hjemmebane farve</h2>
        <input type="color" class="colorPicker" id="hjemmeBaneFarve">
        <h2>Udebane farve</h2>
        <input type="color" class="colorPicker" id="udeBaneFarve">
        <h2 style="margin-bottom: 0px">Fordel Stat Point</h2>
        <h3 style="margin-top: 0px;" id="pointText">Point Tilbage: 10</h3>
        <div class="StatHolder"> 
            <div class="Stat">
                <p>Angreb</p>
                <input type="button" value="-" onclick="fjernFraStat(0)">
                <p id="angrebText">0</p>
                <input type="button" value="+" onclick="TilføjTilStat(0)">
            </div>
            <div class="Stat">
                <p>Pace</p>
                <input type="button" value="-" onclick="fjernFraStat(3)">
                <p id="paceText">0</p>
                <input type="button" value="+" onclick="TilføjTilStat(3)">
            </div>
            <div class="Stat">
                <p>Midtbane</p>
                <input type="button" value="-" onclick="fjernFraStat(1)">
                <p id="midtbaneText">0</p>
                <input type="button" value="+" onclick="TilføjTilStat(1)">
            </div>
            <div class="Stat">
                <p>Fysik</p>
                <input type="button" value="-" onclick="fjernFraStat(4)">
                <p id="fysikText">0</p>
                <input type="button" value="+" onclick="TilføjTilStat(4)">
            </div>
            <div class="Stat">
                <p>Forsvar</p>
                <input type="button" value="-" onclick="fjernFraStat(2)">
                <p id="forsvarText">0</p>
                <input type="button" value="+" onclick="TilføjTilStat(2)">
            </div>
            <div class="Stat">
                <p>Aflevering</p>
                <input type="button" value="-" onclick="fjernFraStat(5)">
                <p id="afleveringText">0</p>
                <input type="button" value="+" onclick="TilføjTilStat(5)">
            </div>
        </div>
        <input type="button" value="Opret Hold" class="opretHold" id="opretHold" onclick="resetForm()">
    </div>
    <div class="listeAfHoldHolder" id="holdDivListe">
        <h1>Hold i boysligaen</h1>
        <input type="button" value="Start" class="opretHold" id="startSpil">
    </div>
</div>
<div id="spilSide" class="spilSide hidden">
    <div class="holdkort" id="holdkort">
        <h2 id="hHoldnavn">Tottenham Hotspurs</h2>
        <div class="hbane">
            <div class="hbanelinje">
                <div class="spiller"><p id="angriber1">Son</p></div>
                <div class="spiller"><p id="angriber2">Richarlison</p></div>
                <div class="spiller"><p id="angriber3">D. Kulusevski</p></div>
            </div>
            <div class="hbanelinje">
                <div class="spiller"><p id="midtbane1">Y. Bissouma</p></div>
                <div class="spiller"><p id="midtbane2">J. Maddison</p></div>
                <div class="spiller"><p id="midtbane3">P. Sarr</p></div>
            </div>
            <div class="hbanelinje">
                <div class="spiller"><p id="forsvar1">D. Udogie</p></div>
                <div class="spiller"><p id="forsvar2">C. Romero</p></div>
                <div class="spiller"><p id="forsvar3">M. Van de Ven</p></div>
                <div class="spiller"><p id="forsvar4">P. Porro</p></div>
            </div>
            <div class="hbanelinje">
                <div class="spiller"><p id="målmand">Vicario</p></div>
            </div>
        </div>
    </div>
    <div class="kampKort hidden" id="kampKort">
        <h2 id="kampNavn">Test - Test</h2>
        <div class="kampKortStatHolder">
            <div class="kampKortLinje">
                <div class="målscoreListe" id="målscoreListe1">
                    <p>Richarlison Ronaldo</p>
                    <p>C. Ronaldo</p>
                    <p>L. Messi</p>
                    <p>T. Test</p>
                </div>
                <div class="målscoreListe" id="målscoreListe2">
                    <p>K. Havertz</p>
                </div>
            </div>
            <h3>Boldbesiddelse</h3>
            <div class="kampKortLinje">
                <p id="boldbesiddelseHold1">50%</p>
                <p id="boldbesiddelseHold2">50%</p>
            </div>
            <h3>Farlige Chancer</h3>
            <div class="kampKortLinje">
                <p id="chancerHold1">0</p>
                <p id="chancerHold2">0</p>
            </div>
            <h3>xG</h3>
            <div class="kampKortLinje">
                <p id="xGHold1">0</p>
                <p id="xGHold2">0</p>
            </div>
        </div>
    </div>
    <div class="bane">
        <h1 id="KampHoldText">HOLD 1 VS HOLD 2 </h1>
        <h3 id="ScorerText">0 - 0</h3>
        <h3 id="TidText">0'</h3>
        <div class="TidslinjeHolder">
            <div id="hold1Tidslinje" class="HoldTidslinje">
                
            </div>
            <div id="hold2Tidslinje" class="HoldTidslinje alignRight">
                
            </div>
        </div>
    </div>
    <div class="stilling" id="stilling">
        <h1>Stillingen i Boys Liga</h1>
        <table class="stillingTable" id="tabel">
            <tr>
                <td class="tableFirst" style="text-align: center">
                Hold Navn
                </td>
                <td>
                    P  
                </td>
                <td>
                    V
                </td>
                <td>
                    U  
                </td>
                <td>
                    T
                </td>
                <td>
                    Mf
                </td>
                <td>
                    Mm
                </td>
                <td>
                    Ks
                </td>
            </tr>
        </table>
    </div>
    <div class="KampStatsHolder">
        <h1 style="font-size: 20px;">Kamp Statistikker</h1>
        <h3>Bold besiddelse</h3>
        <div class="KampStat"> 
            <div class="statFill" id="statFill1Hold1" style="width: 50%; background-color: blue">
                <p id="StatText1Hold1">50%</p>
            </div>
            <div class="statFill" id="statFill1Hold2" style="width:50%; background-color: red">
                <p id="StatText1Hold2">50%</p>
            </div>
        </div>
        <h3>Farlige Chancer</h3>
        <div class="KampStat"> 
            <div class="statFill" id="statFill2Hold1" style="width: 50%; background-color: blue">
                <p id="StatText2Hold1">0</p>
            </div>
            <div class="statFill" id="statFill2Hold2" style="width:50%; background-color: red">
                <p id="StatText2Hold2">0</p>
            </div>
        </div>
        <h3>xG</h3>
        <div class="KampStat"> 
            <div class="statFill" id="statFill3Hold1" style="width: 50%; background-color: blue">
                <p id="StatText3Hold1">0</p>
            </div>
            <div class="statFill" id="statFill3Hold2" style="width:50%; background-color: red">
                <p id="StatText3Hold2">0</p>
            </div>
        </div>
    </div>
    <div class="topSpillerListe">
        <h2>Topscorer</h1>
        <ol>
            <li id="topscorer0"><span class="invertTextColor">Spiller 1 - 10</span></li>
            <li id="topscorer1"><span class="invertTextColor">Spiller 2 - 9</span></li>
            <li id="topscorer2"><span class="invertTextColor">Spiller 3 - 7</span></li>
        </ol>
        <h2>Top assister</h2>
        <ol>
            <li id="topassister0"><span class="invertTextColor">Spiller 1 - 10</span></li>
            <li id="topassister1"><span class="invertTextColor">Spiller 2 - 9</span></li>
            <li id="topassister2"><span class="invertTextColor">Spiller 3 - 7</span></li>
        </ol>
    </div>
    <div class="kommendeKampe" id ="kommendeKampe">
        <h1>Kommende Kampe</h1>
    </div>
    <div class="resultater" id = "resultater">
        <h1>Resultater</h1>
    </div>

</div>

<script src="./src/main.js" type="module"> </script>

</body>
</html>