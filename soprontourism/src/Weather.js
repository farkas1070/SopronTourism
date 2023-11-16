import React,{useState,useEffect} from 'react'
import MovieSeat from "./MovieSeat"
import { useNavigate } from "react-router-dom";

function HomeScreen() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const handleNavigateClick = () => navigate("/Weather");
    const handleNavigateClick2 = () => navigate("/");
    const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const parameterMapping = {
    date: 'Date',
    city: 'City',
    temperature_2m_max: 'Max. Temperature (2m)',
    temperature_2m_min: 'Min. Temperature (2m)',
    temperature_2m_mean: 'Mean Temperature (2m)',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    precipitation_sum: 'Precipitation sum',
    rain_sum: 'Rain',
    snowfall_sum: 'Snowfall',
    precipitation_hours: 'Precipitation Hours',
    windspeed_10m_max: 'Max. Windspeed (10m)',
    winddirection_10m_dominant: 'Dominant Wind Direction (10m)',
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://20.218.154.3:8080/api/forecast/city=${city}&date=${date}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  

  return (
    <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SopronTourism</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
       
        <li>
          <a href="#" onClick={()=>{handleNavigateClick2()}}  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Seats</a>
        </li>
        <li>
          <a href="#" onClick={()=>{handleNavigateClick()}} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Weather</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div>
      <h1>Your Data</h1>
      <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date (YYYY-MM-DD):
          <input type="text" value={date} onChange={handleDateChange} />
        </label>
        <br />
        <label>
          City (Budapest, Vienna, Sopron):
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
        <br />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>Weather for {city} on {date}:</h2>
          <table>
            <thead>
              <tr>
                <th>Mapped Value</th>
                <th>Actual Data</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(parameterMapping).map((key) => (
                <tr key={key}>
                  <td>{parameterMapping[key]}</td>
                  <td>{weatherData[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
</div>

  )
}

export default HomeScreen