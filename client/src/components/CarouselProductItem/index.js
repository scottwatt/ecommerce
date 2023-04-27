import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import "./CarouselProductItem.css"

function CarouselProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;
  const { cart } = state;

  const linkStyle = {
    cursor: "pointer",
  };

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }  };

  return (
    <div className="carouselProductItem">
      <Link to={`/products/${item._id}`}>
        <img
          alt={item.name}
          src={`/images/${item.image}`}
          className="carouselProductItemImage"
        />
      </Link>
      <div className="carouselProductItemInfo">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <button className="btn btn-primary" onClick={addToCart}>
          ${item.price}
        </button>

      </div>
    </div>
  );
}

export default CarouselProductItem;
