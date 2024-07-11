import './Home.css';
import Header from '../components/Header';
import Weather from '../components/Weather';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home( {landingLocation} ) {
    const [location, setLocation] = useState(landingLocation);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    console.log(location)

    const searched = (event) => {
        event.preventDefault();
        setLocation(event.target.location.value);
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = "http://api.weatherapi.com/v1/forecast.json?key=aa73ecd7eba248959ed52809241007&q=" + location + "&days=7";
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    console.log(location)

    return (
        <div className="home">
            <Header searched={searched}></Header>
            {data && !loading && <Weather data={data}></Weather>}
            {loading && <div className='loading__container'><img src='assets/loading.png' alt='loading img' className='loading'></img></div>}
        </div>
    )
}

export default Home;