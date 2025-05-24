import React from "react";
import { ProductItem } from "../../components";
import "./Product.css";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { useProduct } from "../../hooks";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { isLoading, product, error } = useProduct(productId);

  if (isLoading) {
    return <div className="content-centered">Loading...</div>;
  }

  if (error) {
    return (
      <NotFound message="The product you looking for could not be found" />
    );
  }

  return (
    <div>
      <section className="product-container">
        {product && <ProductItem product={product} />}
      </section>
      <section id="reviews">
        <h2>Reviews</h2>
        <dl style={{ marginTop: "20px" }}>
          {/* {product.reviews.length > 0 ? (
            product.reviews.map((item: User, index: number) => (
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
          )} */}
        </dl>
      </section>
      <section>
        <h2>Similar Items</h2>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {/* {products
            .filter(
              (item) =>
                item.id !== product.id &&
                item.category === product.category &&
                item.type === product.type
            )
            .map((item, index) => (
              <ProductGridItem key={index} item={item} />
            ))} */}
        </div>
      </section>
    </div>
  );
};

export default Product;
