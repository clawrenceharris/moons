import React from "react";
import maleImage from "../../assets/images/male-shoes.jpeg";
import femaleImage from "../../assets/images/female-shoes.jpeg";
import arrow from "../../assets/images/right-arrow.png";
import "./Category.css";

function Category({ type }) {
  return (
    <div className="category-box">
      {type === "men" ? (
        <img src={maleImage} alt="male sitting down" />
      ) : (
        <img src={femaleImage} alt="female sitting down" />
      )}
      <div className="overlay">
        {type === "men" ? <h1>Men</h1> : <h1>Women</h1>}
        <div className="shop-now">
          <a href="#">Shop Now</a>
          <img src={arrow} alt="right arrow" />
        </div>
      </div>
    </div>
  );
}

export default Category;
