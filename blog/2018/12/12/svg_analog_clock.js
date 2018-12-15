class OraCuZecimale {
    constructor(data) {
        if (!data instanceof Date) {
            throw "data nu este de tip Date.";
        }
        this.ore = data.getHours() % 12
                 + data.getMinutes() / 60; 
        this.minute = data.getMinutes()
                    + data.getSeconds() / 60; 
        this.secunde = data.getSeconds()
                     + data.getMilliseconds() / 1000;
    }
}

class Punct {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var centru = new Punct(150, 150);
    var orar = document.getElementById("orar");
    var minutar = document.getElementById("minutar");
    var secundar = document.getElementById("secundar");

    seteazaCeas(centru, orar, minutar, secundar);

    window.setInterval(() => {
        seteazaCeas(centru, orar, minutar, secundar);
    }, 250);

    seteazaSimboluri();

    document.getElementById("ceas").style.visibility = "visible";
});

function seteazaSimboluri() {
    seteazaPuncte();
    // seteazaCifre();
}

function seteazaCifre() {
    var ceas = document.getElementById("ceas");
    for (i = 0; i < 12; i++) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttributeNS(null, "x", 150 + 60 * Math.sin((i+1) * 2 * Math.PI / 12));
        text.setAttributeNS(null, "y", 150 - 60 * Math.cos((i+1) * 2 * Math.PI / 12));
        text.setAttributeNS(null, "style", "font: italic 10px serif; fill: red;");
        text.text = "A";
        ceas.appendChild(text);
    }
}

function seteazaPuncte() {
    var ceas = document.getElementById("ceas");
    for (i = 0; i < 60; i++) {
        var cerc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cerc.setAttributeNS(null, "cx", 150 + 138 * Math.sin((i+1) * 2 * Math.PI / 60));
        cerc.setAttributeNS(null, "cy", 150 - 138 * Math.cos((i+1) * 2 * Math.PI / 60));
        cerc.setAttributeNS(null, "r", ((i + 1) % 5) === 0 ? 5 : 3);
        cerc.setAttributeNS(null, "fill", "darkgray");
        ceas.appendChild(cerc);
    }
}

function pozitieLimba(centru, raza, cantitate, cantitate_maxima) {
    var punct = new Punct(0, 0);
    punct.x = centru.x + raza * Math.sin(cantitate * 2 * Math.PI / cantitate_maxima);
    punct.y = centru.y - raza * Math.cos(cantitate * 2 * Math.PI / cantitate_maxima);
    return punct;
}

function seteazaLimba(limba, pozitie) {
    limba.setAttribute("x2", pozitie.x);
    limba.setAttribute("y2", pozitie.y);
}

function seteazaCeas(centru, orar, minutar, secundar) {
    var oraCurenta = new OraCuZecimale(new Date());
    var poz_sec = pozitieLimba(centru, 130, oraCurenta.secunde, 60);
    var poz_min = pozitieLimba(centru, 120, oraCurenta.minute, 60);
    var poz_ore = pozitieLimba(centru, 90, oraCurenta.ore, 12);
    seteazaLimba(secundar, poz_sec);   
    seteazaLimba(minutar, poz_min);
    seteazaLimba(orar, poz_ore);
}