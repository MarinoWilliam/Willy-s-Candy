import { useSelector } from 'react-redux';

import ProductCard from "../product-card/product-card.component";
import Spinner from "../spinner/spinner.component";

import { selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles.jsx'


const CategoryPreview = ({ title, products }) => {
    const isLoading = useSelector(selectCategoriesIsLoading)

    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    <Preview>
                        {products
                            .filter((_, i) => i < 4)
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </Preview>
                )
            }

        </CategoryPreviewContainer>
    );
}


export default CategoryPreview;