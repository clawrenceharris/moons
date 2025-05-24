import { useEffect, useState } from "react";

interface UseAnimationToggleProps {
  value: boolean;
  duration?: number;
}
const useAnimationToggle = ({ value, duration }: UseAnimationToggleProps) => {
  const [endValue, setEndValue] = useState<boolean>(value);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, duration || 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, duration]);
  return { isAnimating };
};
export default useAnimationToggle;
