import React from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./Components/Details";
import { HiOutlineHomeModern } from "react-icons/hi2";
import Create from "./Components/Create";
import Edit from "./Components/Edit";


function App() {
  const { search, pathname } = useLocation();

  return (
    <div className="h-screen w-[100%] bg-zinc-300 flex">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="text-md font-bold font-gilroy absolute px-3 flex gap-1 items-center justify-center py-1 uppercase bg-slate-300 border rounded-full top-3 left-72 "
        >
            <HiOutlineHomeModern className="text-lg font-bold" />
          Home
        </Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Details/:id" element={<Details />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
