import { CART_ACTION_TYPES, CartItem } from "./cart.types"
import { CategoryItem } from "../categories/categories.types"
import {
    createAction,
    ActionWithPayload,
    withMatcher,
} from "../../utils/reducer/reducer.utils"


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>




const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    if (!cartItems || cartItems.length === 0) {
        return [{ ...productToAdd, quantity: 1 }];
    }
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    if (!cartItems || cartItems.length === 0) {
        return [];
    }
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

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
    if (!cartItems || cartItems.length === 0) {
        return [];
    }
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}


export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))

export const addItemToCart = withMatcher((cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
})

export const removeItemFromCart = withMatcher((cartItems: CartItem[], productToAdd: CartItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
})

export const clearItemFromCart = withMatcher((cartItems: CartItem[], productToClear: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
})
