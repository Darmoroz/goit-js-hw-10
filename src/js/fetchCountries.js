const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(searchCountry) {
  return fetch(
    `${BASE_URL}${searchCountry}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .catch(error => console.log(error));
}

export { fetchCountries };
