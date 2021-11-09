import { NavLink } from 'react-router-dom';
import CartItems from './CartItems';
import './cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletedBasket } from '../../action/action';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const pizzaItem = useSelector((state) => state.totalCount);
  const price = useSelector((state) => state.totalPrices);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.filterPizzaId);
  const totalCount = useSelector((state) => state.count);
  // console.log(state);

  const statePizzaItems = Object.values(state).map((item) => {
    // console.log(item);
    return item[0];
  });
  // console.log(statePizzaItems);

  const obj = {};
  pizzaItem.forEach((item, i) => {
    obj.name = obj.name ? obj.name + ', ' + item.name : item.name;
    obj.price = obj.price ? +obj.price + +item.price : item.price;
    obj.type = obj.type ? obj.type + ', ' + item.type : item.type;
    obj.tips = (obj.price * 5) / 100;
    // obj.size = item.size;
  });
  // console.log(obj);
  function onSubmit() {
    const div = document.createElement('div');
    document.querySelector('.cart__bottom').appendChild(div);
    div.classList.add('added-words');
    div.innerHTML = 'оплата обрабатывается';

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        div.innerHTML = 'оплата прошла успешно';
        return response.json();
      })
      .then((data) => {
        const div = document.createElement('div');
        div.innerHTML = `чаевые ${data.tips} ₽`;
        document.getElementById('price-num').appendChild(div);
        console.log(data);
        setTimeout(() => {
          div.remove();
        }, 5000);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(deletedBasket());
          div.remove();
        }, 2000);
      });
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <title>basket of pizzas in react</title>
      </Helmet>
      <div className="content">
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">Корзина</h2>
              <div onClick={() => dispatch(deletedBasket())} className="cart__clear">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 5H4.16667H17.5"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33337 9.16667V14.1667"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6666 9.16667V14.1667"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Очистить корзину</span>
              </div>
            </div>
            <TransitionGroup components="div" className="content__items__cart">
              {statePizzaItems.map((item) => {
                if (item !== undefined) {
                  return (
                    <CSSTransition key={item.id} timeout={500} classNames="cart-node">
                      <CartItems key={item.id} item={item} countTotal={state} />
                    </CSSTransition>
                  );
                } else {
                  return null;
                }
              })}
            </TransitionGroup>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  {' '}
                  Всего пицц: <b>{totalCount} шт.</b>{' '}
                </span>
                <span id="price-num">
                  {' '}
                  Сумма заказа: <b>{price} ₽</b>{' '}
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <NavLink exact to="/" className="button button--outline button--add go-back-btn">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L1 6.93015L6.86175 1"
                      stroke="#D3D3D3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>Вернуться назад</span>
                </NavLink>
                <div onClick={onSubmit} className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
