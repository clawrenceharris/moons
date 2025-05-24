import React, { useRef } from "react";
import "./SideBar.css";
import { FocusTrap } from "focus-trap-react";
import { useAnimationToggle } from "../../hooks";

export interface SideBarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  isOpen?: boolean;
}

interface SideBarProps {
  children: React.ReactElement<SideBarContentProps>;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  direction?: "left" | "right";

  triggerButton: HTMLButtonElement | null;
}
const SideBar: React.FC<SideBarProps> = ({
  children,
  containerStyle,
  contentStyle,
  isOpen,

  direction = "left",
  onClose,
  triggerButton,
}) => {
  const [isTrapped, setIsTrapped] = React.useState(false);
  const closeSidebar = React.useCallback(() => {
    // triggerButton?.focus();
    onClose && onClose();
  }, [onClose]);
  const ref = useRef<HTMLDivElement>(null);
  const { isAnimating } = useAnimationToggle({
    value: isOpen,
    duration: 1000,
  });
  return (
    <FocusTrap
      focusTrapOptions={{
        onPostDeactivate: () => {
          setIsTrapped(false);
          closeSidebar();
        },
        onActivate: () => {
          setIsTrapped(true);
        },
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: true,
      }}
      active={isOpen}
    >
      <div
        ref={ref}
        hidden={!isOpen && !isTrapped && !isAnimating}
        style={containerStyle}
        className={`sidebar-container ${
          isOpen ? "open" : "closed"
        } ${direction}`}
      >
        <div style={contentStyle} className="sidebar-content">
          {React.cloneElement(children, {
            isOpen,
            onClose: closeSidebar,
          })}
        </div>
      </div>
    </FocusTrap>
  );
};

export default SideBar;
