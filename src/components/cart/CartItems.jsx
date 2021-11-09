import { memo, useEffect, useRef } from 'react';
import './cartItems.scss';
import { useDispatch } from 'react-redux';
import { deletedBasketItem, countAdd, countRemove } from '../../action/action';

const CartItems = memo(({ item, countTotal }) => {
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
  // console.log(countTotal, totalCount.length);

  function totalCountAdd(id) {
    dispatch(countAdd(id));
  }
  function totalCountRemove(id) {
    dispatch(countRemove(id));
  }
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
            <strong
              style={totalCount.length === 1 ? { display: 'none' } : null}
              onClick={() => totalCountRemove(item.id)}>
              -
            </strong>
            <b>{totalCount.length}</b>
            <strong onClick={() => totalCountAdd(item.id)}>+</strong>
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
});

export default CartItems;
