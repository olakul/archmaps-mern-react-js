import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import '../App.css';
import DropdownField from './Dropdown';

export default function Navbar(props) {

  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    })
  }
//
  return (
    <ul className='navbar'>
      {props.user ? (
        <>
          <li>
            <Link to="/landmarks">Landmarks</Link>
          </li>
          <li>
            <Link to='/' onClick={() => handleLogout()}>Logout</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )
      }
      <li><DropdownField/></li>
    </ul >
  )
}
