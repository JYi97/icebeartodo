import './splashpage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch();


    const demoUser = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'))

    }
    return (
        <>
            {currentUser ? history.push('/home') :
                <>
                    <h3>
                        Organize your chores and schedule so you can not only
                        get your work done but have time to relax like Ice Bear.
                    </h3>
                    <div>
                        <img src='https://i.pinimg.com/736x/49/77/3d/49773d3c22019de275e0e76e203310bb.jpg' alt=''></img>
                    </div>
                    <div>
                        <button className='splash-page-demo-user-button' type="submit" onClick={demoUser}>
                            Look at Ice Bear's
                        </button>
                        <div>
                            <NavLink className='splash-page-get-started-nav-link' to='/sign-up'>Get Started</NavLink>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default SplashPage
