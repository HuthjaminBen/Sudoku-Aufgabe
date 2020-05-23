"use strict"
/* erzeugt ein 9x9 Quadrat von inputfeldern mit folgenden IDs:

00 01 02   03 04 04    06 07 08
10 11 12   13 14 15    16 17 18
20 21 22   23 24 25    26 27 28

30 31 32   33 34 35    36 37 38
40 41 42   43 44 45    46 47 48
50 51 52   53 54 55    56 57 58

60 61 62   63 64 65    66 67 68
70 71 72   73 74 75    76 77 78
80 81 82   83 84 58    86 87 88
*/
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        let feld = document.createElement("input");
        feld.type = "text";
        feld.className = "feld";
        feld.maxLength = 1;
        feld.id = [i] + [j];
        feld.value = " ";
        document.body.appendChild(feld);
    }
    document.body.appendChild(document.createElement("br"));
}

/*
hier werden so viele Felder zufällig mit Ziffern aufgefüllt wie der/die Benutzer/in
angibt. Dabei werden die 3 Sudokugrundregeln (Spalte / Zeile / Quadrat) in externen 
Einzelfunktionen überprüft.
###!!! Achtung DERZEIT werden unausfüllbare Felder abgebrochen und noch nicht abgefangen!!!

*/
//try {
function sudoku() {
    let anzahl = document.getElementById("vorausgefüllt").value; // übernimmt Nutzer/innenangabe
    for (let i = 0; i < anzahl; i++) {
        let wert = Math.round(Math.random() * 9); // Ziffer für Sudokufeld
        let y = (Math.round(Math.random() * 8).toString()); // y-Variable (das "-1" entstammt den ID-Bezeichnungen oben (von 0-8 statt von 1-9)
        let x = (Math.round(Math.random() * 8).toString()); // x-Variable (das "-1" entstammt den ID-Bezeichnungen oben (von 0-8 statt von 1-9)
        let ziel = x + y; // erzeugt die Zielvariablen des Feldes
        let feld = document.getElementById(ziel); // ließt Wert im Feld aus
        if (feld.value == " ") { // erste Bedingung
            let check1 = reihencheck(y, wert); // 2. Bedingung (ext Fkf)
            let check2 = spaltencheck(x, wert); // 3. Bedingung (ext Fkf)
            let check3 = quadratcheck(y, x, wert); // 4. Bedingung (ext Fkf)
            if (check1 && check2 && check3) { // wenn alle Bed. erfüllt sind wird der Wert ins Feld eingetragen
                feld.value = wert;
            }
        }
    }
}

/*
Fkt überprüft, ob die Ziffer in der Reihe schonmal vorhanden ist und gibt ein true/false zurück
*/

function reihencheck(y, wert) {
    let erlaubt = true;
    for (let i = 0; i < 9; i++) {
        let springer = (i).toString()
        let verglobj = document.getElementById(springer + y).value;
        if (verglobj == wert) {
            erlaubt = false;
        }
    }
    return erlaubt;
}


/*
Fkt überprüft, ob die Ziffer in der Spalte schonmal vorhanden ist und gibt ein true/false zurück
*/
function spaltencheck(x, wert) {
    let erlaubt = true;
    for (let i = 0; i < 9; i++) {
        let springer = (i).toString()
        let verglobj = document.getElementById(x + springer).value;
        if (verglobj == wert) {
            erlaubt = false;
        }
    }
    return erlaubt;
}

/*
Fkt überprüft, ob die Ziffer im einzelQuadrat schonmal vorhanden ist und gibt ein true/false zurück
*/

function quadratcheck(x, y, wert) { // da von den 9 Zellen des kleinen Quadrates mit den 2 Bedingungen davor schon 5
    let verX1; // Felder abgeglichen sind, werden mit den beiden Switches die übrigen 4 Felder-IDs  
    let verX2; // erzeugt.
    let verY1;
    let verY2;
    let erlaubt = true;
    switch (x) {
        case "0":
            verX1 = 1;
            verX2 = 2;
            break;
        case "1":
            verX1 = 0;
            verX2 = 2;
            break;
        case "2":
            verX1 = 0;
            verX2 = 1;
            break;
        case "3":
            verX1 = 4;
            verX2 = 5;
            break;
        case "4":
            verX1 = 3;
            verX2 = 5;
            break;
        case "5":
            verX1 = 3;
            verX2 = 4;
            break;
        case "6":
            verX1 = 7;
            verX2 = 8;
            break;
        case "7":
            verX1 = 6;
            verX2 = 8;
            break;
        case "8":
            verX1 = 6;
            verX2 = 7;
            break;
    }
    switch (y) {
        case "0":
            verY1 = 1;
            verY2 = 2;
            break;
        case "1":
            verY1 = 0;
            verY2 = 2;
            break;
        case "2":
            verY1 = 0;
            verY2 = 1;
            break;
        case "3":
            verY1 = 4;
            verY2 = 5;
            break;
        case "4":
            verY1 = 3;
            verY2 = 5;
            break;
        case "5":
            verY1 = 3;
            verY2 = 4;
            break;
        case "6":
            verY1 = 7;
            verY2 = 8;
            break;
        case "7":
            verY1 = 6;
            verY2 = 8;
            break;
        case "8":
            verY1 = 6;
            verY2 = 7;
            break;
    }
    let verglWert1; // holt die values aus den 4 (siehe oben) Zellen 
    let verglWert2;
    let verglWert3;
    let verglWert4;
    for (let i = 0; i < 3; i++) {
        verglWert1 = document.getElementById(verX1.toString() + verY1).value;
        verglWert2 = document.getElementById(verX2.toString() + verY1).value;
        verglWert3 = document.getElementById(verX1.toString() + verY2).value;
        verglWert4 = document.getElementById(verX2.toString() + verY2).value;
    }
    if (wert == verglWert1) { // der eigentliche Vergleich
        erlaubt = false;
    }
    if (wert == verglWert2) {
        erlaubt = false;
    }
    if (wert == verglWert3) {
        erlaubt = false;
    }
    if (wert == verglWert4) {
        erlaubt = false;
    }
    return erlaubt;
}
//} catch (x) { alert(x) }