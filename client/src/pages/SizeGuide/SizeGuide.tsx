import React, { useEffect, useState } from "react";
import measuringGuide from "../../assets/images/foot-measuring.png";
import { useLocation } from "react-router-dom";
import { SizeChart } from "../../components";
import "./SizeGuide.css";
const SizeGuide: React.FC = () => {
  const [sizeType, setSizeType] = useState<"US" | "UK">("US");
  const [unitType, setUnitType] = useState<"CM" | "IN">("IN");
  const location = useLocation();
  const product = location.state;
  const selectBox = document.getElementById("size-select");
  const selectedValue = "US";
  useEffect(() => {
    setSizeType(selectedValue);
  }, [selectBox, selectedValue]);

  return (
    <div>
      <section className="product-measurements">
        <div className="heading">
          <h2>Size Guide</h2>

          <div className="settings">
            <div className="custom-select">
              <select
                onChange={(e) =>
                  setSizeType(e.target.value === "US" ? "US" : "UK")
                }
                name="size-select"
              >
                <option value="US">US size</option>
                <option value="UK">UK size</option>
              </select>
            </div>

            <button
              onClick={() => setUnitType("IN")}
              className={unitType === "IN" ? "in active-unit" : "in"}
            >
              IN
            </button>
            <button
              onClick={() => setUnitType("CM")}
              className={unitType === "CM" ? "cm active-unit" : "cm"}
            >
              CM
            </button>

            <div></div>
          </div>
        </div>

        <h3>Product measurements</h3>

        <SizeChart product={product} sizeType={sizeType} unitType={unitType} />
      </section>
      <section>
        <h3>How to measure</h3>
        <div className="how-to-measure">
          <ol>
            <li>
              <span>Foot length</span>
              <br />
              Measure the maximum length of your foot.
            </li>
            <br />
            <li>
              <span>Foot width</span>
              <br />
              Measure the maximum width of your foot.
            </li>
            <br />
            <li>
              <span>Ball girth</span>
              <br />
              Wrap a tape to measure around the widest part of your foot.
            </li>
            <br />
          </ol>

          <img src={measuringGuide} alt="foot measuring guide" />
        </div>
      </section>
    </div>
  );
};

export default SizeGuide;
