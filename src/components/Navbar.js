import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../Cartcontext";

const Navbar = () => {
  const cartStyle = {
    background: "orange",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "23px",
  };

  const {cart} = useContext(Cartcontext)
  console.log(cart);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img
            src="/images/pizza.png"
            className="ml-6"
            style={{ height: 65 }}
            alt=""
          />
        </Link>

        <ul className="flex items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/products">Products</Link>
          </li>
          <li className="ml-6 mr-6">
            <Link to="/cart">
              <div style={cartStyle}>
                <span>{cart.totalItem ? cart.totalItem : 0}</span>
                <img
                  style={{ height: 27 }}
                  className="ml-1"
                  src="/images/cart.png"
                  alt="cart-icon"
                />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
