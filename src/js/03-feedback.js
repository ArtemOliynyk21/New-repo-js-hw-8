var throttle = require('lodash.throttle');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

let userData = {};

const fnThrottle = throttle(handleSubmit, 500);

initForm();

form.addEventListener('submit', fnThrottle);
function handleSubmit(evt) {
  evt.preventDefault();
  if (email.value === '' || message.value === '') {
    Notify.failure('Всі поля мают бути заповнені!');
    return;
  }
  const formData = new FormData(form);
  formData.forEach((value, name) => {
    userData[name] = value;
  });
  console.log(userData);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  userData = {};
  Notify.success('Дані відправлені');
}

form.addEventListener('input', handleInput);

function handleInput(evt) {
  userData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function initForm() {
  let keepData = localStorage.getItem(STORAGE_KEY);
  if (keepData) {
    keepData = JSON.parse(keepData);
    Object.entries(keepData).forEach(([name, value]) => {
      userData[name] = value;
      form.elements[name].value = value;
    });
  }
}
