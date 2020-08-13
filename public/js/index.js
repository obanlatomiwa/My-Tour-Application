/* eslint-disable */

import '@babel/polyfill';
import displayMap from './mapBox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

//DOM
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutButton = document.querySelector('.nav__el--logout');
const updateUserDataForm = document.querySelector('.form-user-data');
const updateUserPassword = document.querySelector('.form-user-settings');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  console.log(locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutButton) logOutButton.addEventListener('click', logout);

if (updateUserDataForm)
  updateUserDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

  if (updateUserPassword)
  updateUserDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('name').value;
    const password = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('email').value;
    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
  });
