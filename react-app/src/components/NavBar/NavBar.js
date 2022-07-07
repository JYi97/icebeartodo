import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user)

  return (
    <>
    {currentUser ?  <nav className='navigation-bar'>
      <div className='navigation-bar-buttons'>
        <div>
          <NavLink className='navigation-bar-home-button' to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className='navigation-bar-users-button' to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <NavLink className='navigation-bar-upcoming-button' to='/upcoming' exact={true} activeClassName='active'>
            Upcoming
          </NavLink>
        </div>
        <div className='navigation-bar-logout-button,'>
          <LogoutButton />
        </div>
      </div>
    </nav> :   <nav className='navigation-bar'>
      <div className='navigation-bar-buttons'>
        <div>
          <NavLink className='navigation-bar-login-button' to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink className='navigation-bar-signup-button' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>}
    </>
  );
}

export default NavBar;