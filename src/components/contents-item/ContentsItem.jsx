import './contentItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, memo } from 'react';
import { addPizza } from '../../action/action';

const ContentsItem = memo(({ state }) => {
  const typeName = ['тонкое', 'традиционное'];
  const sizes = [26, 30, 40];

  const [activeType, setActiveType] = useState(typeName[state.types[0]]);
  const [activeSizes, setActiveSizes] = useState(state.sizes[0]);
  const totalAddAll = useSelector((state) => state.filterPizzaId);
  const dispatch = useDispatch();
  // console.log('render');
  function onSelectType(type) {
    setActiveType(type);
  }
  const addToBasket = () => {
    const item = {
      id: state.id,
      name: state.name,
      url: state.imageUrl,
      price: state.price,
      type: activeType,
      size: activeSizes,
    };

    dispatch(addPizza(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={state.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{state.name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {typeName.map((type, i) => {
            return (
              <li
                key={type}
                onClick={() => onSelectType(type)}
                className={
                  activeType === type
                    ? 'active'
                    : null || !state.types.includes(i)
                    ? 'selected'
                    : null
                }>
                {type}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((el, i) => {
            return (
              <li
                onClick={() => {
                  setActiveSizes(el);
                }}
                className={
                  activeSizes === el
                    ? 'active'
                    : null || !state.sizes.includes(el)
                    ? 'selected'
                    : null
                }
                key={i}>
                {el} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {state.price} ₽</div>
        <div onClick={addToBasket} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {totalAddAll[state.id] && <i>{totalAddAll[state.id].length}</i>}
        </div>
      </div>
    </div>
  );
});

export default ContentsItem;
