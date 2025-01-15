import React from "react";

import {
  About,
  ProductListItem,
  Category,
  Deal,
  Contact,
  HomeBanner,
} from "../../components";

import deals from "../../data/deals";
import { bannerImage1, bannerImage2, bannerImage3 } from "../../assets";
import { useCart } from "../../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  const { checkout } = useCart();
  if (checkout) {
    return <Navigate to={"/checkout"} />;
  }
  window.onload = () => {
    alert(
      "Today only — 10% off your purshase — Use promo code MYSTERYDEAL at checkout!"
    );
  };

  return (
    <div>
      <div>
        <HomeBanner srcset={[bannerImage3, bannerImage1, bannerImage2]} />

        <section id="new-deals">
          <h2>New Deals </h2>
          <div className="deals">
            {deals.map((item, index) => (
              <Deal
                key={index}
                color={item.color}
                titleA={item.titleA}
                titleB={item.titleB}
              />
            ))}
          </div>
        </section>

        <section id="new-arrivals">
          <h2>New Arrivals </h2>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="new-arrivals-scroll">
              <button className="shop-all-container">
                <p>SHOP ALL</p>

                <div
                  className="shop-all-btn"
                  onClick={() => navigate("/new-arrivals")}
                />
              </button>
              {products.map((item, index) => {
                if (item.isNew && index < 4) {
                  return (
                    <div className="new-arrival-item">
                      <img alt={item.name} src={item.srcset[0]} />
                      <button
                        onClick={() => navigate("/product", { state: item })}
                      >
                        {item.name}
                      </button>
                    </div>
                  );
                }
                return <></>;
              })}
            </div>
          </div>
        </section>
        <section id="categories">
          <Category type="men" />

          <Category type="women" />
        </section>

        <section id="top-kicks">
          <h2>Top Kicks</h2>

          <div className="products-list">
            {products
              .filter((item) => {
                const totalStars = item.reviews.reduce(
                  (stars, item) => item.stars + stars,
                  0
                );
                const averageStars = totalStars / item.reviews.length;
                return averageStars >= 4;
              })
              .map((item, index) => (
                <ProductListItem key={index} product={item} />
              ))}
          </div>
        </section>

        <section id="mailing-list">
          <h2>Never miss a drop.</h2>

          <p>Receive updates about new products and promotions </p>

          <button className="button-outlined">Join Mailinglist</button>
        </section>
        <section>
          <About />
        </section>

        <section>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default Home;
