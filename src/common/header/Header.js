import './Header.css';
import React from 'react';
import logo from './logo.svg';

class Header extends React.Component{
    render(){
        return <div className='header'>
                 <img src={logo} className='headerLogo' alt='Logo'></img>
               </div>
    }
}
export default Header;