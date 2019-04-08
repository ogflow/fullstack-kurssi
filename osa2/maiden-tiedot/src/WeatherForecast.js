import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherForecast = ({ cityName }) => {
  const [ weather, useWeather ] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=96386c639a6215038ef5102bcb99baa9`)
      .then(({ data }) =>
        useWeather(data)
      )
  }, [])

  return (
    <>
    { weather
      ? <div>
          <h2>Weather in {cityName}</h2>
          <p>
            <b>temperature: </b>
            {weather.main.temp} Celcius
          </p>
          <p>
            <b>wind: </b>
            {weather.wind.speed} kph
          </p>
        </div>
      : 'loading...' }
    </>
  )
}

export default WeatherForecast