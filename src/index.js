import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListTpl from './templates/country-list.hbs';
import countryInfoTpl from './templates/country-info.hbs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const searchQery = e.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  fetchCountries(searchQery)
    .then(response => {
      console.log(response.length);
      if (response.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (response.length >= 2 && response.length <= 10) renderCountryList(response);
      if (response.length === 1) {
        renderCountryInfo(response);
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderCountryList(name) {
  const countryListMarkup = countryListTpl(name);
  countryList.innerHTML = countryListMarkup;
}

function renderCountryInfo(name) {
  const countryInfotMarkup = countryInfoTpl(name);
  countryInfo.innerHTML = countryInfotMarkup;
}
