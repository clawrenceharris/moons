import React, { useEffect } from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Product from '../../components/ProductItem'
import Footer from '../../components/Footer'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { products } from '../../data/products'
import ProductListItem from '../../components/ProductListItem'
import ProductGridItem from '../../components/ProductGridItem'

function ProductScreen() {
    const { checkout } = useCart();
    const location = useLocation();
    const product = location.state;




    return (
        <body>
            <Header />

            <Navigation />

            <main>
                <section id='product'>
                    <Product product={product} />
                </section>
                <section id='reviews'>
                    <h2>Reviews</h2>
                    <dl style={{ marginTop: '20px' }}>
                        {product.reviews.length > 0 ? product.reviews.map((item, index) => (
                            <div key={index} style={{ marginBottom: '40px' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <dt>{item.user.firstName + " " + item.user.lastName} </dt>


                                    <div className='stars'>
                                        {Array(item.stars).fill('').map((_, index) => (
                                            <span key={index}>&#9733;</span>
                                        ))}
                                    </div>
                                </div>

                                <dd style={{ textIndent: '3em' }}>{item.comment}</dd>
                            </div>
                        ))

                            :
                            <p color={{ color: 'gray' }}>No reviews yet. Be the first to say something about this product!</p>
                        }

                    </dl>

                </section>
                <section>
                    <h2>Similar Items</h2>
                    <div style={{ display: 'flex', overflowX: 'auto' }}>


                        {
                            products.filter(item => item.id != product.id && item.category === product.category && item.type == product.type)
                                .map((item, index) => (

                                    <ProductGridItem key={index} product={item} />



                                ))
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </body>
    )
}

export default ProductScreen