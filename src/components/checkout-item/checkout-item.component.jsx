import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { CheckoutItemContainer, ImgContainer, Img, Price, Quantity, Arrow, Value, RemoveButton, } from './checkout-item.styles'

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
    const clearItemHAndler = () => { clearItemFromCart(cartItem) }
    const addItemHAndler = () => { addItemToCart(cartItem) }
    const removeItemHAndler = () => { removeItemFromCart(cartItem) }

    return (
        <CheckoutItemContainer>
            <ImgContainer>
                <Img src={imageUrl} alt={`${name}`} />
            </ImgContainer>
            <span>{name}</span>
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