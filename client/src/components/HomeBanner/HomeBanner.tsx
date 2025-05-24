import React from "react";

import { featured } from "../../data/products";
import { Link } from "react-router-dom";
import "./HomeBanner.css";

function Banner() {
  return (
    <div className="banner">
      {/* {featured.srcset.map((item, index) => (
        <img
          key={index}
          id={"banner-image" + (index + 1)}
          src={item}
          alt={featured.name}
        /> */}
      {/* ))} */}

      <div className="overlay">
        <div className="text-container">
          <h1>{featured.name}</h1>
          <p>{featured.description}</p>
        </div>
        <span>
          {featured.salePrice && (featured.salePrice / (featured?.price || 1)) * 100}%
          OFF&nbsp;
          <Link to={"/product"} state={featured}>
            SHOP NOW
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}

export default Banner;
