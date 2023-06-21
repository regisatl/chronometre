'use strict'

/*
1 - déclarer des variables 
2 - récupérer les éléments de déclenchement et d'arrêt
3 - récupérer l'éléments html où afficher  le chronomètre

    - Au clic du button start, le chronomètre commence par compter (setTimeout)
        - La tierce compte de 0 à 59 puis
        - La seconde s'incrémente de 1. Quand elle atteint 60,
        - La minute s'incrémente de 1 et la seconde retourn à 00.
    - Au clic du boutton stop, le chronomètre s'arr$ete (clearTimeout)

4 - on incrémente les tierces;
si elles atteignent 60, on réinitialise à 0 puis on incrémente la minute.


*/

/* Mise en place de l'écouteurs d'évènements global*/
document.addEventListener("DOMContentLoaded", function () {

    const chrono = document.getElementById("chrono");
    const reset = document.getElementById('Reset');
    const stop = document.getElementById('Stop');
    const start = document.getElementById('Start');

    let millisecondes = 0;
    let secondes = 0;
    let minutes = 0;
    let heures = 0;

    let timeOutId = 10;
    let interval;
    let pause = true;

    /* La fonction chronomètre permettant de faire marcher le comptage*/
    start.addEventListener("click", () => {
        if (pause) {
            pause = false;
            interval = setInterval(() => {
                start.disabled = true;
                millisecondes = parseInt(millisecondes);
                secondes = parseInt(secondes);
                minutes = parseInt(minutes);
                heures = parseInt(heures);

                millisecondes++;

                if (millisecondes > 59) {
                    millisecondes = 0;
                    secondes++;
                }
                if (secondes > 59) {
                    secondes = 0;
                    minutes++;
                }
                else if (minutes > 59) {
                    minutes = 0;
                    heures++;
                }
                else if (heures > 24) {
                    heures++;
                    heures = 0;
                    minutes = 0;
                    secondes = 0;
                    millisecondes = 0;
                }

                /* Affichage du compteurs sur la page HTML */

                millisecondes = (millisecondes < 10) ? "0" + millisecondes : millisecondes;

                secondes = (secondes < 10) ?  "0" + secondes : secondes;

                minutes = (minutes < 10) ? "0" + minutes : minutes;

                heures = (heures < 10) ?  "0" + heures : heures;

                chrono.innerText = (`${heures}: ${minutes}: ${secondes}: ${millisecondes}`);
            }, timeOutId);
        }
    });

    stop.addEventListener("click", () => {
        if (!pause) {
            pause = true;
            start.disabled = false;
            stop.disabled = true;
            start.innerText = "continue";
            clearInterval(interval);
        }
    });

    reset.addEventListener("click", () => {
        pause = true;
        chrono.innerText = "00: 00: 00: 00";
        start.innerText = "Start";
        start.disabled = false;
        stop.disabled = false;
        clearInterval(interval);
        millisecondes = 0;
        secondes = 0;
        minutes = 0;
        heures = 0;
    });

});
