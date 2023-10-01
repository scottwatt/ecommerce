import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './productItem.css';
import { REMOVE_FROM_CART } from '../../utils/actions';


function ProductItem(item) {
  const [itemAdded, setItemAdded] = useState(false);
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  function showAddedMessage() {
    setItemAdded(true);
    setTimeout(() => {
      setItemAdded(false);
    }, 3000); // hide message after 3 seconds
  }

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
    }
    showAddedMessage(); 
  }

  const itemInCart = cart.find((cartItem) => cartItem._id === _id)

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: _id
    });
    idbPromise('cart', 'delete', { ...item });
  };


  return (
    <div className="card px-1 py-1">
        {itemAdded && (
            <div className="item-added-message">
                Item added to cart!
            </div>
        )}
        <Link to={`/products/${_id}`}>
            <img
                alt={name}
                src={`/images/${image}`}
                className='productImage'
            />
            <p>{name}</p>
        </Link>
        <div>
            <div>{quantity} {pluralize("item", quantity)} in stock</div>
            <span>${price}</span>
        </div>
        <button className="productButton" onClick={addToCart}>Add to cart</button>
        {itemInCart && (
            <button className="removeButton" onClick={removeFromCart}>Remove from cart</button>
        )}
    </div>
  );
}

export default ProductItem;
