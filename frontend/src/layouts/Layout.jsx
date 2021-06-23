import React, { createContext, useState } from "react";
import Navigation from "../components/Navigation";

export const CartContext = createContext();

const Layout = ({ children }) => {
  const [cart, setCard] = useState(0);
  const [addedProduct, setAddedProduct] = useState([]);

  const contextValue = { cart, setCard, addedProduct, setAddedProduct };

  return (
    <>
      <CartContext.Provider value={contextValue}>
        <Navigation />
        {children}
      </CartContext.Provider>
    </>
  );
};

export default Layout;
