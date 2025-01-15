import React from "react";
import bannerImage from "../../assets/images/new-arrivals-banner.jpg";
import { ProductGridItem } from "../../components";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { Navigate } from "react-router-dom";
import "./NewArrivals.css";

function NewArrivals() {
  const { checkout } = useCart();
  if (checkout) {
    return <Navigate to={"/checkout"} />;
  }
  return (
    <div>
      <div className="new-arrivals-banner">
        <div className="banner">
          <img
            style={{ width: "100%", height: "auto" }}
            id="banner-image"
            src={bannerImage}
            alt="moon walker shoes"
          />
          <div className="overlay">
            <div style={{}} className="text-container">
              <h1
                style={{
                  width: "200px",
                  color: "white",
                  borderBottom: "5px solid #E70007",
                }}
              >
                New for You!
              </h1>
              <p style={{ marginTop: "20px" }}>
                Check out these new arrivals we know you'll love.
              </p>
            </div>
            <span>
              <a href="#new-arrivals">SHOP NOW</a>
            </span>
          </div>
        </div>
      </div>
      <section id="new-arrivals-grid">
        {products
          .filter((item) => item.isNew)
          ?.map((item, index) => (
            <ProductGridItem key={index} product={item} />
          ))}
      </section>
    </div>
  );
}

export default NewArrivals;
