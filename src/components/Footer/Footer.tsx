import { Link } from 'react-router-dom';
import globe from '@assets/icons/interface_icons/globe.svg';
import telegram from '@assets/icons/social_icons/telegram.svg';
import vk from '@assets/icons/social_icons/vk.svg';
import whatsapp from '@assets/icons/social_icons/whatsapp.svg';
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <Link to="/" className={`logo ${style.hide}`}>
        qpick
      </Link>
      <ul className={style.footer__list}>
        <Link to="favorite" className={style.footer__item}>
          <span>Избранное</span>
        </Link>
        <Link to="/basket" className={style.footer__item}>
          <span>Корзина</span>
        </Link>
        <li className={style.footer__item}>
          <span>Контакты</span>
        </li>
      </ul>
      <ul className={style.footer__list}>
        <li className={style.footer__item}>
          <span>Условия сервиса</span>
        </li>
        <li className={style.footer__language}>
          <img src={globe} alt="globe" />
          <div className={`${style.language} ${style.active}`}>Рус</div>
          <div className={style.language}>Eng</div>
        </li>
      </ul>
      <div className={style.footer__social}>
        <a href="https://vk.com/mvpudeev">
          <img src={vk} alt="vk" />
        </a>
        <a href="https://t.me/mvpudeev" target="_blank">
          <img src={telegram} alt="telegram" />
        </a>
        <a href="https://www.whatsapp.com/?lang=ru_RU" target="_blank">
          <img src={whatsapp} alt="whatsapp" />
        </a>
      </div>
    </footer>
  );
};
