# apiProxy
apiProxy is a proxy server that used to hide users' API Key, restricts the number of requests within a certain period and implemented time-based caching to improve response time.

## Demo
![Demo](public/demo.PNG)

I had built a simple demo by calling weather data of cities in United States from OpenWeatherMap API. Users are able to access the weather data from ***http://host/api?q=CityName*** without exposing the API Key.