import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/getRefs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputSearchCountry.addEventListener(
  'input',
  debounce(onInput, DEBOUNCE_DELAY)
);

function onInput() {
  const country = refs.inputSearchCountry.value.trim();
  if (country !== '') {
    fetchCountries(country)
      .then(data => {
        showData(data);
      })
      .catch(error => showError(error));
  } else {
    clearAll();
  }
}

function showData(data) {
  clearAll();
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length === 1) {
    refs.countryInfo.insertAdjacentHTML(
      'afterbegin',
      data.map(markupInfoCountry)
    );
  }
  if (data.length > 1 && data.length <= 10) {
    refs.countryList.insertAdjacentHTML(
      'afterbegin',
      data.map(markupListCountry).join('')
    );
  }
}

function showError(error) {
  refs.inputSearchCountry.value = '';
  Notify.failure('Oops, there is no country with that name');
}

function clearAll() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function markupListCountry({ name: { official }, flags: { svg } }) {
  return `<li><img src="${svg}" alt="${official}" width="75"/><p class="country">${official}</p></li>`;
}

function markupInfoCountry({
  name: { official },
  flags: { svg },
  capital,
  population,
  languages,
}) {
  return `
	<div class="country__wrapper"><img src='${svg}' alt='${official}' width='75'/>
    <p class="country">${official}</p></div>
    <p><b>Capital: </b>${capital}</p>
    <p><b>Population: </b>${population}</p>
    <p><b>Languages: </b>${Object.values(languages)}</p>`;
}
