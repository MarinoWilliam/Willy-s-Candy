import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action.js'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector.js'
import {CartIconContainer,ItemCount,ShoppingIconElement} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const dispach = useDispatch()
    const isCartOpen  = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)

    const toggleIsCartOpen = () => dispach(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconElement />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}


export default CartIcon