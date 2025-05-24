import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProductsBySearch } from "../../api/search";
import SearchBar from "../../components/SearchBar";
import "./Search.css";
import ProductGridItem from "../../components/ProductGridItem";
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // setLoading(true);
    if (!query) {
      //   fetchProducts()
      //     .then((res) => {
      //       setSearchResults(res);
      //       setLoading(false);
      //     })
      //     .catch((err) => {
      //       console.error("Error fetching products", err);
      //       setError(err.message);
      //       setLoading(false);
      //     });
      return;
    }

    fetchProductsBySearch(query)
      .then((res) => {
        setSearchResults(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setError(err.message);
        setLoading(false);
      });
  }, [query]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="search-container">
      <SearchBar defaultValue={query} />
      <div>
        <h1>{`${query ? '"' + query + '"' : "All Products"}`}</h1>
        <p>Showing {searchResults.length} results</p>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <ProductGridItem key={index} product={item} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};
export default Search;
