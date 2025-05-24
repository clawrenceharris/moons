import React, { FC, useCallback, useRef } from "react";
import { useEffect } from "react";
import "./FocusTrap.css";
interface FocusTrapProps {
  onClickOutside?: (e: MouseEvent) => void;
  active?: boolean;
  children: React.ReactNode;
}

const FocusTrap: FC<FocusTrapProps> = ({
  onClickOutside,
  active,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!ref.current) {
        return;
      }
      if (!ref.current.contains(target as Node)) {
        onClickOutside && onClickOutside(e);
      }
    },
    [onClickOutside]
  );
  useEffect(() => {
    const onTab = (e: KeyboardEvent) => {
      const focusableElements = document.querySelectorAll(
        "a[href], area[href], iframe, object, embed, [tabindex], [contenteditable]"
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;
      const isTabPressed = e.key === "Tab";
      if (!active) {
        firstElement.focus();
      }
      if (isTabPressed) {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onTab);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", onTab);
    };
  }, [active, handleClickOutside]);

  return (
    <div className="focus-container" ref={ref}>
      {children}
    </div>
  );
};
export default FocusTrap;
