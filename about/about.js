if (navigator.onLine) {
    console.log('You are online use our web site !');
} else {
    alert('You are ofline');
}



const header = document.querySelector('.site-header')
const queryString = window.location.search
const country = queryString.slice(1)
let grid = document.querySelector('.grid')
let select = document.querySelector('#selector')
let searchInput = document.querySelector('.search-input')
let darkMode = document.querySelector('.toggleBtn')
let img = document.querySelector('.img-section')
let box = document.querySelector('.box')
let texts = document.querySelector('.texts')

const api = `https://restcountries.com/v3.1/name/${country}`
async function requestApi(url) {
    try {

        box.classList.remove('hidden')
        const request = await fetch(url)
        const datas = await request.json()
        getData(datas)


    } catch (err) {
        console.log(err.message)
        box.innerHTML = ` <h1> Server is broken </h1>`
    }
}
requestApi(api)



function getData(datas) {
    box.classList.add('hidden')
    const allCountry = datas
    allCountry.forEach(data => {
        console.log(data);
        const { name, flags, capital, status, currencies, area, languages, tld, subregion, population, region } = data

        let headIcon = document.createElement('link')
        headIcon.setAttribute('rel', 'shortcut icon')
        headIcon.setAttribute('href', `${flags.png}`)
        let title = document.getElementById('title')
        title.innerHTML = `${name.common}`
        document.head.appendChild(headIcon)
        const objKey = Object.keys(languages)
        const cur = Object.keys(currencies)
        img.innerHTML = `
        <img src='${flags.png}' alt='country flag'>
        `
        texts.innerHTML = `   
       <div class='flex'>
       <div class='left-text'>
       <h1> ${name.common}</h1>
       <h4>Official name: ${name.official}</h4>
       <h4>Population: ${population}</h4>
       <h4>Region: ${region}</h4>
       <h4>Sub region: ${subregion}</h4>
       <h4>Capital: ${capital}</h4>
       </div>
       <div class='right'>
       <h4>Top level domain: ${tld[0]}</h4>
          <h4>Status: ${status}</h4>
       <h4>Languages: ${objKey} </h4>
       <h4>Currencies: ${cur} </h4>

    
       </div>
       </div>
       <h4 class='area'>Area: ${area}</h4>
       `
    })

}
darkMode.addEventListener('click', () => {
    document.body.classList.toggle('active')
    grid.classList.toggle('active')
    header.classList.toggle('active')
    texts.classList.toggle('active')
})