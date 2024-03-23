import favourite from '@assets/icons/interface_icons/favourite.svg';
import basket from '@assets/icons/interface_icons/basket.svg';
import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.navigation}>
      <div className="logo">qpick</div>
      <div className={style.wrapper}>
        <a href="#" className={style.link}>
          <span className={style.count}>2</span>
          <img src={favourite} alt="favourite" className={style.favourite} />
        </a>
        <a href="#" className={style.link}>
          <span className={style.count}>2</span>
          <img src={basket} alt="basket" />
        </a>
      </div>
    </header>
  );
};
