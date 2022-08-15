import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const error = []
    if (email && !email.includes("@")) error.push('Ice Bear needs valid email.')
    setErrors(error)
  }, [email])

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

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))

}

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    // <>
    //   <div className='login-form-image-container'>
    //     <div className='login-page-image'>
    //       <img src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-coffee-512x512.png' alt=''></img>
    //       <div className='login-page-login-form'>
    //         <div>
    //           <h2>
    //             Log in
    //           </h2>
    //           <form onSubmit={onLogin}>
    //             <div>
    //               {errors.map((error, ind) => (
    //                 <div key={ind}>{error}</div>
    //               ))}
    //             </div>
    //             <div>
    //               <input
    //                 className='login-email-form-field'
    //                 name='email'
    //                 type='text'
    //                 placeholder='Email'
    //                 value={email}
    //                 onChange={updateEmail}
    //               />
    //             </div>
    //             <div>
    //               <input
    //                 className='login-password-form-field'
    //                 name='password'
    //                 type='password'
    //                 placeholder='Password'
    //                 value={password}
    //                 onChange={updatePassword}
    //               />
    //             </div>
    //             <button type='submit'>Login</button>
    //           </form>
    //           <div>
    //             By continuing, you agree to Ice Bear's Terms of Service and Privacy Policy
    //           </div>
    //           <div>
    //             Don't have an account?
    //             <NavLink to={'/sign-up'}>Sign up</NavLink>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </>
    <>
      <div className='login-form-image-container'>
        <div className='login-page-login-form'>
          <div>
            <h2 className='login-page-login-header'>
              Log in
            </h2>
            <form onSubmit={onLogin}>
              <div >
                {errors.map((error, ind) => (
                  <div className='login-page-error-forms' key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  className='login-email-form-field'
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  className='login-password-form-field'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <button className='login-button-form-field' type='submit'>Log In</button>
            <button className='login-page-demo-user-button' type="submit" onClick={demoUser}>Demo Bear</button>
            </form>
            <div className='login-form-term-agreement'>
              By continuing, you agree to Ice Bear's Terms of Service and Privacy Policy
            </div>
            <div className='login-form-signup-question'>
              Don't have an account?
              <NavLink className='login-form-signup-link' to='/sign-up'>Sign up</NavLink>
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
