import React, { useContext, useEffect, useState } from "react";
import { productContex } from "../utils/Contex";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

function Edit() {
  const [products, setProducts] = useContext(productContex);
  const navigator = useNavigate();
  //   const [title, setTitle] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [image, setImage] = useState("");

  const { id } = useParams();
  const [product, setProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const changeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.price.trim().length < 1
    ) {
      alert("Please fill all the fields correctly.");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Product Edited!!")
    navigator("/");
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  return (
    <form
      onSubmit={addProductHandler}
      className="h-screen w-full flex items-center justify-center"
    >
      <div className="h-[90%] w-[50%]  flex flex-col items-center justify-start p-5 font-gilroy relative">
        <h1 className="font-gilroyBold text-center uppercase text-2xl mb-7">
          Edit the product
        </h1>
        <input
          type="url"
          className="bg-slate-200 w-[75%] p-3 rounded-xl mb-3"
          placeholder="Enter the Image URL..."
          name="image"
          onChange={changeHandler}
          value={product && product.image}
        />

        <input
          type="text"
          className="bg-slate-200 w-[75%] p-3 rounded-xl mb-3"
          placeholder="Enter the Title..."
          name="title"
          onChange={changeHandler}
          value={product && product.title}
        />
        <div className="flex justify-between w-[75%]">
          <input
            type="number"
            className="bg-slate-200 w-[48%]  p-3 rounded-xl mb-3"
            placeholder="Enter the Price..."
            name="price"
            onChange={changeHandler}
            value={product && product.price}
          />
          <input
            type="text"
            className="bg-slate-200 w-[48%] p-3 rounded-xl mb-3"
            placeholder="Enter the Category..."
            name="category"
            onChange={changeHandler}
            value={product && product.category}
          />
        </div>

        <textarea
          className="bg-slate-200 w-[75%] h-52 p-3 rounded-xl mb-3"
          placeholder="Enter the Description of the Product..."
          name="description"
          onChange={changeHandler}
          value={product && product.description}
        ></textarea>
        <button className="bg-slate-400 text-white  p-3 rounded-xl font-semibold hover:bg-slate-500 absolute bottom-12 left-24">
          Save Product
        </button>
      </div>
    </form>
  );
}

export default Edit;
