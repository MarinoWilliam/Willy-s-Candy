import { createSelector } from "reselect";

const cartReducerSelector = (state) =>  state.cart


export const selectCartItems = createSelector(
    [cartReducerSelector],
    (cartSlice) => cartSlice.cartItems
)

export const selectIsCartOpen = createSelector(
    [cartReducerSelector],
    (cartSlice) => cartSlice.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => 
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => 
    cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
)








