import { useSelector } from 'react-redux';

const MapState = () => {
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

  return state;
};
export default MapState;
