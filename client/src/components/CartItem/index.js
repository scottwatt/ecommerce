import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './CartItem.css'

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row cart-item-container">
      <div className="item-image">
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div className="item-details">
        <div>{item.name}, ${item.price}</div>
        <div className="qty-and-trash">
          <div className="qty-controls">
            <span>Qty:</span>
            <input
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
            />
          </div>
          <div className="trash-container">
            <span
              className="trash"
              role="img"
              aria-label="trash"
              onClick={() => removeFromCart(item)}
            >
              🗑️
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
