import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action.js'
import { selectCartItems } from '../../store/cart/cart.selector.js'

import { CheckoutItemContainer, ImgContainer, Img, Price, Quantity, Description, Arrow, Value, RemoveButton, } from './checkout-item.styles'

const CheckoutItem = ({ cartItem }) => {
    const dispach = useDispatch()

    const cartItems = useSelector(selectCartItems)
    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHAndler = () => dispach(clearItemFromCart(cartItems, cartItem))
    const addItemHAndler = () => dispach(addItemToCart(cartItems, cartItem))
    const removeItemHAndler = () => dispach(removeItemFromCart(cartItems, cartItem))

    return (
        <CheckoutItemContainer>
            <ImgContainer>
                <Img src={imageUrl} alt={`${name}`} />
            </ImgContainer>
            <Description>{name}</Description>
            <Quantity>
                <Arrow onClick={removeItemHAndler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHAndler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHAndler}> &#10005; </RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;