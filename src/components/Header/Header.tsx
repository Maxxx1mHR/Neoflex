import favourite from '@assets/icons/interface_icons/favourite.svg';
import basket from '@assets/icons/interface_icons/basket.svg';
import style from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Link } from 'react-router-dom';

export const Header = () => {
  const count = useSelector(
    (state: RootState) => state.basket.countProductsInBasket
  );

  return (
    <header className={style.navigation}>
      <Link to="/" className="logo">
        qpick
      </Link>
      <div className={style.wrapper}>
        <a href="#" className={style.link}>
          <span className={style.count}>2</span>
          <img src={favourite} alt="favourite" className={style.favourite} />
        </a>
        <Link to="/basket" className={style.link}>
          {count >= 1 && <span className={style.count}>{count}</span>}
          <img src={basket} alt="basket" />
        </Link>
      </div>
    </header>
  );
};
