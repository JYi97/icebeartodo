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
                            <img src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-axe-512x512.png'></img>
                        </div>
                        <div className='splash-page-intro-paragraph-container'>
                            <div className='splash-page-intro-paragraph'>
                                Ice Bear is undoubtedly, the strongest, the cleverest, and, in some respects, the most
                                mature out of his brothers. He was able to rescue Grizzly and Panda from
                                certain death without too much hassle and is quick to jump into
                                action if he finds a threat arising. But even Ice Bear has his limits. He tends to do most of the chores of the house, though he doesn't
                                seem to mind this. However, it is stressful for him to keep track of all of his activities and hard to remember
                                what he has to do while looking after his brothers. Check out what Ice Bear uses to make sure he
                                finishes all his tasks after saving his brothers for the millionth time.
                                <div className='splash-page-buttons-container'>
                                    <button className='splash-page-demo-user-button' type="submit" onClick={demoUser}>
                                        Demo Bear
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src='https://s3.getstickerpack.com/storage/uploads/sticker-pack/ice-bear/sticker_25.png?afc541aae29090d288eebe018a8f726c&d=200x200' alt=''></img>
                        </div>
                    </div>
                    <div className='splash-page-img-answer-container'>

                        <div>
                            <img src='https://s3.getstickerpack.com/storage/uploads/sticker-pack/ice-bear-2/sticker_3.png?c21e67342864f56123da7430333b1678&d=200x200' alt=''></img>
                        </div>
                        <div className='splash-page-answer-paragraph-container'>
                            <div className='splash-page-answer-paragraph'>
                                Despite his willingness to pitch in where the others
                                don't, he still takes days off to relax and unwind.
                                How does Ice Bear find the time to do all this?
                                Ice Bear uses Ice Bear's To-Do's to organize and sort his activities into any folder he wants.
                                So Ice Bear can easily keep track of what he has to do for the current day, upcoming days,
                                and even what he did in in the past in his history tab. Start now and keep track of your activities
                                like Ice Bear.
                                <div className='splash-page-get-started-nav-link-container'>
                                    <NavLink className='splash-page-get-started-nav-link' to='/sign-up'>Get Started</NavLink>
                                </div>

                            </div>
                        </div>
                        <div>
                            <img src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-refrigerator-512x512.png' alt=''></img>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default SplashPage
