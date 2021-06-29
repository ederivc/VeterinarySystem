import React, { createContext, useRef, useState } from "react";
import Navigation from "../components/Navigation";

export const CartContext = createContext();

const Layout = ({ children }) => {
  const [cart, setCart] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [addedProduct, setAddedProduct] = useState([]);
  const cartRef = useRef(addedProduct);

  const clearCartInputs = () => {
    setAddedProduct([]);
    cartRef.current = addedProduct;
    setCart(0);
    setCartTotal(0);
  };

  const contextValue = {
    cart,
    setCart,
    addedProduct,
    setAddedProduct,
    cartTotal,
    setCartTotal,
    cartRef,
    clearCartInputs,
  };

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
