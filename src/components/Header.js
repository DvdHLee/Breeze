import './Header.css';
import { Link } from 'react-router-dom';

function Header({ searched }) {
    return (
        <div className="header">
            <nav>
                <Link to="/" className="header__container">
                    <img src="assets/breezelogo.png" alt="breezelogo" className="header__logo"></img>
                    <h2 className="header__title">Breeze</h2>
                </Link>
            </nav>
            <form className="header__search" onSubmit={searched}>
                <input type="text" id="location__input" name="location" placeholder='Location'></input>
                <input type="image" src="assets/search.png" name="submit" id="search__icon" alt='search img'></input>
            </form>
        </div>
    );
}

export default Header;