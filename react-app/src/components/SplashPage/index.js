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
                    <div className='splash-page-img-intro-container'>
                        <div>
                            <img src='https://i.pinimg.com/736x/49/77/3d/49773d3c22019de275e0e76e203310bb.jpg' alt=''></img>
                        </div>
                        <div>
                            Ice Bear is undoubtedly, the strongest, the cleverest, and, in some respects, the most
                            mature out of his brothers. He was able to rescue his older brothers from
                            certain death without too much hassle and is quick to jump into
                            action if he finds a threat arising. He cares for both of his brothers
                            dearly. He tends to do most of the chores of the house, though he doesn't
                            seem to mind this. Despite his willingness to pitch in where the others
                            don't, he still takes days off to relax and unwind. How does Ice Bear do all this?
                            Ice Bear uses Ice Bear's To-Do's to organize and sort activities.
                            Ice Bear can find time to relax after completing chores done and saving
                            my brothers brothers for the millionth time.
                            <div className='splash-page-buttons-container'>
                                <button className='splash-page-demo-user-button' type="submit" onClick={demoUser}>
                                    Demo Bear
                                </button>
                                <NavLink className='splash-page-get-started-nav-link' to='/sign-up'>Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default SplashPage
