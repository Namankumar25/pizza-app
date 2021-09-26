import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const history = useHistory();

  const { _id } = params;
  //   console.log(_id);

  useEffect(() => {
    fetch(`https://ecom-rest-apis.herokuapp.com/api/products/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setProduct(data);
      });
  });

  return (
    <div className="container mx-auto px-40 text-center">
      <div className="grid-cols-2 flex ml-9 px-60 text-center">
        <div>
          <img src={product.image} alt="" className="w-4/5" />
        </div>
        <div>
          <h1 className="text-lg font-black my-2">{product.name}</h1>
          <h2 className="text-lg font-black my-2">{product.size}</h2>
          <h2 className="text-lg font-black my-1">Rs {product.price}</h2>
          <h2>
            <button className="bg-red-300 px-2 py-2 rounded-full font-bold text-lg hover:bg-yellow-400 mt-2">
              Add to cart
            </button>
            <button
              className="p-2 bg-blue-300 rounded-full my-3 ml-3 font-bold text-lg hover:bg-pink-300"
              onClick={() => {
                history.goBack();
              }}
            >
              back
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
