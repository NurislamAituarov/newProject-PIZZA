import './BurgerMenu.scss';

export default function BurgerMenu({ hamburger, setHamburger }) {
  return (
    <div className="container__hamburger">
      <input type="checkbox" id="checkbox1" className="checkbox1 visuallyHidden" />
      <label htmlFor="checkbox1">
        <div onClick={() => setHamburger(!hamburger)} className="hamburger hamburger1">
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
          <span className="bar bar4"></span>
        </div>
      </label>
    </div>
  );
}
