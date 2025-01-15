import React from "react";
import { useLocation } from "react-router-dom";
import { products } from "../../data/products";
import { ProductItem, ProductGridItem } from "../../components";
import "./Product.css";

function ProductScreen() {
  const location = useLocation();
  const product = location.state;

  return (
    <div>
      <section id="product">
        <ProductItem product={product} />
      </section>
      <section id="reviews">
        <h2>Reviews</h2>
        <dl style={{ marginTop: "20px" }}>
          {product.reviews.length > 0 ? (
            product.reviews.map((item, index) => (
              <div key={index} style={{ marginBottom: "40px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <dt>{item.user.firstName + " " + item.user.lastName} </dt>

                  <div className="stars">
                    {Array(item.stars)
                      .fill("")
                      .map((_, index) => (
                        <span key={index}>&#9733;</span>
                      ))}
                  </div>
                </div>

                <dd style={{ textIndent: "3em" }}>{item.comment}</dd>
              </div>
            ))
          ) : (
            <p color={{ color: "gray" }}>
              No reviews yet. Be the first to say something about this product!
            </p>
          )}
        </dl>
      </section>
      <section>
        <h2>Similar Items</h2>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {products
            .filter(
              (item) =>
                item.id !== product.id &&
                item.category === product.category &&
                item.type === product.type
            )
            .map((item, index) => (
              <ProductGridItem key={index} product={item} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default ProductScreen;
