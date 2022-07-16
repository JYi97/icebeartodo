import './wrongpage.css'
// import { useHistory } from 'react-router-dom'

const WrongPage = () => {
    // const history = useHistory()

    // setTimeout(() => {
    //     history.push('/home')
    // }, 5000)


    return (
        <>
            <div className='wrong-page-details-page-container'>
                <div className='wrong-page-img-container'>
                    <img className='wrong-page-image' src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-crab-512x512.png' alt=''></img>
                    <div className='wrong-page-explanation-container'>
                        <div className='wrong-page-explanation'>
                            Ice Bear went to the wrong page.
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default WrongPage
