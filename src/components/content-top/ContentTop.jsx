import { useState, useRef, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setCategoryFilter } from '../../action/action';
import BurgerMenu from '../burger-menu/BurgerMenu';
import './content-top.scss';
import cn from 'classnames';

const ContentTop = memo(({ state, filterPrice }) => {
  const category = useSelector((state) => state.filterCategory);
  const [active, setActive] = useState(state[category]);
  const [sort, setSort] = useState(false);
  const [sortFilter, setSortFilter] = useState(filterPrice);
  const [hamburger, setHamburger] = useState(false);

  const refItem = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    function hidden(e) {
      e.stopPropagation();
      if (!e.path.includes(refItem.current)) {
        setSort(false);
      }
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          setSort(false);
        }
      });
    }
    document.body.addEventListener('click', hidden);

    return () => {
      document.body.removeEventListener('click', hidden);
    };
  }, []);

  const onSortFilter = () => {
    setSort(!sort);
  };
  const onClickCategory = (item, index) => {
    setActive(item);
    dispatch(setCategoryFilter(index));
  };

  return (
    <div className="content__top">
      <BurgerMenu hamburger={hamburger} setHamburger={setHamburger} />
      <div
        className={cn('categories', 'fade', {
          show__category: hamburger,
        })}>
        <ul>
          {state.map((item, index) => {
            return (
              <li
                className={active === item ? 'active' : null}
                onClick={() => onClickCategory(item, index)}
                key={index}>
                {' '}
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div ref={refItem} className="sort">
        <div onClick={onSortFilter} className="sort__label">
          <svg
            className={sort ? 'svg' : null}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по: </b>
          <span onMouseOver={onSortFilter}>{sortFilter}</span>
        </div>
        <div className={!sort ? 'sort__popup' : 'show'}>
          <ul>
            {['популярности', 'цене', 'алфавиту'].map((item, i) => {
              return (
                <li
                  className={item === sortFilter ? 'active' : null}
                  onClick={() => {
                    dispatch(setSortBy(item));
                    onSortFilter();
                    setSortFilter(item);
                  }}
                  key={i}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ContentTop;
