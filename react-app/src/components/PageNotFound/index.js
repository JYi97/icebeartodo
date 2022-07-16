import './pagenotfound.css'
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
    const history = useHistory()

    setTimeout(() => {
        history.push('/home')
    }, 5000)

    return (
        <>
            <div className='page-not-found-content-container'>
                <div className='page-not-found-image-container'>
                    <img className='page-not-found-img' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a6bfa91a-e0f6-450e-a91f-62138f13b80f/de7iwl2-4594fd37-78b5-4c16-9483-c52105b342a8.png/v1/fill/w_600,h_642,strp/smushed_iced_bear_by_a1ong_de7iwl2-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQyIiwicGF0aCI6IlwvZlwvYTZiZmE5MWEtZTBmNi00NTBlLWE5MWYtNjIxMzhmMTNiODBmXC9kZTdpd2wyLTQ1OTRmZDM3LTc4YjUtNGMxNi05NDgzLWM1MjEwNWIzNDJhOC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UUvf56j4t-4JrqvrQAUw7RHu5qTLT4maptHV4LTFmNo' alt=''></img>
                    <div className='page-not-found-title-container'>
                        <div className='page-not-found-title'>
                            Ice Bear cannot find page.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PageNotFound
