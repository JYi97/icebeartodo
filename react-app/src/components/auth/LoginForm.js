import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <div className='login-form-image-container'>
        <div className='login-page-login-form'>
          <div>
            <h2>
              Log in
            </h2>
            <form onSubmit={onLogin}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <button type='submit'>Login</button>
            </form>
            <div>
              By continuing, you agree to Ice Bear's Terms of Service and Privacy Policy
            </div>
            <div>
              Don't have an account?
              <NavLink to={'/sign-up'}>Sign up</NavLink>
            </div>
          </div>
        </div>
        <div className='login-page-image'>
          <img src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-coffee-512x512.png' alt=''></img>
        </div>
      </div>

    </>
  );
};

export default LoginForm;
