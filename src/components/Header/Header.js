//rsc for shortcut
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';
import { useContext } from 'react';
import { userContext } from '../../App';


const Header = () => {
     const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <div className='header'>
           <img src={logo} alt=""/>
           <nav>
               <Link to="/shop">shop</Link>
               <Link to="/review">Review</Link>
               <Link to="/inventory">Manage Inventory</Link>
               <button onClick = {() => setLoggedInUser({})}>Sign out </button>
           </nav>
        </div>
    );
};

export default Header;