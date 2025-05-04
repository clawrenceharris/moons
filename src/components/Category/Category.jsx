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
        {type === "men" ? <h2>MEN</h2> : <h2>WOMEN</h2>}
        <div className="shop-now">
          <span href="#">Shop Now</span>
          <img src={arrow} alt="right arrow" />
        </div>
      </div>
    </div>
  );
}

export default Category;
