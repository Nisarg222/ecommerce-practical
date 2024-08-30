import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addRemoveFavorite } from "../../redux/CartSlice";
import { getProducts } from "../../redux/CartSlice";
import Loader from "../common/Loader";
const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const data = useSelector((state) => state);

  const changeFlag = (obj, flag) => {
    const updatedProducts = products.map((item) =>
      item.id === obj.id ? { ...item, isFavorite: flag } : item
    );
    setProducts(updatedProducts);
    if(flag){
        dispatch(addRemoveFavorite(true))
    }else{
        dispatch(addRemoveFavorite(false))

    }
  };
  

  useEffect(() => {
    // return async () => {
      let payload = {};
      dispatch(getProducts(payload))
        .then((result) => {
          let products = [];
          if (Array.isArray(result.payload.products)) {
            result?.payload?.products.map((product) => {
              products.push({
                id: product.id,
                img: product.images[0],
                name: product.title,
                desc: product.description,
                price: product.price,
                icon: <i className="fa fa-shopping-bag"></i>,
                cart: "Add to Cart",
                heart: <i className="fa fa-heart"></i>,
                isFavorite: false,
              });
            });
            setProducts(products);
          } else {
            console.log('')
          }
        })
        .catch((error) => {
          console.log(error)
        });
    // };
  }, []);

  

  return (
    <div className="mt-40 container ml-auto mr-auto">
      <div className="flex flex-col mb-10 mx-4 md:mx-20 lg:flex lg:justify-between lg:flex-row lg:mx-10 lg:gap-10">
        <h1
          className="text-3xl font-semibold mb-6 lg:text-4xl lg:flex lg:justify-center lg:items-center"
          style={{ color: "#45595b" }}
        >
          Our Products
        </h1>
        <ul className="flex flex-row flex-wrap">
          <li
            className="py-2 px-3 border rounded-full text-white w-32 text-center mx-2 my-2 lg:mx-1 hover:cursor-pointer"
            style={{ backgroundColor: "#ffb524" }}
          >
            All Products
          </li>
          {/* <li className='py-2 px-3 border rounded-full w-32 text-center mx-2 my-2 lg:mx-1 hover:cursor-pointer' style={{backgroundColor: '#f4f6f8'}}>Jeans</li>
                    <li className='py-2 px-3 border rounded-full w-32 text-center mx-2 my-2 lg:mx-1 hover:cursor-pointer' style={{backgroundColor: '#f4f6f8'}}>T-shirts</li> */}
        </ul>
      </div>
      <div className="mx-4 sm:mx-20 md:grid md:grid-cols-2 md:gap-4 lg:mx-10 lg:grid-cols-3 xl:grid-cols-4">
        {data?.CartSlice?.isLoading ? (
          <Loader />
        ) : (
          <>
            {products.map((val) => {
              return (
                <div
                  key={val.id}
                  className="box border rounded-lg border-orange-400 mx-auto mb-6 w-full"
                >
                  <div className="w-full relative overflow-clip">
                    <img
                      className="hover:scale-150 duration-500 w-full rounded-lg"
                      src={val.img}
                      alt=""
                    />
                  </div>
                  <div className="text-center">
                    <h3
                      className="text-2xl mt-5 font-semibold"
                      style={{ color: "#45595b" }}
                    >
                      {val.name}
                    </h3>
                    <p
                      className="leading-normal font-normal my-4 w-10/12 mx-auto"
                      style={{ color: "#020e1ccf" }}
                    >
                      {val.desc}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-8 mx-6 xl:mx-3">
                    <p
                      className="font-semibold text-lg"
                      style={{ color: "#0c363b" }}
                    >
                      ${val.price} / Kg
                    </p>
                    <div className="py-2 px-4 lg:px-2 ">
                      {val.isFavorite ? (
                        <div
                          className="pr-4 lg:pr-1 "
                          onClick={() => changeFlag(val,false)}
                          style={{ color: "#f10905" }}
                        >
                          {val.heart}
                        </div>
                      ) : (
                        <div
                          className="pr-4 lg:pr-1  border-black"
                          onClick={() => changeFlag(val,true)}
                          style={{ color: "#2a334f" }}
                        >
                          {val.heart}
                        </div>
                      )}
                    </div>
                    <div className="border rounded-full border-orange-400 py-2 px-4 lg:px-2 ">
                      <span
                        className="pr-4 lg:pr-1 "
                        style={{ color: "#81c408" }}
                      >
                        {val.icon}
                      </span>
                      <button
                        onClick={() => dispatch(addToCart(val))}
                        className="font-semibold btn-class rounded"
                        style={{ color: "#2a334f" }}
                      >
                        {val.cart}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
