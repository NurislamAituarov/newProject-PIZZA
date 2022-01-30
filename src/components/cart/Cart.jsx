import { NavLink } from 'react-router-dom';
import CartItems from './CartItems';
import './cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deletedBasket } from '../../action/action';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import DeletedCart from '../svg/DeletedCart';
import BackToHome from '../svg/BackToHome';

const Cart = () => {
  const pizzaItem = useSelector((state) => state.totalCount);
  const price = useSelector((state) => state.totalPrices);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.filterPizzaId);
  const totalCount = useSelector((state) => state.count);

  const statePizzaItems = Object.values(state).map((item) => {
    return item[0];
  });

  const obj = {};
  pizzaItem.forEach((item, i) => {
    obj.name = obj.name ? obj.name + ', ' + item.name : item.name;
    obj.price = obj.price ? +obj.price + +item.price : item.price;
    obj.type = obj.type ? obj.type + ', ' + item.type : item.type;
    obj.tips = (obj.price * 5) / 100;
    // obj.size = item.size;
  });

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
                <DeletedCart />
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
                <NavLink
                  exact
                  to="/newProject-PIZZA"
                  className="button button--outline button--add go-back-btn">
                  <BackToHome />
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
