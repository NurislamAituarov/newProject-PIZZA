import { useEffect, useRef } from 'react';
import './cartItems.scss';
import { useDispatch } from 'react-redux';
import { deletedBasketItem } from '../../action/action';

const CartItems = ({ item, countTotal }) => {
  const dispatch = useDispatch();
  const cartItem = useRef();
  const hr = useRef();

  useEffect(() => {
    cartItem.current.addEventListener('mouseover', () => {
      hr.current.style.backgroundColor = '#e2b00b';
    });
    cartItem.current.addEventListener('mouseout', () => {
      hr.current.style.backgroundColor = 'rgba(243, 243, 243, 0.4)';
    });
  }, []);

  const totalCount = countTotal[item.id];
  // console.log(item, countTotal, totalCount.length);
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
            <strong>-</strong>
            <b>{totalCount.length}</b>
            <strong>+</strong>
          </div>
          <div className="cart__item-price">
            <b>{item.price * totalCount.length} ₽</b>
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
