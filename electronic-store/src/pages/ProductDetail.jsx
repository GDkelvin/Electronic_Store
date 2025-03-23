import React, { useEffect, useState } from "react";
import TechnicalDetails from "../components/ProductDetail/TechnicalDetails";
import AddToCart from "../components/ProductDetail/AddToCart";
import "../css/ProductDetail.css";
import BasicProductDetails from "../components/ProductDetail/BasicProductDetails"
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`)
                const data = await response.json();
                console.log(`Product ${id}: `,data);
                setProduct(data);
                setLoading(false);
            } catch (e) {
                console.error("failed to fetch data: ", e.message);
            }
        }
        fetchProduct();
    }, [id])
    if(loading){
        return (<p>Loading...</p>)
    }
    if(!product){
        return (<p>Loading...</p>)
    }
    
    return (
        <>
            <Breadcrumb></Breadcrumb>
            <div className="BPD">
                
                <div >
                    <BasicProductDetails product={product}/>
                    <TechnicalDetails attributes={product.attributes}/>
                </div>

                <div >
                    <AddToCart product={product}/>
                </div>
            </div>
        </>
    )
}

export default ProductDetail