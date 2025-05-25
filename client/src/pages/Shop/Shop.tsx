import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product as ProductType } from "../../../../types";
import { ProductGridItem, SearchBar } from "../../components";
import { formatCategory } from "../../utils";
import "./Shop.css";

import { useShop } from "../../context/ShopContext";
const Shop: React.FC = () => {
  const { category = "All", subcategory } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const { products, categories, subcategories } = useShop();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    // Build query parameters
    const params: Record<string, string> = { category };
    if (subcategory) params.subcategory = subcategory;
    setTitle(
      subcategory
        ? `${formatCategory(category).toUpperCase()} → ${formatCategory(
            subcategory
          )}`
        : `${formatCategory(category).toUpperCase()}`
    );
    setFilteredProducts(
      products
        .filter((item) => {
          return item.category.toLowerCase() === category.toLowerCase();
        })
        .filter((item) =>
          subcategory
            ? item.subcategory.toLowerCase() === subcategory.toLowerCase()
            : true
        )
    );
  }, [categories, category, products, subcategories, subcategory]);

  return (
    <div className="shop-container">
      <SearchBar />

      <h1>Shop {title}</h1>
      {filteredProducts.length > 0 ? (
        <div className="content-grid">
          {filteredProducts.map((item) => (
            <ProductGridItem key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="content-centered">
          <p>
            Looks like there are no items in this category. Try checking back
            later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;
