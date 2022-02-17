"use strict";
const fightLogs = document.querySelectorAll('.fight__log__container');
const nextBtn = document.querySelector('.next__button');
const previousBtn = document.querySelector('.previous__button');
for (const fightLog of fightLogs) {
    fightLog.classList.add('fight__log--disable');
}
// eslint-disable-next-line no-undef
function toggleLog(index, logs) {
    if (index < fightLogs.length && index >= 0) {
        for (const fightLog of logs) {
            fightLog.classList.add('fight__log--disable');
        }
        fightLogs[index].classList.toggle('fight__log--disable');
    }
}
let logIndex = 0;
toggleLog(logIndex, fightLogs);
nextBtn.addEventListener('click', () => {
    logIndex++;
    toggleLog(logIndex, fightLogs);
});
previousBtn.addEventListener('click', () => {
    logIndex--;
    toggleLog(logIndex, fightLogs);
});
//# sourceMappingURL=fight-result.js.map