import backgroundImage from '../assets/images/bg1.PNG';
import cat from '../assets/images/cat_transparent.png'


import { Link } from "react-router-dom";


const Home = () => {

    return (

        <>
            <div className="image-container">
                <img
                    src={backgroundImage}
                    alt="background"
                    className="background-image"
                />
                <div className="row content g-0 ">
                    <div className="col-12 col-md-6 text-white">
                        <div className="hello-human gluten-font">CIAO <br /> UMANO</div>
                        <div>
                            Effettua il login o registrati <Link to="/auth/login" className="text-link">cliccando qui</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <img src={cat} alt="puppies" className='dog-picture' />
                    </div>
                </div>
            </div>

        </>
    )

}

export default Home;