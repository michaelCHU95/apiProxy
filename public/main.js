const weatherResult = document.querySelector('.weather');
const myForm = document.querySelector('#weather-form');
const myCity = document.querySelector('#city-input');

// Fetching Data
const getData = async (city) => {

    const url = `/api?q=${city}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404') {
        alert('City Not Found');
    }

    if (data.cod === '401') {
        alert('Invalid API Key');
    }

    const displayData = {
        city: data.name,
        temp: TempConverter(data.main.temp)
    };

    Renderer(displayData);

};

// Convert Kelvin to Celsius
const TempConverter = (temp) => {
    return Math.ceil(temp - 273.15);
};

// Displaying Data on weatherResult
const Renderer = (data) => {

    // Displaying Weather Result on Browser
    weatherResult.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} Celsius`;

    // Clear the input bar 
    myCity.value = '';
};

// Event Listener for Form Submission
myForm.addEventListener('submit', (event) => {

    event.preventDefault();

    if (myCity === '') {
        alert('Please input a Valid City Name');
    } else {
        getData(myCity.value);
    }
});