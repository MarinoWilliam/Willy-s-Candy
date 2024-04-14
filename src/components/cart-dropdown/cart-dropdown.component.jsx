import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {CartDropdownContainer, CartItems, EmptyMessege} from'./cart-dropdown.styles'

const CartDropdown = ()=>{
    const { isCartOpen, setIsCartOpen ,cartItems} = useContext(CartContext)
    
    const toggleIsCartOpen =()=>{setIsCartOpen(!isCartOpen)}
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


