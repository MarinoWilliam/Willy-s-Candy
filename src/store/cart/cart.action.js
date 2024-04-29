import { CART_ACTION_TYPES } from "./cart.types"

export const setIsCartOpen = (bool) => {
    return { type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool }
}



const addCartItem = (cartItems, productToAdd) => {
    const isExisting = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if (isExisting) {
        return cartItems.map((cartItem) => (
            (cartItem.id === productToAdd.id) ?
                (
                    { ...cartItem, quantity: cartItem.quantity + 1 }
                )
                : cartItem
        ))
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.map((cartItem) => {
        if (cartItem.id === productToRemove.id) {
            if (cartItem.quantity < 1) {
                return { ...cartItem, quantity: 0 }
            } else {
                return { ...cartItem, quantity: cartItem.quantity - 1 }
            }
        } else {
            return cartItem
        }
    })
}

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}

export const removeItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = removeCartItem(cartItems, productToAdd)
    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
    }

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}
