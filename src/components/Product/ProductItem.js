import ProductDate from './ProductDate';
import './ProductItem.css';
import Card from '../UI/Card';
import { useState } from 'react';

function ProductItem(props) {
    var [title, setTitle] = useState(props.product.title);

    // var title = props.product.title;

    function handleClick() {
        setTitle(title + ' 1');
        console.log(title);
    }

    return (
        <Card className='product-item'>
            <ProductDate date={props.product.date} />
            <div className='product-item__description'>
                <h2>{title}</h2>
                <div className='product-item__price'>{props.product.amount}</div>
                <button onClick={handleClick}>Change Title</button>
            </div>
        </Card>
    );
}

export default ProductItem;