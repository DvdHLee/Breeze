import './Weather.css';

import { useState } from 'react';

function Weather({ data }) {
    const [isCelsius, setIsCelsius] = useState(false);
    const [showTemp, setShowTemp] = useState(true);
    const [day, setDay] = useState(0);

    const clickedTemp = () => {
        setShowTemp(true);
    }

    const clickedPrec = () => {
        setShowTemp(false);
    }

    const changedTemp = (event) => {
        const tempType = event.target.checked;
        setIsCelsius(tempType);
    }

    const utcSeconds = data.location.localtime_epoch;
    const d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNamesConcated = dayNames.concat(dayNames);
    const forecastdays = dayNamesConcated.slice(d.getDay(), d.getDay() + 7);


    const dayforecastsHours = ["12pm", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
    const dayforecasts = [];
    for (let i = 0; i < 24; i += 3) {
        dayforecasts.push(
            <div className='dayforecast' key={i}>
                {showTemp ? <p className='dayforecast__temp'>{!isCelsius ? data.forecast.forecastday[day].hour[i].temp_f : data.forecast.forecastday[day].hour[i].temp_c}</p> : <p className='dayforecast__prec'>{data.forecast.forecastday[day].hour[i].chance_of_rain}%</p>}
                <p className='dayforecast__time'>{dayforecastsHours[i / 3]}</p>
            </div>
        )
    }

    const selectDay = (id) => {
        setDay(id);
    }



    const weekforecasts = [];
    for (let i = 0; i < 7; i++) {
        weekforecasts.push(
            <div className='weekforecast' key={i}>
                <div>{forecastdays[i]}</div>
                <img src={data.forecast.forecastday[i].day.condition.icon} alt='forecast day img'></img>
                <div className='weekforecast__highlow'>
                    <p className='high'>{!isCelsius ? data.forecast.forecastday[i].day.maxtemp_f : data.forecast.forecastday[i].day.maxtemp_c}</p>
                    <p className='low'>{!isCelsius ? data.forecast.forecastday[i].day.mintemp_f : data.forecast.forecastday[i].day.mintemp_c}</p>
                </div>
                {i === day ? <input type='button' className='week__check selected' onClick={() => selectDay(i)} id={i}></input> : <input type='button' className='week__check' onClick={() => selectDay(i)} id={i}></input>}
            </div>
        )
    }

    return (
        <div className="weather">
            <div className='location__container'>
                <h2 className='location__name'>{data.location.name}</h2>
                <p className='location__extra'>{data.location.region}, {data.location.country}</p>
            </div>
            <div className='info__container'>
                <div className='temp__container'>
                    <img src={day === 0 ? data.current.condition.icon : data.forecast.forecastday[day].day.condition.icon} alt='weather icon' className='current__icon'></img>
                    <h2 className='current__temp'>{day === 0 ? !isCelsius ? data.current.temp_f : data.current.temp_c : !isCelsius ? data.forecast.forecastday[day].day.maxtemp_f : data.forecast.forecastday[day].day.maxtemp_c}</h2>
                    <div className='switch__container'>
                        <input type="checkbox" className="temp__switch" onChange={changedTemp}></input>
                        <h2 className='fahrenheit'>°F</h2>
                        <div className='divider'></div>
                        <h2 className='celsius'>°C</h2>
                    </div>
                </div>
                <div className='extra--info__container'>
                    <h2 className='local__time'>{dayNames[(day + d.getDay()) % 7]}</h2>
                    <p className='status'>{day === 0 ? data.current.condition.text : data.forecast.forecastday[day].day.condition.text}</p>
                    {day === 0 ? <p className='humidity'>Humidity: {data.current.humidity}%</p> : null}
                </div>
            </div>
            <div className='dayforecast__toggle'>
                {showTemp ? <input type="button" className='dayforecast__button dayforecast__selected' onClick={clickedTemp} value="Temperature"></input> : <input type="button" className='dayforecast__button' onClick={clickedTemp} value="Temperature"></input>}
                {showTemp ? <input type="button" className='dayforecast__button' onClick={clickedPrec} value="Precipitation"></input> : <input type="button" className='dayforecast__button dayforecast__selected' onClick={clickedPrec} value="Precipitation"></input>}
            </div>
            <div className='dayforecast__container'>
                {dayforecasts}
            </div>
            <div className='weekforecast__container'>{weekforecasts}</div>
        </div>
    );
}

export default Weather;