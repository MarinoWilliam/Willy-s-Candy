import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    total: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,
            0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,
            0)
        setTotal(newTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToAdd) => {
        setCartItems(removeCartItem(cartItems, productToAdd))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, total }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

