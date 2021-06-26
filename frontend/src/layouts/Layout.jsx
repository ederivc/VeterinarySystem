import React, { createContext, useRef, useState } from "react";
import Navigation from "../components/Navigation";

export const CartContext = createContext();

const Layout = ({ children }) => {
  const [cart, setCart] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  // const [needsChange, setNeedsChange] = useState([false, ""]);
  const [addedProduct, setAddedProduct] = useState([]);
  const cartRef = useRef(addedProduct);
  // let checker = [false];

  const contextValue = {
    cart,
    setCart,
    addedProduct,
    setAddedProduct,
    cartTotal,
    setCartTotal,
    cartRef,
    // needsChange,
    // setNeedsChange,
    // checker,
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
