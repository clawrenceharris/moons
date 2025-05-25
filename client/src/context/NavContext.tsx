import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

interface NavContextType {
  isNavOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a Navigation Provider");
  }
  return context;
};

const NavProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("home");
  const navigate = useNavigate();
  useEffect(() => {
    closeNav();
  }, [navigate]);

  const openNav = () => {
    const nav = document.getElementById("nav");
    nav?.classList.add("open");
    nav?.classList.remove("closed");

    setIsNavOpen(true);
  };

  const closeNav = () => {
    const nav = document.getElementById("nav");
    if (!nav) return;
    nav.classList.remove("open");
    nav.classList.add("closed");
    setIsNavOpen(false);
  };

  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        openNav,
        closeNav,
        activeLink,
        setActiveLink,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export { useNav, NavProvider };
