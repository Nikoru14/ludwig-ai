import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, onAuthStateChanged, signOut } from 'firebase/auth';
import LoginModal from "../components/LoginModal";
import { Button } from "react-bootstrap";

const Home = () => {
    const [modalShow, setModalShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated, userEmail, setUserEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    // Check authentication state on component mount
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserEmail(user.email);
            } else {
                setIsAuthenticated(false);
                setUserEmail('');
            }
        });
    }, [setIsAuthenticated, setUserEmail]);

    const handleLoginSubmit = async (email, password) => {
        try {
            const auth = getAuth();
            setPersistence(auth, browserSessionPersistence)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Handle successful login
            setIsAuthenticated(true);
            setUserEmail(userCredential.user.email);
            setModalShow(false); // Close the modal on successful login
            // navigate("/main-app");
        } catch (error) {
            console.error("Login error: ", error.message);
            // Handle login failure
            // Update state or UI to reflect the error
        }
    };

    const handleAppButtonClick = () => {
        if (isAuthenticated) {
            navigate('/main-app');
        } else {
            setLoginError("You have to log in first to access the app");
            setModalShow(true);
        }
    };

    // Function to display the user's email with masked characters
    const getDisplayEmail = () => {
        if (!userEmail) return '';
        const atIndex = userEmail.indexOf('@');
        if (atIndex === -1) return userEmail; // No '@' found

        const firstChar = userEmail[0];
        const lastCharBeforeAt = userEmail[atIndex - 1];
        const maskedPart = '*'.repeat(atIndex - 2);
        return `${firstChar}${maskedPart}${lastCharBeforeAt}${userEmail.substring(atIndex)}`;
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await signOut(getAuth());
            setIsAuthenticated(false);
            setUserEmail('');
            // Optionally navigate to a different page upon logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <div id="page-wrapper">
            {/* <!-- Header --> */}
            <header id="header" className="alt">
                <h1 id="logo"><Link to="/">Ludwig <span>von</span> AI</Link></h1>
                <nav id="nav">
                    <ul>
                        <li className="current"><Link to="/">Welcome</Link></li>
                        {isAuthenticated ? (
                            <>
                                <li><span style={{ fontWeight: "bold" }}>Account: {getDisplayEmail()}</span></li>
                                <li><Button style={{ backgroundColor: "red" }} onClick={handleLogout} className="red-button">Log Out</Button></li>
                            </>
                        ) : (
                            <>
                                <li><Button onClick={() => { setModalShow(true); setLoginError(""); }} className="button primary">Log In</Button></li>
                                <li><Link to="/signup" className="button secondary">Sign Up</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleLoginSubmit}
                externalError={loginError}
                setExternalError={setLoginError}
            />
            {/* <!-- Banner --> */}
            <section id="banner" style={{ paddingBottom: "200px" }}>
                {/* 
                <!--
                ".inner" is set up as an inline-block so it automatically expands
                in both directions to fit whatever's inside it. This means it won't
                automatically wrap lines, so be sure to use line breaks where
                appropriate (<br />).
                --> */}
                <div className="inner">

                    <header>
                        <h2>Ludwig von AI</h2>
                    </header>
                    <p>This is <strong>Ludwig von AI</strong>,
                        <br />
                        an Artificial Intelligence app
                        <br />
                        that will assist your creativity in piano composition.
                        <br />
                    </p>
                    <footer>
                        <ul className="buttons stacked">
                            <li><a href="#main" className="button fit scrolly">Tell Me More</a></li>
                        </ul>
                    </footer>

                </div>

            </section>

            {/* <!-- Main --> */}
            <article id="main" style={{ marginTop: "-150px" }}>
                <header className="special container">
                    <span className="fa-solid fa-piano-keyboard" style={{ fontSize: '100px' }}></span>
                    <h2>Discover <strong>Ludwig Von AI</strong>, Your AI-Powered Composition Assistant</h2>
                    <p>Step into the future of music with <strong>Ludwig Von AI</strong>.
                        <br />
                        Our advanced web-MIDI application doesn't just play and record MIDI
                        <br />
                        it breathes life into your piano compositions. With innovative LSTM-based AI models trained on a vast array of melodies,
                        <br />
                        Ludwig Von AI can generate new tunes from your initial notes, helping you overcome any creative block.</p>
                    <br />
                    <a onClick={handleAppButtonClick} className="button"> Check out our Web Application!</a>

                </header>

                {/* <!-- One --> */}
                <section className="wrapper style2 container special-alt" style={{ backgroundColor: "black" }}>
                    <div className="row gtr-50" style={{ marginLeft: "20px" }}>
                        <div className="col-8 col-12-narrower">

                            <header>
                                <h2>Interactive, Intuitive, Inspirational</h2>
                            </header>
                            <br />
                            <p>Whether you're looking to capture your spontaneous musical ideas, refine them, or explore uncharted melodic territories, <strong>Ludwig Von AI</strong> is your go-to companion. Connect your MIDI device, let your fingers dance on the keys, and watch as the AI harmoniously extends your melody. It's not just a tool—it's your creative partner in the art of music-making.</p>
                            <footer>
                                <ul className="buttons">
                                    <li><a href="#" className="button">Find Out More</a></li>
                                </ul>
                            </footer>

                        </div>
                        <div className="col-4 col-12-narrower imp-narrower">

                            <ul className="featured-icons">
                                <li><span className="fa-regular fa-microchip-ai" style={{ fontSize: "150px" }}></span></li>
                                <li><span className="fa-solid fa-file-music" style={{ fontSize: "150px" }}></span></li>
                                <li><span className="fa-duotone fa-list-music" style={{ fontSize: "150px" }}></span></li>
                                <li><span className="fa-regular fa-play" style={{ fontSize: "150px" }}></span></li>
                                <li><span className="fa-regular fa-brain-circuit" style={{ fontSize: "150px" }}></span></li>
                                <li><span className="fa-duotone fa-cloud-binary" style={{ fontSize: "150px" }}></span></li>
                            </ul>

                        </div>
                    </div>
                </section>

                {/* <!-- Two --> */}
                <section className="wrapper style1 container special">
                    <div className="row">
                        <div className="col-4 col-12-narrower">
                            <section>
                                <span className="icon solid featured fa-music"></span>
                                <header>
                                    <h3>Compose with AI</h3>
                                </header>
                                <p>Unleash your musical potential with Ludwig Von AI's intelligent composition tools. Let AI be your muse and guide your creative journey.</p>
                            </section>
                        </div>
                        <div className="col-4 col-12-narrower">
                            <section>
                                <span className="icon solid featured fa-brain"></span>
                                <header>
                                    <h3>Smart MIDI Integration</h3>
                                </header>
                                <p>Connect and interact with MIDI devices seamlessly. Record and perfect your pieces with a smart, responsive interface.</p>
                            </section>
                        </div>
                        <div className="col-4 col-12-narrower">
                            <section>
                                <span className="icon solid featured fa-robot"></span>
                                <header>
                                    <h3>Creative AI Models</h3>
                                </header>
                                <p>Explore new horizons in music with our LSTM-based AI models that can generate melodies and inspire new compositions.</p>
                            </section>
                        </div>
                    </div>
                </section>

                {/* <!-- Three --> */}
                <section className="wrapper style3 container special">
                    <header className="major">
                        <h2>Unleash Your Musical Imagination</h2>
                    </header>
                    <div className="row">
                        <div className="col-6 col-12-narrower">
                            <section>
                                <a href="#" className="image featured"><img src="images/pic01.jpg" alt="Innovative Interface" /></a>
                                <header>
                                    <h3>Innovative Interface</h3>
                                </header>
                                <p>Engage with a platform where ease of use meets the cutting edge. Our user-friendly interface ensures your focus stays on creativity.</p>
                            </section>
                        </div>
                        <div className="col-6 col-12-narrower">
                            <section>
                                <a href="#" className="image featured"><img src="images/pic02.jpg" alt="AI-Assisted Composition" /></a>
                                <header>
                                    <h3>AI-Assisted Composition</h3>
                                </header>
                                <p>Let artificial intelligence be your muse. Our advanced LSTM models offer musical insights and ideas, pushing the boundaries of your creativity.</p>
                            </section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-12-narrower">
                            <section>
                                <a href="#" className="image featured"><img src="images/pic03.jpg" alt="Rich MIDI Integration" /></a>
                                <header>
                                    <h3>Seamless MIDI Input</h3>
                                </header>
                                <p>Experience seamless integration with your MIDI setup. Record, and play back with a full suite of tools that speak the language of music.</p>
                            </section>
                        </div>
                        <div className="col-6 col-12-narrower">
                            <section>
                                <a href="#" className="image featured"><img src="images/pic04.jpg" alt="Immersive Musical Experience" /></a>
                                <header>
                                    <h3>Immersive Musical Experience</h3>
                                </header>
                                <p>Immerse yourself in a world where music and technology converge, resulting in a harmonious blend of sound and innovation.</p>
                            </section>
                        </div>
                    </div>
                    <footer className="major">
                        <ul className="buttons">
                            <li><a href="#" className="button">Explore More</a></li>
                        </ul>
                    </footer>
                </section>


            </article>

            {/* <!-- CTA --> */}
            <section id="cta">

                <header>
                    <h2>Ready to do <strong>something</strong>?</h2>
                    <p>Proin a ullamcorper elit, et sagittis turpis integer ut fermentum.</p>
                </header>
                <footer>
                    <ul className="buttons">
                        <li><div onClick={handleAppButtonClick} className="button primary">Try our App</div></li>
                        <li><a href="#" className="button">Back to Top ^</a></li>
                    </ul>
                </footer>

            </section>

            {/* <!-- Footer --> */}
            <footer id="footer">

                <ul className="icons">
                    <li><a href="#" className="icon brands circle fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon brands circle fa-facebook-f"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon brands circle fa-google-plus-g"><span className="label">Google+</span></a></li>
                    <li><a href="#" className="icon brands circle fa-github"><span className="label">Github</span></a></li>
                    <li><a href="#" className="icon brands circle fa-discord"><span className="label">Dribbble</span></a></li>
                </ul>

                <ul className="copyright">
                    <li>&copy; Ludwig</li>
                </ul>

            </footer>

        </div >
    );
};

export default Home;
