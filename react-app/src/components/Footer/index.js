import './footer.css'

const Footer = () => {

    return (
        <>
            <div className='footer-about-me-container'>
                <div className='footer-author-information-container'>
                    <div>About</div>
                    <div>Justin Yi</div>
                    <div>jyi@ucsb.edu</div>
                </div>
                <div className='footer-author-github-linkedin-links-container'>
                    <div>
                    <a href='https://github.com/JYi97'>Github</a>
                    </div>
                    <div>
                    <a href='https://www.linkedin.com/in/justin-yi-630b04225/'>LinkedIn</a>
                        </div>
                </div>
                <div className='footer-author-other-projects-links-container'>
                    <div>
                    <a href='https://sea-coin.herokuapp.com'>Sea-Coin</a>
                    </div>
                    <div>
                    <a href='https://filmdium.herokuapp.com/'>Filmdium</a>
                    </div>
                    <div>
                    <a href='https://raveland.herokuapp.com/'>RaveLand</a>
                    </div>
                </div>
                <div className='footer-technology-used-container'>
                    <div>
                        Javascript
                        Python
                    </div>
                    <div>
                        Flask
                        React
                    </div>
                    <div>
                        Redux
                        Docker
                    </div>
                    <div>
                        SQLAlchemy
                        PostgreSQL
                    </div>
                    <div>
                        HTML
                        CSS
                    </div>
                    <div>
                        Heroku
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer
