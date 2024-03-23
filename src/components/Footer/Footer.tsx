import globe from '@assets/icons/interface_icons/globe.svg';
import telegram from '@assets/icons/social_icons/telegram.svg';
import vk from '@assets/icons/social_icons/vk.svg';
import whatsapp from '@assets/icons/social_icons/whatsapp.svg';

import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="logo">qpick</div>
      <ul className={style.footer__list}>
        <li className={style.footer__item}>Избранное</li>
        <li className={style.footer__item}>Корзина</li>
        <li className={style.footer__item}>Контакты</li>
      </ul>
      <ul className={style.footer__list}>
        <li className={style.footer__item}>Условия сервиса</li>
        <li className={style.footer__language}>
          <img src={globe} alt="globe" />
          <div className={`${style.language} ${style.active}`}>Рус</div>
          <div className={style.language}>Eng</div>
        </li>
      </ul>
      <div className={style.footer__social}>
        <img src={vk} alt="vk" />
        <img src={telegram} alt="telegram" />
        <img src={whatsapp} alt="whatsapp" />
      </div>
    </footer>
  );
};
