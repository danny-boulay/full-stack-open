import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const fetchWeather = async (lat, lon, countryName) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      setWeather(prevData => ({
        ...prevData,
        [countryName]: response.data
      }));
      console.log("Fetched weather for", countryName, response.data);
    }
    catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const handleFilterChange = (event) => {
    setFilteredCountries(event.target.value)
  }

  return (
    <>
     <Filter filteredCountries={filteredCountries} handleFilterChange={handleFilterChange} />
     <Countries countries={countries} filteredCountries={filteredCountries} fetchWeather={fetchWeather} weather={weather} />
    </>
  )
}

export default App
