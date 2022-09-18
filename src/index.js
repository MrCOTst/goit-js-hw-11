import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
// import countryCardsTpl from './templates/country-cards';
// import countryCardTpl from '../templates/country-card';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 1000;
const MIN_NUMBER_OF_COUNTRIES = 10;

document.querySelector('#search-box').placeholder="Please enter the name of the country";

const refs = {
  fetchCountryInput:document.querySelector('input'),
       countryList:document.querySelector('.country-list'),
       countryInfo:document.querySelector('.country-info'),
      };
 

    refs.fetchCountryInput.addEventListener("input", debounce(onInputText, DEBOUNCE_DELAY))


function onInputText() {
  let name = refs.fetchCountryInput.value.trim();
  if(name === '') {
    return (
      (refs.countryList.innerHTML = ''),
      (refs.countryInfo.innerHTML = '')
      );
  }
  fetchCountries(name)
  .then(response => {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if(response.length > MIN_NUMBER_OF_COUNTRIES) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (MIN_NUMBER_OF_COUNTRIES >= response.length && response.length > 1 ) {
      refs.countryList.insertAdjacentHTML('beforeend', countriesCards(response));
      } else {refs.countryInfo.insertAdjacentHTML('beforeend', oneCountryCard(response))
    }
  })
  .catch(() => {
    Notify.failure('Oops, there is no country with that name.');
    return[];
  });
}


function countriesCards(countries) {
    return countries
      .map(({ name, flags }) => {
        return `
        <li class="country-item">
        
        <img class="country-flag"
          src="${flags.svg}"
          alt="Flag of ${name.official}"
          width = 50px height = 50px
        />
        <h2 class="country-name">${name.official} </h2>
      </li>
      `;
      })
      .join("");
  };

    function oneCountryCard(countries) {
      return countries
        .map(({name, flags, capital, population, languages }) => {
          return  `
    <h1 class="search-country-name">${name.official}</h2>
    <img class="search-country-flag"
      src="${flags.svg}"
      alt="Flag of ${name.official}"
      width = 200px height = 100px
    />
    <p class="card-text">Capital:${capital} </p>
    <p class="card-text">Population:${population} </p>
    <p class="card-text">Languages:${Object.values(languages)} </p>`
        })
        .join("");
    };