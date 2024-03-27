import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Link } from 'react-router-dom';
import favorite from '@assets/icons/interface_icons/favorite.svg';
import basket from '@assets/icons/interface_icons/basket.svg';
import style from './Header.module.scss';

export const Header = () => {
  const count = useSelector(
    (state: RootState) => state.basket.countProductsInBasket
  );

  const countLike = useSelector((state: RootState) => state.basket.countLike);

  return (
    <header className={style.navigation}>
      <Link to="/" className="logo">
        qpick
      </Link>
      <div className={style.wrapper}>
        <Link to="/favorite" className={style.link}>
          {countLike >= 1 && <span className={style.count}>{countLike}</span>}
          <img src={favorite} alt="favorite" className={style.favorite} />
        </Link>
        <Link to="/basket" className={style.link}>
          {count >= 1 && <span className={style.count}>{count}</span>}
          <img src={basket} alt="basket" />
        </Link>
      </div>
    </header>
  );
};
