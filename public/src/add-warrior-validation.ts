/* eslint-disable no-restricted-syntax */
const skillInput = document.querySelectorAll('input[type="number"]');
const skillsErrorContainer = document.querySelector('.error__container--skills');
const skillsCountContainer = document.querySelector('.points__container');

const nameInput = document.querySelector('input[name="name"]');
const nameErrorContainer = document.querySelector('.error__container--name');
// @ts-ignore
const submitBtn = document.querySelector('input[type="submit"]');

function checkPointsSum(numberInput: Element[]): number {
  return numberInput.reduce((a, b) => a + Number((b as any).value), 0);
}

function checkMinPointsCount(numberInput: Element[], min: number = 1): boolean {
  const test = numberInput.filter((e) => (e as any).value < min).length;
  console.log(test);
  return !test;
}

function changeMaxPoints(numberInput: Element[]) {
  for (const element of numberInput) {
    const max = 10 - checkPointsSum(numberInput) + Number((element as any).value);
    element.setAttribute('max', String(max));
  }
}

function skillsValidate(): boolean {
  if (checkPointsSum([...skillInput]) === 10 && checkMinPointsCount([...skillInput])) {
    return true;
  }

  return false;
}

function nameValidate(): boolean {
  if (!(nameInput as any).value || (nameInput as any).value.trim().length < 3 || (nameInput as any).value.length > 50) {
    return false;
  }

  return true;
}

// @ts-ignore
function validate() {
  if (nameValidate() && skillsValidate()) {
    (submitBtn as any).disabled = false;
  } else {
    (submitBtn as any).disabled = true;
  }
}

validate();
(skillsCountContainer as any).innerText = 10 - checkPointsSum([...skillInput]);
changeMaxPoints([...skillInput]);

// skills validate
for (const skillField of skillInput) {
  skillField.addEventListener('change', () => {
    validate();
    (skillsErrorContainer as any).innerText = '';

    if (!skillsValidate()) {
      (skillsErrorContainer as any).innerText = 'Wszystkie punkty muszą być rozdane, a także każda umiejętność musi '
          + 'mieć co najmniej 1 punkt';
    }

    (skillsCountContainer as any).innerText = 10 - checkPointsSum([...skillInput]);
    changeMaxPoints([...skillInput]);
  });
}

// name validate
(nameInput as any).addEventListener('change', () => {
  validate();
  (nameErrorContainer as any).innerText = '';

  if (!nameValidate()) {
    (nameErrorContainer as any).innerText = 'Nazwa wojownika musi być tekstem, który zawiera co najmniej 3 znaki'
        + 'i nie przekracza 50 znaków';
  }
});
