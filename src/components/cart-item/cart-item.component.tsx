import {  FC, memo } from 'react';
import { CartItem as CartItemType} from '../../store/cart/cart.types';
import {CartItemContainer, CartItemImg,ItemDetails, Name} from'./cart-item.styles'

export type CartProps ={
    cartItem : CartItemType;
}
const CartItem : FC<CartProps> = memo(({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    return (
        <CartItemContainer>
            <CartItemImg src={imageUrl}   alt={`${name}}`} />
            <ItemDetails>
                <Name>{name}</Name>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
});

export default CartItem
