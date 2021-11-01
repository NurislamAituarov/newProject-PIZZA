import './content-top.scss';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../action/action';

const ContentTop = ({ state }) => {
  const [active, setActive] = useState('Все');
  const [sort, setSort] = useState(false);
  const [sortFilter, setSortFilter] = useState('популярности');
  const refItem = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (!e.path.includes(refItem.current)) {
        setSort(false);
      }
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          setSort(false);
        }
      });
    });
  }, []);

  const onSortFilter = () => {
    setSort(!sort);
  };

  return (
    <div className="content__top">
      <div className="categories">
        <ul>
          {state.map((item, index) => {
            return (
              <li
                className={active === item ? 'active' : null}
                onClick={() => setActive(item)}
                key={index}>
                {' '}
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div ref={refItem} className="sort">
        <div className="sort__label">
          <svg
            onClick={onSortFilter}
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
};

export default ContentTop;
