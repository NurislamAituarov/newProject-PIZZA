import './header.scss';
import pizza from '../../image/pizza.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { offcanvas } from '../../action/action';
import Cart from '../svg/Cart';

const Header = () => {
  const addedPizzas = useSelector((state) => state.count);
  const prices = useSelector((state) => state.totalPrices);

  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="container">
        <NavLink to="/newProject-PIZZA">
          <div className="header__logo">
            <img
              onClick={() => dispatch(offcanvas())}
              width="100"
              height="100"
              src={pizza}
              alt="Pizza logo"
            />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </NavLink>
        <div className="header__cart">
          <NavLink to="/Cart" className="button button--cart">
            <span>{prices} ₽</span>
            <div className="button__delimiter"></div>
            <Cart addedPizzas={addedPizzas} />
            <span>{addedPizzas}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
