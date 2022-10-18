import { Link } from "react-router-dom";
import background from '../img/background.jpg'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Loique Repairs</span></h1>
            </header>
            <hr className="line-hr"/>
            <main className="public_main">
                <p>Located in Beautiful in Dschang city, Loique Repairs provided a trained staff ready 
                    to meet your tech repair needs.
                </p>
                <address className="public_addr">
                    Loique Repairs <br/>
                    920 Dschang marche b<br/>
                    Minmito'o city<br/>
                    <a href="tel:+237670886288">(237) 670-886-288</a>
                </address>
                <br/>
                <p>Owner: Loique Nangna</p>
            </main>
            <hr className="line-hr"/>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}

export default Public
