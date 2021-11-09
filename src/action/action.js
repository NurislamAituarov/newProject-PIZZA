export const setSortBy = (price) => ({ type: 'SET_SORT_BY', payload: price });
export const setCategory = (index) => ({ type: 'SET_CATEGORY', payload: index });
export const addPizza = (item) => ({ type: 'ADD_PIZZA', item });
export const deletedBasket = () => ({ type: 'DELETED_BASKET' });
export const deletedBasketItem = (id) => ({ type: 'DELETED_BASKET_ITEM', id });
export const countAdd = (id) => ({ type: 'TOTAL_COUNT_ADD', payload: id });
export const countRemove = (id) => ({ type: 'TOTAL_COUNT_REMOVE', payload: id });
export const setCategoryFilter = (name) => ({ type: 'SET_CATEGORY_FILTER', payload: name });

export const offcanvas = () => ({ type: 'OFF_CANVAS' });
