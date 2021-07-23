import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (el) => el.id === action.item.id
    );
    let updatedCartItems;
    if (existingCartItemIndex > -1) {
      const updatedCartItem = {
        ...state.items[existingCartItemIndex],
        amount: state.items[existingCartItemIndex].amount + action.item.amount,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (el) => el.id === action.id
    );
    let updatedCartItems;
    let updatedTotalAmount;
    let itemToBeUpdated;
    let updatedCartItem;
    if (existingCartItemIndex > -1) {
      itemToBeUpdated = state.items.filter((el) => el.id === action.id);
      updatedTotalAmount = state.totalAmount - itemToBeUpdated[0].price;
      if (itemToBeUpdated[0].amount === 1) {
        updatedCartItems = state.items.filter((el) => el.id !== action.id);
      } else {
        updatedCartItem = {
          ...state.items[existingCartItemIndex],
          amount: itemToBeUpdated[0].amount - 1,
        };
        updatedCartItems = [...state.items];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      }
    } else {
      throw new Error("Item to remove doesn't exist!");
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
