import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import {useState, useEffect} from "react";
//import {Button} from "@material-ui/core";


export default function Catalog(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      agent.Catalog.list()
          .then(products => {
              setProducts(products)
          })
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
  }, [])

  if (loading) return <LoadingComponent message="Loading products..." />

  return (
      <>
          <ProductList products={products} />
      </>
  )
}