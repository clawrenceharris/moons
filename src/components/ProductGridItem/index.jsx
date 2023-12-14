import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utilities/formatCurrency';

function ProductGridItem({ product }) {
    return (
        <Link to={"/product"} state={product} className='product-grid-item'>
            <div className='product-top'>
                <div className='badge-container'>
                    {product.isNew && <span className='new-badge'>NEW</span>}
                    {product.salePrice > 0 && <span className='sale-badge'>SALE</span>}
                </div>

                <img src={product.srcset[0]} alt={product.name} />
            </div>

            <div className="product-bottom">

                <h3>{product.name}</h3>
                <p className='type'>{product.type}</p>

                {product.salePrice > 0 ? <p className='price' > <span className='old-price'>{formatCurrency(product.price)} </span>  <span className='sale-price'>{formatCurrency(product.salePrice)}</span></p>
                    :
                    <p className='price'>{formatCurrency(product.price)}</p>

                }

                {
                    product.reviews.length > 0 &&
                    <div className='stars'>
                        {Array(Math.round(product.reviews.reduce((stars, item) => item.stars + stars, 0) / product.reviews.length)).fill('').map((_, index) => (
                            <span key={index}>&#9733;</span>
                        ))}
                    </div>

                }


            </div>


        </Link>
    )
}

export default ProductGridItem