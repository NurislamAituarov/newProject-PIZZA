import { useEffect, useRef } from 'react';
import './cartItems.scss';
import { useDispatch } from 'react-redux';
import { deletedBasketItem } from '../../action/action';

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const cartItem = useRef();
  const hr = useRef();
  const count = !item.count ? 1 : item.count + 1;

  useEffect(() => {
    cartItem.current.addEventListener('mouseover', () => {
      hr.current.style.backgroundColor = '#e2b00b';
    });
    cartItem.current.addEventListener('mouseout', () => {
      hr.current.style.backgroundColor = 'rgba(243, 243, 243, 0.4)';
    });
  }, []);
  // console.log(item);
  return (
    <>
      <div ref={cartItem} className="cart__item">
        <div className="first">
          <div className="cart__item-img">
            <img className="pizza-block__image" src={item.url} alt="Pizza" />
          </div>
          <div className="cart__item-info">
            <h3>{item.name}</h3>
            <p>
              {item.type}, {item.size} см.
            </p>
          </div>
        </div>
        <div className="second">
          <div className="cart__item-count">
            <strong onClick={() => count - 1}>-</strong>
            <b>{count}</b>
            <strong>+</strong>
          </div>
          <div className="cart__item-price">
            <b>{count > 1 ? item.price * 2 : item.price} ₽</b>
          </div>
          <div className="cart__item-remove">
            <span onClick={() => dispatch(deletedBasketItem(item.id))}>X</span>
          </div>
        </div>
      </div>
      <hr ref={hr}></hr>
    </>
  );
};

export default CartItems;
