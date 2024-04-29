import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action.js'
import { selectIsCartOpen, selectCartCount, selectCartItems } from '../../store/cart/cart.selector.js'

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {CartDropdownContainer, CartItems, EmptyMessege} from'./cart-dropdown.styles'

const CartDropdown = ()=>{
    const dispach = useDispatch()
    const isCartOpen  = useSelector(selectIsCartOpen)
    const cartItems  = useSelector(selectCartItems)

    
    const toggleIsCartOpen = () => dispach(setIsCartOpen(!isCartOpen))
    const navigate = useNavigate();


    const goToCheckoutHandler = ()=>{
        toggleIsCartOpen()
        navigate('/checkout')
    }
    return (
        
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((cartItem)=><CartItem key={cartItem.id} cartItem={cartItem}/>)
                ) : (
                    <EmptyMessege>The cart is empty</EmptyMessege> 
                )}
            
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}


export default CartDropdown


