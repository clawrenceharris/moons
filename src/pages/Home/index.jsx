import React from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Deal from '../../components/Deal'
import Category from '../../components/Category'
import ProductListItem from '../../components/ProductListItem'
import About from '../../components/About'
import Contact from '../../components/Contact'
import Banner from '../../components/HomeBanner'
import Footer from '../../components/Footer'
import deals from '../../data/deals'
import bannerImage1 from '../../assets/images/moon-walker.jpeg'
import bannerImage2 from '../../assets/images/moon-walker2.jpg'
import bannerImage3 from '../../assets/images/moon-walker3.jpeg'
import { useCart } from '../../context/CartContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
const Home = () => {
    const navigate = useNavigate();
    const { checkout } = useCart();
    if (checkout) {
        return <Navigate to={"/checkout"} />
    }
    window.onload = () => {
        alert('Today only — 10% off your purshase — Use promo code MYSTERYDEAL at checkout!')
    }

    return (
        <body >
            <Header />



            <Navigation activeLink={"home"} />

            <main>

                <Banner srcset={[bannerImage3, bannerImage1, bannerImage2]} />



                <section id='new-deals'>


                    <h2>New Deals </h2>
                    <div className='deals'>

                        {
                            deals.map((item, index) => (
                                <Deal key={index} color={item.color} titleA={item.titleA} titleB={item.titleB} />

                            ))
                        }


                    </div>
                </section>

                <section id='new-arrivals'>
                    <h2>New Arrivals </h2>

                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <div className='new-arrivals-scroll'>
                            <button className='shop-all-container' >


                                <p>SHOP ALL</p>

                                <div className='shop-all-btn' onClick={() => navigate("/new-arrivals")} />




                            </button>
                            {

                                products.map((item, index) => {
                                    if (item.isNew && index < 4) {
                                        return (
                                            <div className='new-arrival-item'>
                                                <img alt={item.name} src={item.srcset[0]} />
                                                <button onClick={() => navigate("/product", { state: item })}>{item.name}</button>

                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                    </div>
                </section>
                <section id='categories'>

                    <Category type="men" />

                    <Category type="women" />

                </section>

                <section id='top-kicks'>
                    <h2>Top Kicks</h2>

                    <div className="products-list">
                        {products.filter(item => {
                            const totalStars = item.reviews.reduce((stars, item) => item.stars + stars, 0);
                            const averageStars = totalStars / item.reviews.length;
                            return averageStars >= 4
                        }).map((item, index) => (
                            <ProductListItem key={index} product={item} />
                        ))}



                    </div>
                </section>

                <section id='mailing-list'>
                    <h2>Never miss a drop.</h2>


                    <p>Receive updates about new products and promotions </p>

                    <button className='button-outlined'>Join Mailinglist</button>


                </section>
                <section>
                    <About />
                </section>

                <section>
                    <Contact />

                </section>
            </main>


            <Footer />

        </body >
    )
}

export default Home