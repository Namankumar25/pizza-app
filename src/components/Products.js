import { useState, useEffect} from "react";
import Product from "./Product";


const Products = () => {


  // it captures all the data we pass inside our context
  // const {name}=useContext(Cartcontext);



  // destructuring assignment
  // first element ie products is the data which is passed in usestate and setProducts is the callback to update that data on any event when state changes
  // when data in products changes the component re-renders itself with the new data that is the power of react

  const [products, setProducts] = useState([]);

  // when component mounts then you have to fetch data
  // use Effects use when --> component mounts and destroys
  //                      --> when state changes
  // 2nd argument of useEffect is the dependancy array when the data changes then we have to take action exapmple if we pass products to it so whatever no. of times the products data changes it will call that function which is passed as first argument

  // if we remain it as empty then 1st argument in useEffect runs only one time when components mounted or browser loads the page

  useEffect(() => {
    // runs only one time because
    fetch("https://ecom-rest-apis.herokuapp.com/api/products").then(
      (response) =>
        response.json().then((prodata) => {
          setProducts(prodata);
          console.log(prodata);
        })
    );
  }, []);


  return (
    <div className="container mx-auto px-40">
      <h1 className="font-bold text-lg my-8">Products </h1>

      <div className="grid grid-cols-5 my-8 gap-24">
        {
          products.map((productElement) => {
            return <Product key={productElement._id} productdata={productElement}/>;
          })
        }
      </div>
    </div>
  );
};

export default Products;