import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { productContex } from "../utils/Contex";
import Loading from "./Loading";
import axios from "../utils/Axios";

function Home() {
  const [products] = useContext(productContex);
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // If there is no valid category, show all products
    if (!category || category === "undefined") {
      setFilteredProducts(products);

    } else {
      // If category is valid, fetch products by category
      // getProductCategory();
      setFilteredProducts(products.filter(p => p.category === category))
    }
  }, [category, products]);

  return products.length > 0 ? (
    <>
      <Navbar />
      <div className="hero h-full w-[80%] px-12 py-14 flex shrink-0 flex-wrap gap-6 overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              to={`/Details/${p.id}`}
              className="box h-52 rounded-md overflow-hidden w-52 border shadow border-zinc-400 p-3"
              key={i}
            >
              <div className="h-[80%] w-full mb-1">
                <img
                  className="h-full w-full mix-blend-multiply object-contain hover:scale-110"
                  src={p.image}
                  alt={p.title}
                />
              </div>
              <p className="h-[15%] text-sm text-center w-full">{p.title}</p>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
