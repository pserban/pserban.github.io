setupLogic();
// console.log("A01");
function setupLogic() {
    var xc = 150;
    var yc = 150;
    var raza_secundar = 130; 
    var orar = document.getElementById("orar");
    var minutar = document.getElementById("minutar");
    var secundar = document.getElementById("secundar");

    window.setInterval(() => {
        var dataCurenta = new Date();
        var ore = dataCurenta.getHours() % 12
                + dataCurenta.getMinutes() / 60;
        var minute = dataCurenta.getMinutes()
                   + dataCurenta.getSeconds() / 60;
        var secunde = dataCurenta.getSeconds()
                    + dataCurenta.getMilliseconds() / 1000;
        var x2_secunde = xc + raza_secundar * Math.sin(secunde * 2 * Math.PI / 60);
        var y2_secunde = yc - raza_secundar * Math.cos(secunde * 2 * Math.PI / 60);
        secundar.setAttribute("x2", x2_secunde);
        secundar.setAttribute("y2", y2_secunde);
        // console.log(ore, minute, secunde);
    }, 50);
}