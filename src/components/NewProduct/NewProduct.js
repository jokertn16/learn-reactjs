import ProductForm from "./ProductForm";


function NewProduct(props) {

    const saveProductHandler = (data) => {
        const productData = {
            ...data,
            id: Math.random()
        };
        props.onAddProduct(productData);
    }

    return (
        <ProductForm onSaveProduct={saveProductHandler} />
    );
}

export default NewProduct;