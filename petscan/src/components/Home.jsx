// import backgroundImage from './assets/images/bg1.PNG';

import { Link } from "react-router-dom";


const Home = () => {

    return (

        <>
            <div className="image-container">
                <img
                    src="/src/assets/images/bg1.PNG"
                    alt="background"
                    className="background-image"
                />
                <div className="row content g-0 ">
                    <div className="col-12 col-md-6 text-white">
                        <div className="hello-human gluten-font">HELLO <br /> HUMAN</div>
                        <div>
                            Login or Sign Up by <Link to="/auth/login" className="text-link">clicking here</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <img
                            src="/src/assets/images/cat_transparent.png"
                            alt="cat"
                            className="cat-image"
                        />
                    </div>
                </div>
            </div>

        </>
    )

}

export default Home;