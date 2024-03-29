import './footer.css'

const Footer = () => {

    return (
        <>
            <div className='footer-about-me-container'>
                <div className='footer-author-information-container'>
                    <div className='footer-author-about'>About</div>
                    <div className='footer-author-full-name'>Justin Yi</div>
                    <div className='footer-author-email'>jyi@ucsb.edu</div>
                </div>
                <div className='footer-author-github-linkedin-links-container'>
                    <div>
                        <a className='footer-author-github-link' href='https://github.com/JYi97'>Github</a>
                    </div>
                    <div>
                        <a className='footer-author-linkedin-link' href='https://www.linkedin.com/in/justin-yi-630b04225/'>LinkedIn</a>
                    </div>
                </div>
                <div className='footer-author-other-projects-links-container'>
                    <div>
                        <a className='footer-author-seacoin-project-link' href='https://sea-coin.herokuapp.com'>Sea</a>
                    </div>
                    <div>
                        <a className='footer-author-filmdium-project-link' href='https://filmdium.herokuapp.com/'>Filmdium</a>
                    </div>
                    <div>
                        <a className='footer-author-raveland-project-link' href='https://raveland.herokuapp.com/'>RaveLand</a>
                    </div>
                </div>
                <div className='footer-technology-used-container'>
                    <div className='footer-technology-jrr'>
                        Javascript
                        React
                        Redux
                    </div>
                    <div className='footer-technology-pfd'>
                        Python
                        Flask
                        Docker
                    </div>
                    <div className='footer-technology-sql'>
                        SQLAlchemy
                        PostgreSQL
                    </div>
                    <div className='footer-technology-hch'>
                        HTML
                        CSS
                        Heroku
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
