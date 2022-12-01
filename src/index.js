import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountries } from './js/fetchCountries'
import { renderCountryInfo, renderCountryList } from './js/template'

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


refs.searchBox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY))

function inputCountry() {
    const name = refs.searchBox.value.trim()
    if (name === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
    }

    fetchCountries(name)
        .then(countries => {
            refs.countryList.innerHTML = ''
            refs.countryInfo.innerHTML = ''
            if (countries.length === 1) {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
                refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
            } else if (countries.length >= 10) {
                alertTooManyMatches()
            } else {
                refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
            }
        })
        .catch(alertWrongName)
}

function alertWrongName() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
