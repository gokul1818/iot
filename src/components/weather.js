// src/components/Weather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import your CSS file

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '0293b6766a61ed2168438f018365cd61'; // Replace with your OpenWeatherMap API key

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=${API_KEY}&units=metric`);
                setWeather(response.data);
            } catch (err) {
                setError("Could not fetch weather data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={`weather-container `}>
            {!loading &&
                <>
                    <div className='d-flex align-items-center justify-content-between' >

                        <p className='weather-temperature m-0'>{weather.main.temp} °C</p>
                        <h5 className='m-0'>{weather.name}</h5>
                    </div>
                    <div className='d-flex align-items-center'>

                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                            className="weather-icon"
                        />
                        <p className='m-0'>{weather.weather[0].description}</p>
                    </div>
                </>
            }
        </div>
    );
};

export default Weather;
