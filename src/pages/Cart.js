import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../Cartcontext";

const Cart = () => {
  let total = 0;
  const [prod, setproducts] = useState([]);
  const [ids, setids] = useState([]);
  const { cart, setcart } = useContext(Cartcontext);
  const [fetched, isfetched] = useState(false)

  //   useEffect(() => {
  //     if (!cart.items) {
  //       return;
  //     }

  //     fetch('https://star-spark-pasta.glitch.me/api/products',{
  //         method:"GET",
  //         headers:{
  //             'Content-Type':'application/json'
  //         }
  //     }).then(res=>res.json()).then(products=>{
  //         setproducts(products)
  //     })

  //   }, [cart]);

  useEffect(() => {

    // this is because on incrementing and decrementing the products it makes a call on the server but that are unecessary and increase the loads because there is no need in incr/decre the products
    if (fetched) {
      return
    }

    fetch("https://ecom-rest-apis.herokuapp.com/api/products").then(
      (response) =>
        response.json().then((prodata) => {
          setproducts(prodata);
          isfetched(true)
        })
    );
    if (!cart.items) {
      return;
    }
    setids(Object.keys(cart.items));
  }, [cart,fetched]);

  const getQty = (productId) => {
    if (!cart.items) {
      return;
    }
    return cart.items[productId];
  };

  const increment = (productId) => {
    const oldQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = oldQty + 1;
    _cart.totalItem += 1;
    setcart(_cart);
  };

  const decrement = (productId) => {
    const oldQty = cart.items[productId];

    if (oldQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = oldQty - 1;
    _cart.totalItem -= 1;
    setcart(_cart);
  };

  const getSum = (productId, productPrice) => {
    const sum = productPrice * getQty(productId);
    total += sum;
    return sum;
  };

  const handleDelete = (productId)=>{
     const _cart = {...cart}
     const qty = _cart.items[productId]
     delete _cart.items[productId]
     _cart.totalItem-=qty
     setcart(_cart)
     setproducts(prod.filter((element)=>{return element._id!==productId}))
  }
  
  const handleOrderNow = ()=>{
    alert("Order placed successfully !")
    setcart({})
    setproducts([])
  }

  return (
    <div className="container mx-auto lg:w-1/2 px-50 w-full pb-24">
      <h2 className="my-12 font-bold">Cart items</h2>
      <ul>
        <li>
          {prod
            .filter((element) => {
              return ids.includes(element._id);
            })
            .map((elm) => {
              return (
                <div className="flex items-center justify-around" key={elm._id}>
                  <div className="flex items-center">
                    <img src={elm.image} alt="" className="h-16" />

                    <span className="font-bold ml-4 w-48">{elm.name}</span>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        decrement(elm._id);
                      }}
                      className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                    >
                      -
                    </button>
                    <b className="px-4">{getQty(elm._id)}</b>
                    <button
                      onClick={() => {
                        increment(elm._id);
                      }}
                      className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                    >
                      +
                    </button>
                  </div>
                  <span>Rs {getSum(elm._id, elm.price)}</span>

                  <button onClick={()=>{handleDelete(elm._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                    Delete
                  </button>
                </div>
              );
            })}
        </li>
      </ul>
      <hr className="my-2" />
      <div className="text-right font-bold">Grand Total : Rs {total}</div>
      <div className="text-right mt-4 ">
        <button onClick={()=>{handleOrderNow()}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none text-white">
          Order now
        </button>
      </div>
    </div>
  );
};

export default Cart;
