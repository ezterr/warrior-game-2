"use strict";
const skillInput = document.querySelectorAll('input[type="number"]');
const skillsErrorContainer = document.querySelector('.error__container--skills');
const skillsCountContainer = document.querySelector('.points__container');
const nameInput = document.querySelector('input[name="name"]');
const nameErrorContainer = document.querySelector('.error__container--name');
// @ts-ignore
const submitBtn = document.querySelector('input[type="submit"]');
function checkPointsSum(numberInput) {
    return numberInput.reduce((a, b) => a + Number(b.value), 0);
}
function checkMinPointsCount(numberInput, min = 1) {
    const test = numberInput.filter((e) => e.value < min).length;
    console.log(test);
    return !test;
}
function changeMaxPoints(numberInput) {
    for (const element of numberInput) {
        const max = 10 - checkPointsSum(numberInput) + Number(element.value);
        element.setAttribute('max', String(max));
    }
}
function skillsValidate() {
    if (checkPointsSum([...skillInput]) === 10 && checkMinPointsCount([...skillInput])) {
        return true;
    }
    return false;
}
function nameValidate() {
    if (!nameInput.value || nameInput.value.trim().length < 3 || nameInput.value.length > 50) {
        return false;
    }
    return true;
}
// @ts-ignore
function validate() {
    if (nameValidate() && skillsValidate()) {
        submitBtn.disabled = false;
    }
    else {
        submitBtn.disabled = true;
    }
}
validate();
skillsCountContainer.innerText = 10 - checkPointsSum([...skillInput]);
changeMaxPoints([...skillInput]);
// skills validate
for (const skillField of skillInput) {
    skillField.addEventListener('change', () => {
        validate();
        skillsErrorContainer.innerText = '';
        if (!skillsValidate()) {
            skillsErrorContainer.innerText = 'Wszystkie punkty muszą być rozdane, a także każda umiejętność musi '
                + 'mieć co najmniej 1 punkt';
        }
        skillsCountContainer.innerText = 10 - checkPointsSum([...skillInput]);
        changeMaxPoints([...skillInput]);
    });
}
// name validate
nameInput.addEventListener('change', () => {
    validate();
    nameErrorContainer.innerText = '';
    if (!nameValidate()) {
        nameErrorContainer.innerText = 'Nazwa wojownika musi być tekstem, który zawiera co najmniej 3 znaki'
            + 'i nie przekracza 50 znaków';
    }
});
//# sourceMappingURL=add-warrior-validation.js.map