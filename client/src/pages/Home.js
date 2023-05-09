import React, { useEffect, useState } from "react";
import ProductList, { filterProducts } from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import JumbotronCarousel from "../components/JumbotronCarousel";
// import TestCarousel from "../components/TestCarousel";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

const Home = () => {
  const [state] = useStoreContext();
  const [carouselItems, setCarouselItems] = useState([]);
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      setCarouselItems(filterProducts(data.products, currentCategory).slice(0, 3));
    }
  }, [data, currentCategory]);


  return (
    <div className="container">
      {!loading && <JumbotronCarousel items={carouselItems} />}
      <ProductList />
      {/* <Cart /> */}
    </div>
  );
};

export default Home;
