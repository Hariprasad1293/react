
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import {useState, useEffect} from "react";
//import {Button} from "@material-ui/core";


export default function Catalog(){
    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://product1827.azurewebsites.net/api/rest/v1/productdetails/all')
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])
  
    return(
        <>
            <ProductList products={products}/>
            
        </>
    )
}