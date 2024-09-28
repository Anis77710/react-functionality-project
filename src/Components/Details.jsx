import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import { productContex } from "../utils/Contex";
import Loading from "./Loading";
import { toast } from "react-toastify";

function Details() {
  const [contextProducts, setContextProducts] = useContext(productContex); // Get and update the context products
  const [product, setProduct] = useState(null); // For the specific product details
  const { id } = useParams(); // Get the product ID from the URL
  const navigator = useNavigate();

  // Fetch product from the API if not in context
  const fetchProductFromAPI = async () => {
    try {
      const { data } = await axios(`/products/${id}`);
      setProduct(data); // Set the product from the API
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("ID from URL:", id);
    console.log("Context Products:", contextProducts);

    // Find product in context, handling both string and number IDs
    const productInContext = contextProducts.find(
      (item) => item.id == id // Loose comparison to handle type mismatch
    );

    if (productInContext) {
      setProduct(productInContext); // Set product from context if it exists
    } else {
      fetchProductFromAPI(); // Fetch from API if not found in context
    }
  }, [id, contextProducts]);

  if (!product) {
    return <Loading />; // Display loading state while data is being fetched
  }

  const productDeleteHandler = (id) => {
    // Filter the product from contextProducts array
    const filteredProducts = contextProducts.filter((p) => p.id !== id);

    // Update the context with the remaining products
    setContextProducts(filteredProducts);

    // Save the updated product list to local storage
    localStorage.setItem("products", JSON.stringify(filteredProducts));

    toast.success("Product deleted successfully")
    // Navigate back to the home page after deletion
    navigator("/");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="border-black shadow-sm shadow-slate-950 h-[85%] w-[70%] rounded-xl flex gap-3">
        <div className="h-full w-[50%] flex items-center justify-center p-12 border-black">
          <img
            className="h-full w-full object-contain mix-blend-multiply"
            src={product.image}
            alt=""
          />
        </div>
        <div className="h-full w-[50%] p-3 pt-14 relative">
          <h1 className="text-[1.8vw] mb-2 font-bold font-gilroyBold">
            {product.title}
          </h1>
          <h2 className="text-gray-800 font-gilroy text-xl mb-2 uppercase">
            Price: <span className="text-zinc-900 italic">${product.price}</span>
          </h2>
          <p
            className="text-[1.4vw] mb-2 font-gilroy font-bold overflow-y-auto max-h-32"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {product.description}
          </p>
          <h1 className="font-gilroyBold text-xl uppercase text-gray-600">
            {product.category}
          </h1>
          <h1 className="font-gilroy text-xl mb-5 uppercase text-gray-600">
            {product.rating?.count ? `(${product.rating.count} reviews)` : ""}
          </h1>
          <div className="flex gap items-center justify-evenly px-16">
            <Link
              to={`/edit/${product.id}`}
              className="px-6 py-1 bg-blue-500 text-white font-gilroyBold rounded-md text-xl capitalize"
            >
              edit
            </Link>
            <button
              onClick={() => productDeleteHandler(product.id)}
              className="px-6 py-1 bg-red-500 text-white font-gilroyBold rounded-md text-xl capitalize"
            >
              delete
            </button>
          </div>
          <div
            onClick={() => navigator(-1)}
            className="cursor-pointer hover:scale-100 px-2 py-2 text-3xl font-semibold rounded-full absolute right-5 top-3"
          >
            <IoClose />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
