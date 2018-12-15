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

    document.getElementById("ceas").style.visibility = "visible";
});

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