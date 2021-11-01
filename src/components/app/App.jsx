import Header from '../header/Header';
import ContentTop from '../content-top/ContentTop';
import './App.scss';
import ContentsItem from '../contents-item/ContentsItem';
import { Route } from 'react-router-dom';
import Cart from '../cart/Cart';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const App = () => {
  const filter = useSelector((state) => state);
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
  // console.log(state);
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Route exact path="/">
          <div className="content">
            <div className="container">
              <ContentTop
                state={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}
              />
              <h2 className="content__title">Все пиццы</h2>
              <TransitionGroup components="div" className="content__items">
                {state.map((item) => (
                  <CSSTransition key={item.id} timeout={1000} classNames="my-node">
                    <ContentsItem key={item.id} state={item} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>
        </Route>
        <Route exact path="/Cart" component={Cart} />
      </div>
    </div>
  );
};

export default App;
