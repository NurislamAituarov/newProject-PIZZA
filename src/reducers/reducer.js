import pizza from '../server';
const initialState = {
  pizza,
  filterPizzaId: [],
  count: null,
  filterPrice: 'популярности',
  category: 0,
  totalPrices: 0,
  totalCount: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      // console.log(action.payload);
      return {
        ...state,
        filterPrice: action.payload,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'ADD_PIZZA': {
      // console.log(action.item);
      const newItems = {
        ...state.filterPizzaId,
        [action.item.id]: !state.filterPizzaId[action.item.id]
          ? [action.item]
          : [...state.filterPizzaId[action.item.id], action.item],
      };
      // console.log(newItems);
      const allPizza = Object.values(newItems).flat();
      const allPrices = allPizza.reduce((sum, obj) => obj.price + sum, 0);

      return {
        ...state,
        count: action.item,
        filterPizzaId: newItems,
        totalCount: allPizza,
        totalPrices: allPrices,
      };
    }
    case 'DELETED_BASKET':
      return {
        ...state,
        filterPizzaId: [],
        totalCount: [],
        totalPrices: 0,
      };
    case 'DELETED_BASKET_ITEM':
      return {
        ...state,
        totalPrices:
          state.totalPrices - state.totalCount.filter((item) => item.id === action.id)[0].price,
        totalCount: state.totalCount.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
};

export default reducer;
