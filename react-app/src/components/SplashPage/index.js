import './splashpage.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SplashPage = () => {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()
    return (
        <>
        {currentUser ? history.push('/home') : <h3>
                Organize your chores and schedule so you can not only
                 get your work done but have time to relax like Ice Bear.
            </h3> }
        </>
    )
}

export default SplashPage
