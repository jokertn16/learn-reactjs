import ProductItem from "./ProductItem";
import './Product.css'
import Card from "../UI/Card";
import ProductFilter from "./ProductFilter";
import { useState } from "react";

function Product(props) {
    const [filterYear, setFilterYear] = useState('');

    const getYearFilterHandler = (year) => {
        setFilterYear(year);
    }

    return (
        <Card className="products">
            <ProductFilter onGetYearFilter={getYearFilterHandler} />

            {filterYear === '' 
                ? props.products.map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                    ></ProductItem>))  
                : props.products.filter(item => item.date.getFullYear() === filterYear).map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                    ></ProductItem>))
            }
        </Card>
    );
}

export default Product;