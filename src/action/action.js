export const setSortBy = (price) => ({ type: 'SET_SORT_BY', payload: price });
export const setCategory = (index) => ({ type: 'SET_CATEGORY', payload: index });
export const addPizza = (item) => ({ type: 'ADD_PIZZA', item });
export const deletedBasket = () => ({ type: 'DELETED_BASKET' });
export const deletedBasketItem = (id) => ({ type: 'DELETED_BASKET_ITEM', id });
