import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './signupform.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  console.log(user, 'THIS IS THE USER IN THE SIGNUP FORM')
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <div className='signup-form-image-container'>
        <div className='signup-page-image'>
          <img className='signup-page-icebear-image' src='https://mystickermania.com/cdn/stickers/we-bare-bears/ice-bear-cunning-face-512x512.png' alt=''></img>
        </div>
        <div className='signup-page-login-form'>
          <h2 className='signup-page-login-header'>
            Sign Up
          </h2>
          <form onSubmit={onSignUp}>
            <div className='signup-page-error-forms'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                className='signup-username-form-field'
                type='text'
                name='username'
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                className='signup-email-form-field'
                type='text'
                name='email'
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                className='signup-password-form-field'
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                className='signup-repeat-password-form-field'
                type='password'
                name='repeat_password'
                placeholder='Confirm Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className='signup-button-form-field' type='submit'>Sign Up</button>
          </form>
          <div className='signup-form-login-question'>
            Already have an account with Ice Bear?
            <NavLink className='signup-form-login-link' to='/login'>Log in</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
