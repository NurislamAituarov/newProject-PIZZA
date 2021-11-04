import pizza from '../server';
const initialState = {
  pizza,
  filterPizzaId: [],
  count: 0,
  filterPrice: 'популярности',
  filterCategory: 0,
  category: 0,
  totalPrices: 0,
  totalCount: [],
  showOffcanvas: false,
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
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        filterCategory: action.payload,
      };
    case 'ADD_PIZZA': {
      const newItems = {
        ...state.filterPizzaId,
        [action.item.id]: !state.filterPizzaId[action.item.id]
          ? [action.item]
          : [...state.filterPizzaId[action.item.id], action.item],
      };
      const allPizza = Object.values(newItems).flat();
      const allPrices = allPizza.reduce((sum, obj) => obj.price + sum, 0);

      return {
        ...state,
        filterPizzaId: newItems,
        totalCount: allPizza,
        totalPrices: allPrices,
        count: allPizza.length,
      };
    }
    case 'DELETED_BASKET':
      return {
        ...state,
        filterPizzaId: [],
        totalCount: [],
        totalPrices: 0,
        count: 0,
      };
    case 'DELETED_BASKET_ITEM':
      const newCount =
        state.filterPizzaId[action.id] && state.count - state.filterPizzaId[action.id].length;
      const newTotalPrices =
        state.totalPrices -
        state.filterPizzaId[action.id]
          .filter((item) => item.id === action.id)
          .reduce((acu, prev) => acu + prev.price, 0);
      delete state.filterPizzaId[action.id];
      return {
        ...state,
        count: newCount,
        totalPrices: newTotalPrices,

        // totalCount: state.totalCount.filter((item) => item.id !== action.id),
        // filterPizzaId: {
        //   ...state.filterPizza,
        //   [action.id]: [],
        // },
      };
    case 'OFF_CANVAS':
      return {
        ...state,
        showOffcanvas: state.showOffcanvas ? false : true,
      };
    default:
      return state;
  }
};

export default reducer;
