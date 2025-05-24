import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import {
  updateProduct,
  addProductImage,
  setProductFlag,
  deleteImage,
} from "../../../api/admin/products";

import "./EditProduct.css";
import { assets } from "../../../assets";
import { useShop } from "../../../context";
import { useProduct } from "../../../hooks";
import NotFound from "../../NotFound/NotFound";
const EditProduct = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct(Number(id));
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState<{
    name: string;
    subcategory_id: number;
    category_id: number;
    brand_id: number;
    description: string;
    stock_quantity: number;
    price: number;
    discount: number | null;
    created_at: string;
    published: boolean;
  }>({
    name: "",
    subcategory_id: 0,
    category_id: 0,
    brand_id: 0,
    description: "",
    stock_quantity: 0,
    price: 0,
    discount: null,
    created_at: "",
    published: false,
  });
  const { flags, categories, subcategories, brands } = useShop();
  const [checkedFlags, setCheckedFlags] = useState<string[]>([]);

  const [newImages, setNewImages] = useState([
    {
      image_url: "",
      alt_text: "",
    },
  ]);
  useEffect(() => {
    if (!product) return;
    setInputs({
      name: product.name,
      subcategory_id: product.subcategory_id,
      category_id: product.category_id,
      brand_id: product.brand_id,
      description: product.description,
      stock_quantity: product.stockQuantity,
      price: product.price,
      discount: product.discount,
      created_at: product.createdAt,
      published: product.published,
    });
  }, [product]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => {
    const { name, value } = e.target;
    setNewImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [name]: value } : img))
    );
  };
  const handleAddImages = (e: React.FormEvent<HTMLFormElement>) => {
    if (!product) return;

    e.preventDefault();

    const promises = [];
    for (let i = 0; i < newImages.length; i++) {
      promises.push(addProductImage(product.id, newImages[i]));
    }

    Promise.all(promises).catch((err) => {
      setError(err.message);
    });
  };
  const handleSubmit = () => {
    if (!product) return;
    updateProduct(product.id, inputs)
      .then(() => {
        console.log("Product updated");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleResetImages = () => {
    if (!product) return;

    setNewImages([{ image_url: "", alt_text: "" }]);
  };
  const handleDeleteImage = (id: number) => {
    if (!product) return;

    deleteImage(product.id, id).catch((err) => {
      setError(err.message);
    });
  };
  const handleRemoveImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => index !== i));
  };
  const handlePublish = () => {
    if (!product) return;

    updateProduct(product.id, { published: !product.published })
      .then(() => {
        console.log("Product updated");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  function onFlagsChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked;
    if (!checked) {
      setCheckedFlags((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCheckedFlags((prev) => [...prev, e.target.value]);
    }
  }
  const handleUpdateFlags = (e: React.FormEvent<HTMLFormElement>) => {
    if (!product) return;
    e.preventDefault();
    setProductFlag(product.id, checkedFlags).catch((err) => {
      setError(err.message);
    });
  };
  if (!product || isLoading) {
    return <NotFound />;
  }
  if (error) {
    return (
      <div className="content-centered">
        <h1>Uh oh, an error occured.</h1>
        {error && <p>{error}</p>}
      </div>
    );
  }
  if (!product) {
    return (
      <div className="content-centered">
        <h1>Uh oh, we coudn't find this product.</h1>

        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <div className="product-container">
      <div>
        <div className="content-row justify-between">
          <h1>Edit Product</h1>
          <label htmlFor="publish">
            <input
              style={{ borderRadius: 100 }}
              aria-readonly="true"
              className="success"
              type="checkbox"
              tabIndex={-1}
              id="publish"
              name="published"
              checked={product.published}
            />
            {product.published ? "Published!" : "Unpublished"}
          </label>
        </div>
        <p>Product ID: {product.id}</p>
      </div>

      <form onSubmit={handlePublish} className="margin-y flex-content">
        <button type="submit" className="button-primary">
          {product.published ? "Unpublish" : "Publish"}
        </button>
      </form>
      <div className="content-body">
        <section>
          <h2>Update Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex-content">
              <div>
                <label htmlFor="name">Name</label>

                <input
                  onChange={handleChange}
                  className="text-input"
                  id="name"
                  required
                  name="name"
                  type="text"
                  value={inputs.name}
                />
              </div>
            </div>
            <div className="flex-content">
              <div>
                <label htmlFor="category">Category</label>

                <select
                  onChange={handleChange}
                  className="text-input"
                  id="category"
                  required
                  name="category_id"
                  value={inputs.category_id}
                >
                  <option value={0}>Select Option</option>

                  {categories.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subcategory">Subcategory</label>

                <select
                  onChange={handleChange}
                  className="text-input"
                  id="subcategory"
                  required
                  name="subcategory_id"
                  value={inputs.subcategory_id}
                >
                  <option value={0}>Select Option</option>
                  {subcategories.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="brand">Brand</label>

                <select
                  onChange={handleChange}
                  className="text-input"
                  id="brand"
                  required
                  name="brand_id"
                  value={inputs.brand_id}
                >
                  <option value={0}>Select Option</option>

                  {brands.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-content">
              <div>
                <label htmlFor="price">Price</label>
                <input
                  onChange={handleChange}
                  className="text-input"
                  type="number"
                  step=".01"
                  name="price"
                  required
                  id="price"
                  defaultValue={inputs.price}
                />
              </div>

              <div>
                <label htmlFor="discount">Discount</label>
                <input
                  onChange={handleChange}
                  step=".01"
                  className="text-input"
                  type="number"
                  name="discount"
                  id="discount"
                  value={inputs.discount || undefined}
                />
              </div>
              <div>
                <label htmlFor="stock-quantity">Stock Quantity</label>
                <input
                  onChange={handleChange}
                  className="text-input"
                  type="number"
                  name="stock_quantity"
                  id="stock-quantity"
                  value={inputs.stock_quantity}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="text-input"
                name="description"
                id="description"
                onChange={handleChange}
                value={inputs.description}
              />
            </div>
            <div className="flex-content">
              <button value="update" type="submit" className="button-primary">
                Update Product
              </button>
              <button value="delete" type="submit" className="button-danger">
                Delete Product
              </button>
            </div>
          </form>
        </section>
        <section>
          <h2>Update Flags</h2>
          <form onSubmit={handleUpdateFlags}>
            <div className="flex-content">
              <div>
                <label htmlFor="flags">Flags</label>
                <div>
                  {flags.map((flag) => (
                    <label key={flag.id}>
                      <input
                        type="checkbox"
                        id="flags"
                        name="flags"
                        value={flag.name}
                        checked={checkedFlags?.includes(flag.name)}
                        onChange={onFlagsChanged}
                      />
                      {flag.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="button-primary">
              Update Flags
            </button>
          </form>
        </section>
        {product.images.length > 0 && (
          <section>
            <h2>Update Images</h2>
            <form>
              <div className="flex-content">
                <div className="content-row">
                  {product.images.map((item, index) => (
                    <div>
                      <div>
                        <label htmlFor="image-url">Images</label>
                        <input
                          type="text"
                          className="text-input"
                          name="image_url"
                          id="image-url"
                          required
                          onChange={(e) => handleImageChange(e, index)}
                          value={item.imageUrl}
                        />
                      </div>
                      <div>
                        <label htmlFor="alt-text">Alt Text</label>
                        <input
                          type="text"
                          className="text-input"
                          name="alt_text"
                          id="alt-text"
                          onChange={(e) => handleImageChange(e, index)}
                          value={item.altText || ""}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(item.id)}
                        className="link danger"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </section>
        )}
        <section>
          <h2>Add Images</h2>

          <form onSubmit={handleAddImages}>
            <div className="flex-content">
              <div className="scroll-content">
                <button
                  aria-label="Add image"
                  type="button"
                  onClick={() =>
                    setNewImages((prev) => [
                      ...prev,
                      { image_url: "", alt_text: "", product_id: product.id },
                    ])
                  }
                  className="button-circle"
                >
                  <img className="icon" src={assets.add} alt="Add" />
                </button>
                <div className="scroll-content">
                  {newImages.map((item, index) => (
                    <div>
                      <div>
                        <label htmlFor="new-image-url">Images</label>
                        <input
                          type="text"
                          className="text-input"
                          name="image_url"
                          id="new-image-url"
                          onChange={(e) => handleImageChange(e, index)}
                          value={item.image_url}
                        />
                      </div>
                      <div>
                        <label htmlFor="alt-text">Alt Text</label>
                        <input
                          type="text"
                          className="text-input"
                          name="alt_text"
                          id="alt-text"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="link"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-content">
              <button className="button-primary" type="submit">
                Add Images
              </button>
              <button
                type="button"
                onClick={handleResetImages}
                className="button-outlined"
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditProduct;
