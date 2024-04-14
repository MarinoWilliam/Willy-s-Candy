import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {CartIconContainer,ItemCount,ShoppingIconElement} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext)

    const toggleIsCartOpen =()=>{setIsCartOpen(!isCartOpen)}
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconElement />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}


export default CartIcon