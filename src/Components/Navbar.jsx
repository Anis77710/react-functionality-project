import React, { useContext } from "react";
import { productContex } from "../utils/Contex";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [product] = useContext(productContex);

  let distinct_category =
    product && product.reduce((acc, cv) => [...acc, cv.category], []);

  distinct_category = [...new Set(distinct_category)];

  
  

  // console.log(distinct_category);

  return (
    <div className="nav w-[23%] h-full bg-zinc-200 border-r-1 border-zinc-400 p-10 flex flex-col">
      <Link to={'/Create'} className="px-3 py-2 bg-slate-300 mb-8 font-semibold rounded-lg">
        Add a new product
      </Link>


      <h2 className="text-3xl font-bold font-gilroyBold uppercase mb-4">Products</h2>

     


      <div className="list-disc list-inside flex flex-col ">
        {distinct_category.map((category, index)=>(
        <Link key={index} to={`/?category=${category}`}> <span className=" cursor-pointer font-gilroyBold mt-3  capitalize text-xl">{category}</span></Link>
        ))}
      </div>

    </div>
  );
}

export default Navbar;
