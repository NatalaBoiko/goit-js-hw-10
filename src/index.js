import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onUserRequest, DEBOUNCE_DELAY));

function onUserRequest(e) {
  const userRequest = e.target.value.trim();

  fetchCountries(userRequest)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

//=======================================

// fetch('https://restcountries.com/v2/name/CHINA')
//   .then(response => {
//     return response.json();
//   })
//   .then(name => {
//     console.log(name);
//   })
//   .catch(error => {
//     console.log(error);
//   });
