import React, { useContext, useState } from "react";
import { productContex } from "../utils/Contex";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Create() {
  const [products, setProducts] = useContext(productContex);
  const navigator = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      description.trim().length < 5 ||
      category.trim().length < 5 ||
      image.trim().length < 5 ||
      price.trim().length < 1
    ){

        alert("Please fill all the fields correctly.");
        return;
    }
    

    const product = {
      id: nanoid(),
      title,
      price,
      description,
      category,
      image,
    };
    // console.log(product);

    
    setProducts([...products, product]);
    localStorage.setItem('products', JSON.stringify([...products, product]));
    toast.success("Product added successfully");
    navigator('/')
    


    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage("");
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="h-screen w-full flex items-center justify-center"
    >
      <div className="h-[90%] w-[50%]  flex flex-col items-center justify-start p-5 font-gilroy relative">
        <h1 className="font-gilroyBold text-center uppercase text-2xl mb-7">
          Add new product
        </h1>
        <input
          type="url"
          className="bg-slate-200 w-[75%] p-3 rounded-xl mb-3"
          placeholder="Enter the Image URL..."
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />

        <input
          type="text"
          className="bg-slate-200 w-[75%] p-3 rounded-xl mb-3"
          placeholder="Enter the Title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="flex justify-between w-[75%]">
          <input
            type="number"
            className="bg-slate-200 w-[48%]  p-3 rounded-xl mb-3"
            placeholder="Enter the Price..."
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <input
            type="text"
            className="bg-slate-200 w-[48%] p-3 rounded-xl mb-3"
            placeholder="Enter the Category..."
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>

        <textarea
          className="bg-slate-200 w-[75%] h-52 p-3 rounded-xl mb-3"
          placeholder="Enter the Description of the Product..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button className="bg-slate-400 text-white  p-3 rounded-xl font-semibold hover:bg-slate-500 absolute bottom-0 left-24">
          Add Product
        </button>
      </div>
    </form>
  );
}

export default Create;
