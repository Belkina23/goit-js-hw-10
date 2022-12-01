export { renderCountryInfo, renderCountryList };

function renderCountryList(countries) {
    const markup = countries
        .map(({ name, flags }) => {
            return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}">
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
        })
        .join('')
    return markup
}

function renderCountryInfo(countries) {
    const markup = countries
        .map(({ capital, population, languages }) => {
            return `
        <ul class="country-info__list">
            <li class="country-info__item"><b>Capital: </b>${capital}</li>
            <li class="country-info__item"><b>Languages: </b>${Object.values(languages).join(', ')}</li>
            <li class="country-info__item"><b>Population: </b>${population} of persons</li>
        </ul>
        `
        })
        .join('')
    return markup
}