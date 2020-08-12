/* eslint-disable */

import '@babel/polyfill';
import displayMap from './mapBox';
import { login, logout } from './login';

//DOM
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logOutButton = document.querySelector('.nav__el--logout');

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
 




