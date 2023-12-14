import React from 'react'
import logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Footer() {
    const navigate = useNavigate();
    const { openCart } = useCart();
    return (

        <footer>
            <div className='internal-links'>


                <Link to={"/"}>Home</Link>
                <Link to={"/new-arrivals"}>New Arrivals</Link>
                <Link >Releases</Link>
                <button onClick={openCart} >Your Cart</button>
                <Link>Your Favorites</Link>

                <Link>Join Mailinglist</Link>

            </div>
            <dl>
                <div>


                    <dt className='title'>
                        <div />
                        <h3>About Moons</h3>


                    </dt>

                    <dd>
                        <a>About Us</a>
                        <a>Career Opportunities</a>
                        <a>Privacy Policy</a>
                    </dd>
                </div>
                <div>


                    <dt className='title'>

                        <div />
                        <h3>Customer Support</h3>



                    </dt>
                    <dd>
                        <a>Ordering Help</a>
                        <a>Make a Suggestion</a>
                        <a>FAQ's</a>
                    </dd>
                </div>
                <div>


                    <dt className='title'>
                        <div />
                        <h3>Other Links</h3>

                    </dt>

                    <dd>
                        <a href="https://aacc.edu" target='_blank'>AACC</a>
                        <a href="https://instagram.com" target='_blank'>Instagram</a>
                        <a href="https://youtube.com" target='_blank'>YouTube</a>
                        <a href="https://facebook.com" target='_blank'>Facebook</a>

                        <a href="https://x.com" target='_blank'>X</a>

                    </dd>
                </div>
            </dl>


            <div className="copyright">
                <a href="index.html"><img className='logo' src={logo} alt="moons logo" /></a>
                <p>© 2023 Moons, Inc. All Rights Reserved</p>

            </div>


        </footer>
    )
}

export default Footer