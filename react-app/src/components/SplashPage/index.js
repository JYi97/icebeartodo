import './splashpage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch();


    const demoUser = async(e) => {
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
                        <button className='splash-page-demo-user-button' type="submit" onClick={demoUser}>
                            Look at Ice Bear's
                        </button>
                    </div>
                </>}
        </>
    )
}

export default SplashPage
