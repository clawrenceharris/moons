import React from "react";
import { Link } from "react-router-dom";
import "./NewArrivals.css";

const NewArrivals: React.FC = () => {
  return (
    <div className="new-arrivals-container">
      <div className="new-arrivals-banner">
        <div className="banner">
          {/* <img
            
            id="banner-image"
            src={bannerImage}
            alt="moon walker shoes"
          /> */}
          <div className="overlay">
            <div className="banner-content">
              <div>
                <h1>New for You!</h1>
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
      </div>
      <section id="content-grid">
        {/* {products
          .filter((item) => item.isNew)
          ?.map((item, index) => (
            <ProductGridItem key={index} item={item} />
          ))} */}
        <div>
          <Link to={`/shop/category/new`} className="shop-all-container">
            <p className="button-primary">SHOP ALL</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;
