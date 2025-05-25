import React from "react";

import { About, ProductListItem, Category } from "../../components";

import { useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "./Home.css";
import SeasonalPicks from "../../components/SeasonalPicks/SeasonalPicks";
const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        {/* <HomeBanner srcset={[bannerImage3, bannerImage1, bannerImage2]} /> */}

        {/* <section id="featured">
          <h2>Featured</h2>
          <div className="content-row">
            <img src={require("../../assets/images/featured1.jpeg")} alt="" />
            <img src={require("../../assets/images/featured2.jpeg")} alt="" />
          </div>
        </section> */}

        <section id="new-arrivals">
          <h2>New Arrivals </h2>

          <div className="scroll-content content-body">
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
                  <div key={item.id} className="new-arrival-item">
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
        </section>
        <section id="categories">
          <Category category="mens" />

          <Category category="womens" />
        </section>

        <section id="top-kicks">
          <h2>Top Kicks</h2>

          <div className="content-body scroll-content">
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

        <section id="seasonal-picks">
          <h2>Seasonal Picks</h2>

          <SeasonalPicks />
        </section>

        <section id="mailing-list">
          <h2>Never miss a drop.</h2>
          <div className="content-body">
            <p>
              Join our mailing list to get exclusive access to new products.
            </p>

            <form action="">
              <input
                className="text-input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
              <label htmlFor="email" className="hidden">
                Enter your email
              </label>

              <button className="button-outlined">Join Mailinglist</button>
            </form>
          </div>
        </section>
        <section>
          <About />
        </section>
      </div>
    </div>
  );
};

export default Home;
