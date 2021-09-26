import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../Cartcontext";

const Product = (props) => {
  
  const [isAdding,setisAdding] = useState(false)

  const { cart,setcart} = useContext(Cartcontext);

  const { productdata } = props;

  const addToCart = (event, productdata) => {
    event.preventDefault();
    let _cart = { ...cart };

    // checking if the cart is empty
    if (!_cart.items) {
      _cart.items = {};
    }

    if (_cart.items[productdata._id]) {
      _cart.items[productdata._id] += 1;
    } else {
      _cart.items[productdata._id] = 1;
    }

    if(!_cart.totalItem){
      _cart.totalItem = 0
    }

    _cart.totalItem += 1;
    setcart(_cart)
    setisAdding(true)

    setTimeout(() => {
    setisAdding(false)
    }, 2000);

    // const cart = {
    //     items:{
    //        "id1":2,
    //        "id2":5
    //     },
    //     totalItem : 7
    // }
  };

  return (
    <Link to={`/products/${productdata._id}`}>
      <div>
        <img src={productdata.image} alt="pizza" />
        <div className="text-center">
          <h2 className="text-lg font-bold py-2">{productdata.name}</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
            {productdata.size}
          </span>
        </div>
      </div>

      <div className="flex justify-around items-center mt-4">
        <span>Rs {productdata.price}</span>

        <button
          disabled={isAdding}
          className={`${isAdding ? "bg-green-500" : "bg-yellow-500" } py-1 px-4 rounded-full font-bold`}
          onClick={(e) => {            
            addToCart(e, productdata);
          }}
        >
          {`${isAdding ? "Adding.." : "ADD"}`}

        </button>
      </div>
    </Link>
  );
};

export default Product;