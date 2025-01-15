import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

function Checkout() {
  const { totalPrice } = useCart();
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const tax = totalPrice * 0.06;

  const [currentSection, setCurrentSection] = useState("contact-info");
  const [completedSections, setCompletedSections] = useState([]);
  const [addressIsSame, setAddressIsSame] = useState(true);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [showDiscountOptions, setShowDiscountOptions] = useState(false);

  const getInputValue = (id) => {
    const input = document.getElementById(id);

    return input?.value || "";
  };

  const isSectionComplete = (id) => {
    const inputs = document.getElementsByName(id);
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].required && inputs[i].value === "") {
        return false;
      }
    }
    return true;
  };

  const AddressInfo = ({ id }) => {
    return (
      <form id={id}>
        <div className="first-last-name">
          <div>
            <label for="shipping-first-name">First Name</label>
            <input
              value={getInputValue("first-name")}
              name={id}
              className="text-input"
              id="shipping-first-name"
              type="text"
            />
          </div>
          <div>
            <label for="shipping-last-name">Last Name</label>
            <input
              value={getInputValue("last-name")}
              name={id}
              className="text-input"
              id="shipping-last-name"
              type="text"
            />
          </div>
        </div>

        <div className="street-address">
          <div>
            <label for="street-address">Street Address*</label>
            <input
              name={id}
              required
              className="text-input"
              id="street-address"
              type="text"
            />
          </div>

          <div>
            <label for="apt-no">Apt/Unit No.</label>
            <input name={id} className="text-input" id="apt-no" type="text" />
          </div>
        </div>

        <div className="city-state-zip">
          <div>
            <label for="city">City*</label>
            <input
              name={id}
              required
              className="text-input"
              id="city"
              type="text"
            />
          </div>

          <div>
            <label for="state">State*</label>
            <div
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <select name={id} required id="state">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <span
                style={{ position: "absolute", right: "25px" }}
                className="chevron-down"
              />
            </div>
          </div>
          <div>
            <label for="zip-code">U.S Zip Code*</label>
            <input className="text-input" id="zip-code" type="text" />
          </div>
        </div>
      </form>
    );
  };

  const ContactInfo = ({ actionAd }) => {
    return (
      <form id="contact-info">
        <div className="first-last-name">
          <div>
            <label for="first-name">First Name*</label>
            <input
              name="contact-info"
              required
              className="text-input"
              id="first-name"
              type="text"
            />
          </div>
          <div>
            <label for="last-name">Last Name*</label>
            <input
              name="contact-info"
              required
              className="text-input"
              id="last-name"
              type="text"
            />
          </div>
        </div>
        <div>
          <label for="email">Email Address*</label>
          <input
            name="contact-info"
            required
            className="text-input"
            id="email"
            type="email"
          ></input>
        </div>
        <div>
          <label for="phone">Phone Number*</label>
          <input
            name="contact-info"
            required
            className="text-input"
            id="phone"
            type="text"
          />
        </div>

        <label
          style={{
            textTransform: "none",
            width: "100%",
            fontWeight: "normal",
            fontSize: "14px",
            fontFamily: "Fredoka",
          }}
          for="subscribe-email"
        >
          <input
            style={{ marginRight: "10px", backgroundColor: "black" }}
            id="subscribe-email"
            type="checkbox"
          />
          Receive emails about updates and promotions
        </label>

        <label
          style={{
            textTransform: "none",
            width: "100%",
            fontWeight: "normal",
            fontSize: "14px",
            fontFamily: "Fredoka",
          }}
          for="subscribe-text"
        >
          <input
            style={{ marginRight: "10px", backgroundColor: "black" }}
            id="subscribe-text"
            type="checkbox"
          />
          Receive texts about updates and promotions
        </label>
        <div style={{ display: "flex", marginTop: "50px" }}>
          <button
            onClick={() => {
              if (isSectionComplete("contact-info")) {
                setCurrentSection("shipping-info");
                setCompletedSections((prev) => [...prev, "contact-info"]);
              }
            }}
            style={{ marginRight: "10px" }}
            className="button-filled"
            type="submit"
          >
            Save & Continue
          </button>
          {completedSections.includes("contact-info") && (
            <button
              onClick={() => setCurrentSection(null)}
              className="button-outlined"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  };
  return (
    <div>
      <section>
        <h1>Checkout</h1>

        <form action="/action_page.php" id="checkout">
          <div className="form-boxes">
            {currentSection === "contact-info" ? (
              <section id="contact-info">
                <h2>1. Contact Information</h2>
                <ContactInfo />
              </section>
            ) : completedSections.includes("contact-info") ? (
              <div
                className={
                  completedSections.includes("contact-info")
                    ? "completed-section"
                    : "inactive-section"
                }
              >
                <h2>2. Contact Information</h2>
                <h5>
                  {getInputValue("first-name") +
                    " " +
                    getInputValue("last-name")}
                </h5>
                <p>{getInputValue("email")}</p>
                <p>{getInputValue("phone")}</p>
                <a
                  href="#contact-info"
                  onClick={() => setCurrentSection("contact-info")}
                  style={{ width: "100%" }}
                  className="button-outlined"
                >
                  Edit
                </a>
              </div>
            ) : (
              <div
                className={
                  completedSections.includes("contact-info")
                    ? "completed-section"
                    : "inactive-section"
                }
              >
                <h2>2. Contact Information</h2>
              </div>
            )}

            {currentSection === "shipping-info" ? (
              <section id="shipping-info">
                <h2>2. Shipping Information</h2>
                <h3>Ship To:</h3>
                <form>
                  <AddressInfo id={"shipping-info"} />

                  <label
                    style={{
                      textTransform: "none",
                      width: "100%",
                      fontWeight: "normal",
                      fontSize: "14px",
                      fontFamily: "Fredoka",
                    }}
                    for="subscribe-text"
                  >
                    <input
                      onChange={(e) => setAddressIsSame(e.target.checked)}
                      style={{
                        marginRight: "10px",
                        backgroundColor: "black",
                      }}
                      id="same-shipping-billing"
                      type="checkbox"
                    />
                    Shipping address is same as billing address
                  </label>
                  <div style={{ display: "flex", marginTop: "50px" }}>
                    <button
                      onClick={() => {
                        if (isSectionComplete("shipping-info")) {
                          setCurrentSection("billing-info");
                          setCompletedSections((prev) => [
                            ...prev,
                            "shipping-info",
                          ]);
                        }
                      }}
                      style={{ marginRight: "10px" }}
                      className="button-filled"
                      type="submit"
                    >
                      {" "}
                      Save & Continue
                    </button>
                    {completedSections.includes("shipping-info") && (
                      <button
                        onClick={() => setCurrentSection(null)}
                        className="button-outlined"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </section>
            ) : completedSections.includes("shipping-info") ? (
              <div
                className={
                  completedSections.includes("shipping-info")
                    ? "completed-section"
                    : "inactive-section"
                }
              >
                <h2>2. Shipping Information</h2>
                <h5>
                  {getInputValue("shipping-first-name") +
                    " " +
                    getInputValue("shipping-last-name")}
                </h5>
                <p>
                  {getInputValue("street-address") +
                    " " +
                    getInputValue("apt-no")}
                </p>
                <p>
                  {getInputValue("city").toUpperCase() +
                    ", " +
                    getInputValue("state") +
                    " " +
                    getInputValue("zip-code") +
                    " US 🇺🇸"}
                </p>
                <a
                  href="#contact-info"
                  onClick={() => setCurrentSection("shipping-info")}
                  style={{ width: "100%" }}
                  className="button-outlined"
                >
                  Edit
                </a>
              </div>
            ) : (
              <div
                className={
                  completedSections.includes("shipping-info")
                    ? "completed-section"
                    : "inactive-section"
                }
              >
                <h2>2. Shipping Information</h2>
              </div>
            )}

            {currentSection === "billing-info" ? (
              <section id="billing-info">
                <h2>3. Billing Information</h2>

                <form>
                  <label
                    style={{
                      textTransform: "none",
                      width: "100%",
                      fontWeight: "normal",
                      fontSize: "14px",
                      fontFamily: "Fredoka",
                    }}
                    for="subscribe-text"
                  >
                    <input
                      checked={addressIsSame}
                      onChange={(e) => setAddressIsSame(e.target.checked)}
                      style={{
                        marginRight: "10px",
                        backgroundColor: "black",
                      }}
                      id="subscribe-text"
                      type="checkbox"
                    />
                    Billing address is same as shipping address
                  </label>
                  {!addressIsSame && <AddressInfo id={"billing-info"} />}
                  <label for="credit-card-num">Credit Card Number*</label>
                  <input
                    className="text-input"
                    id="credit-card-num"
                    type="text"
                  />

                  <label for="exp-date">Expiration Date*</label>
                  <input className="text-input" id="exp-date" type="date" />

                  <label for="cvv">CVV*</label>
                  <input className="text-input" id="cvv" type="text" />
                  <div style={{ display: "flex", marginTop: "50px" }}>
                    <button
                      onClick={() => {
                        if (isSectionComplete("billing-info")) {
                          setCurrentSection(null);
                          setCompletedSections((prev) => [
                            ...prev,
                            "billing-info",
                          ]);
                        }
                      }}
                      style={{ marginRight: "10px" }}
                      className="button-filled"
                      type="submit"
                    >
                      {" "}
                      Save & Continue
                    </button>
                    {completedSections.includes("contact-info") && (
                      <button
                        onClick={() => setCurrentSection(null)}
                        className="button-outlined"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </section>
            ) : completedSections.includes("billing-info") ? (
              <div
                className={
                  completedSections.includes("billing-info")
                    ? "completed-section"
                    : "inactive-section"
                }
              >
                <h2>3. Billing Information</h2>
                <h5>
                  {getInputValue("first-name") +
                    " " +
                    getInputValue("last-name")}
                </h5>
                <p>
                  {getInputValue("city").toUpperCase() +
                    ", " +
                    getInputValue("state") +
                    " " +
                    getInputValue("zip-code") +
                    " US 🇺🇸"}
                </p>
                <p>
                  {getInputValue("credit-card-num") +
                    " " +
                    getInputValue("exp-date") +
                    getInputValue("cvv")}
                </p>

                <a
                  href="#billing-info"
                  onClick={() => setCurrentSection("shipping-info")}
                  style={{ width: "100%" }}
                  className="button-outlined"
                >
                  Edit
                </a>
              </div>
            ) : (
              <div
                className={
                  completedSections.includes("billing-info")
                    ? "completed-section"
                    : "inactive-section"
                }
              >
                <h2>3. Billing Information</h2>
              </div>
            )}
          </div>
          <div className="order-summary-box">
            <h2>Order Summary</h2>
            <div className="details">
              <div className="details-flex details-border">
                <h4>Subtotal:</h4>

                <p>{formatCurrency(totalPrice)}</p>
              </div>
              <div className="details-border">
                <div className="details-flex">
                  <h4>Shipping:</h4>
                  <p>{shipping === 0 ? "Free" : formatCurrency(shipping)}</p>
                </div>

                {!showShippingOptions ? (
                  <button
                    onClick={() => setShowShippingOptions(true)}
                    className="button-underlined"
                  >
                    Edit Shipping
                  </button>
                ) : (
                  <div>
                    <div className="shipping-options">
                      <label id="standard" className="radio-btn">
                        4-7 Business Days - Standard - Free
                        <input name="shipping" type="radio" />
                        <span className="checkmark" />
                      </label>

                      <label id="expedited" className="radio-btn">
                        3-4 Business Days - Expedited - $9.99
                        <input name="shipping" type="radio" />
                        <span className="checkmark" />
                      </label>
                      <label id="priority" className="radio-btn">
                        2 Business Days - Priority - $17.99
                        <input name="shipping" type="radio" />
                        <span className="checkmark" />
                      </label>

                      <label id="overnight" className="radio-btn">
                        1 Business Day - Overnight - $27.99
                        <input name="shipping" type="radio" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="order-actions">
                      <button
                        onClick={() => setShowShippingOptions(false)}
                        className="button-outlined"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => {
                          const input = document.querySelector(
                            ".radio-btn input:checked"
                          );
                          if (!input) {
                            return;
                          }
                          if (input.parentElement.id === "standard") {
                            setShipping(0);
                          } else if (input.parentElement.id === "expedited") {
                            setShipping(9.99);
                          } else if (input.parentElement.id === "priority") {
                            setShipping(17.99);
                          } else if (input.parentElement.id === "overnight") {
                            setShipping(27.99);
                          }
                          setShowShippingOptions(false);
                        }}
                        className="button-filled"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="details-border">
                <div className="details-flex">
                  <h4>Discount:</h4>
                  <p>{formatCurrency(discount)}</p>
                </div>

                {!showDiscountOptions ? (
                  <button
                    className="button-underlined"
                    onClick={() => setShowDiscountOptions(true)}
                  >
                    Add Promo Code
                  </button>
                ) : (
                  <div>
                    <input
                      className="text-input"
                      id="promo-code"
                      placeholder="PROMO CODE"
                      type="text"
                    />
                    <div className="order-actions">
                      <button
                        className="button-outlined"
                        onClick={() => setShowDiscountOptions(false)}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        onClick={() => {
                          const code = document.getElementById("promo-code");

                          if (code.value === "MYSTERYDEAL") {
                            setDiscount(-(totalPrice * 0.1));
                            setShowDiscountOptions(false);
                          }
                          code.value = "";
                        }}
                        className="button-filled"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="details-flex details-border">
                <h4>Tax:</h4>
                <p>{formatCurrency(tax)}</p>
              </div>

              <div className="details-flex details-border">
                <h4>Order Total:</h4>
                <p>{formatCurrency(totalPrice + tax + shipping + discount)}</p>
              </div>
            </div>

            <button
              style={{ width: "100%" }}
              className={
                completedSections.length >= 3
                  ? "button-filled"
                  : "button-disabled"
              }
            >
              Place Order
            </button>
            <p style={{ color: "gray", marginTop: "20px" }}>
              This is just a fictional e-commerce website made for educational
              purposes. The data you enter will not actually be collected or
              seen upon submitting this form.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Checkout;
