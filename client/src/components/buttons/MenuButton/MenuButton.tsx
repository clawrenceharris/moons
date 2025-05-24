import React, { forwardRef } from "react";
import { assets } from "../../../assets";

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    return (
      <button aria-label="Open menu" ref={ref} className="menu-btn" {...props}>
        <img className="icon" src={assets.menu} alt="menu" />
      </button>
    );
  }
);

export default MenuButton;
