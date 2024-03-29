import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItemsInCart = state.cart.reduce((acc, item) => acc + item.purchaseQuantity, 0);


  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function handleOverlayClick(event) {
    // If the click is directly on the overlay (not the cart), close the cart.
    if (event.target.classList.contains('cart-overlay')) {
      toggleCart();
    }
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <>
      <div className="cart-toggle" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
        <span className="cart-items-count">{totalItemsInCart}</span>
      </div>
      {isCartOpen && (
        <div className="cart-overlay" onClick={handleOverlayClick}>
          <div className="cart-panel">
            <div className="close" onClick={toggleCart}>
              [close]
            </div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
              <>
                {state.cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
                <div className="checkout-container">
                  <strong className='mx-2'>Total: ${calculateTotal()}</strong>
                  {Auth.loggedIn() ? (
                    <button className="checkout-button" onClick={submitCheckout}>Checkout</button>
                  ) : (
                    <span>(log in to check out)</span>
                  )}
                </div>
              </>
            ) : (
              <h3>
                <span role="img" aria-label="shocked">
                  😱
                </span>
                You haven't added anything to your cart yet!
              </h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
