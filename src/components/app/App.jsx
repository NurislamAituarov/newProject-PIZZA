import Header from '../header/Header';
import ContentTop from '../content-top/ContentTop';
import './App.scss';
import ContentsItem from '../contents-item/ContentsItem';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import uparrow from '../../image/uparrow.svg';

// динамические импорты
const Cart = lazy(() => import('../cart/Cart'));

const App = () => {
  const filterPrice = useSelector((state) => state.filterPrice);
  const filter = useSelector((state) => state.filterCategory);
  const array = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const state = useSelector((state) => {
    switch (state.filterPrice) {
      case 'популярности':
        return state.pizza.sort((a, b) => {
          return b.rating - a.rating;
        });
      case 'цене':
        return state.pizza.sort((a, b) => {
          return a.price - b.price;
        });
      case 'алфавиту':
        return state.pizza.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      default:
        return state.pizza;
    }
  });
  const filterState = state.filter((el) => {
    switch (filter) {
      case 0:
        return el;
      case 1:
        return el.category === 1;
      case 2:
        return el.category === 2;
      case 3:
        return el.category === 3;
      case 4:
        return el.category === 4;
      case 5:
        return el.category === 5;
      default:
        return el;
    }
  });

  function onClickUp(el) {
    el.preventDefault();
    const blockID = el.currentTarget.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <title>React Pizza</title>
      </Helmet>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Route path="/newProject-PIZZA">
            <div className="content">
              <div className="container">
                <ContentTop state={array} filterPrice={filterPrice} />
                <h2 className="content__title">Все пиццы</h2>
                <TransitionGroup components="div" className="content__items">
                  {filterState.map((item) => (
                    <CSSTransition key={item.id} timeout={500} classNames="my-node">
                      <ContentsItem key={item.id} state={item} />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            </div>
          </Route>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Route exact path="/Cart" component={Cart} />
          </Suspense>

          <a onClick={onClickUp} href="#header" className="btn__up">
            <img src={uparrow} alt="up" width="30" height="30" />
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
