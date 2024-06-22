import { AnyAction } from '@redux-saga/core';

import { CartItem } from './cart.types';
import { CART_ACTION_TYPES } from './cart.types'

import {
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
} from './cart.action';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const CART_STATE:CartState = {
    isCartOpen: false,
    cartItems: [],
}


export const cartReducer = (
    state = CART_STATE,
    action : AnyAction
): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        };
    }

    if (addItemToCart.match(action) || removeItemFromCart.match(action) || clearItemFromCart.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        };
    }

    return state
}







