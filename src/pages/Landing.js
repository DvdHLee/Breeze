import './Landing.css';
import { useNavigate } from 'react-router-dom';

function Landing({ searched }) {
    const navigate = useNavigate();

    const submitted = (event) => {
        navigate("/Home");
        searched(event);
    };

    return (
        <div className='landing'>
            <div className='landing__container'>
                <img src='assets/breezelogo.png' alt='breeze logo' className='landing__logo'></img>
                <h2 className='landing__title'>Breeze</h2>
            </div>
            <h2 className='landing__subtitle'>A Weather App</h2>
            <form className="landing__search" onSubmit={submitted}>
                <input type="text" id="location__input" name="location" placeholder='Location'></input>
                <input type="image" src="assets/search.png" name="submit" id="search__icon" alt='search img'></input>
            </form>
        </div>
    )
}

export default Landing;