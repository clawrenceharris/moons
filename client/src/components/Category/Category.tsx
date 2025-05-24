import React from "react";
import maleHero from "../../assets/images/male-shoes.jpeg";
import femaleHero from "../../assets/images/female-shoes.jpeg";
import arrow from "../../assets/images/right-arrow.png";
import "./Category.css";
import { Link } from "react-router-dom";

interface CategoryProps {
  category: string;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <Link className="category-box" to={`/shop/category/${category}`}>
      {category === "mens" ? (
        <img src={maleHero} alt="male sitting down" />
      ) : (
        <img src={femaleHero} alt="female sitting down" />
      )}
      <div className="overlay">
        {category === "mens" ? <h2>MEN</h2> : <h2>WOMEN</h2>}
        <p className="shop-now">
          <span>Shop Now</span>
          <img src={arrow} alt="right arrow" />
        </p>
      </div>
    </Link>
  );
};

export default Category;
