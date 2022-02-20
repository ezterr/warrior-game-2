"use strict";
// @ts-ignore
const submitBtn = document.querySelector('input[type="submit"]');
const selectOne = document.querySelector('select[name="warriorOne"]');
const selectTwo = document.querySelector('select[name="warriorTwo"]');
const errorContainer = document.querySelector('.error--validation');
function validate() {
    if (selectOne.value === selectTwo.value
        || !selectOne.value
        || !selectTwo.value) {
        submitBtn.disabled = true;
        return false;
    }
    submitBtn.disabled = false;
    return true;
}
// validate();
//
// (selectOne as any).addEventListener('change', () => {
//   if (!validate()) {
//     (errorContainer as any).innerText = 'Musisz wybrać dwóch różnych wojowników';
//   } else {
//     (errorContainer as any).innerText = '';
//   }
// });
//
// (selectTwo as any).addEventListener('change', () => {
//   if (!validate()) {
//     (errorContainer as any).innerText = 'Musisz wybrać dwóch różnych wojowników';
//   } else {
//     (errorContainer as any).innerText = '';
//   }
// });
//# sourceMappingURL=arena-validation.js.map