import axios from './Axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContex = createContext();
function Contex(props){

    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || null);

    // const getProducts = async()=> {
    //     try {
    //         const {data} = await axios('/products')
    //         setProducts(data);
            
    //     }
    //     catch (err) {

    //     }
    // }

    // useEffect(()=>{
    //     getProducts()
    // }, [])

    // console.log(products);
    

    return(
        <productContex.Provider value={[products, setProducts]}>
            {props.children}
        </productContex.Provider>
    )
}
export default Contex;