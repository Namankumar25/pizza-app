import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

import SingleProduct from "./components/SingleProduct";
import { Cartcontext } from "./Cartcontext";
import { useEffect, useState } from "react";

function App() {
  const [cart, setcart] = useState({});

  // fetch cart from local storage on page load
  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    setcart(JSON.parse(cart))
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart",JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <Router>
        {/* to pass the data from one component to another component we use context method so we wrap everything inside context component where we want to send some data  */}

        <Cartcontext.Provider value={{ cart,setcart }}>
          <Navbar />

          <Switch>
            <Route path="/" component={Home} exact></Route>

            <Route path="/products" component={ProductsPage} exact></Route>

            <Route
              path="/products/:_id"
              component={SingleProduct}
              exact
            ></Route>

            <Route path="/cart" component={Cart} exact></Route>
          </Switch>
        </Cartcontext.Provider>
      </Router>
    </>
  );
}

export default App;
