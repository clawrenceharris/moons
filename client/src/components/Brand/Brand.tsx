import React from "react";
import { ProductBrand as BrandType } from "../../../../shared/types";
import "./Brand.css";
interface BrandProps {
  brand: BrandType;
}
const Brand: React.FC<BrandProps> = ({ brand }) => {
  return <div>Brand</div>;
};

export default Brand;
