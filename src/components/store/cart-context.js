import React from "react";

const CartContext = React.createContext({
  items: [],
  setItem: (item) => {},
  removeItem: (item) => {},
});

export default CartContext;
