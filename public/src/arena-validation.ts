// @ts-ignore
const submitBtn = document.querySelector('input[type="submit"]');
const selectOne = document.querySelector('select[name="warriorOne"]');
const selectTwo = document.querySelector('select[name="warriorTwo"]');
const errorContainer = document.querySelector('.error--validation');

function validate(): boolean {
  if (
    (selectOne as any).value === (selectTwo as any).value
    || !(selectOne as any).value
    || !(selectTwo as any).value
  ) {
    (submitBtn as any).disabled = true;
    return false;
  }

  (submitBtn as any).disabled = false;
  return true;
}

validate();

(selectOne as any).addEventListener('change', () => {
  if (!validate()) {
    (errorContainer as any).innerText = 'Musisz wybrać dwóch różnych wojowników';
  } else {
    (errorContainer as any).innerText = '';
  }
});

(selectTwo as any).addEventListener('change', () => {
  if (!validate()) {
    (errorContainer as any).innerText = 'Musisz wybrać dwóch różnych wojowników';
  } else {
    (errorContainer as any).innerText = '';
  }
});
