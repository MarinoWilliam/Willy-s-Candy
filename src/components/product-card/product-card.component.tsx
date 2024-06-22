import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart } from '../../store/cart/cart.action'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { ProductCardContainer, Footer, Name, Price } from './product-card.styles'
import { CategoryItem } from '../../store/categories/categories.types';

export type ProductCardProps ={
    product: CategoryItem
}
const ProductCard : FC<ProductCardProps> = ({ product }) => {
    const dispach = useDispatch()

    const cartItems  = useSelector(selectCartItems)

    const { name, price, imageUrl } = product
    
    const addProductTocart = () => dispach(addItemToCart(cartItems, product))
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductTocart} >Add to cart</Button>
        </ProductCardContainer>
    );



};

export default ProductCard;