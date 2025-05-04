import { createContext, useContext, useState } from "react";

const NavContext = createContext({});

const useNav = () => {
  return useContext(NavContext);
}

const NavProvider = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("home");

    function openNav() {
        const nav = document.getElementById("nav");
        nav.classList.add("open");
        setIsNavOpen(true);
    }
    function closeNav() {
        const nav = document.getElementById("nav");
        nav.classList.remove("open");
        setIsNavOpen(false);
    }
    
    
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
}

export { useNav, NavProvider };