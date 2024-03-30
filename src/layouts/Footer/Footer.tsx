import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext, LanguageKey } from '@context/LanguageContext';

import globe from '@assets/icons/interface_icons/globe.svg';
import telegram from '@assets/icons/social_icons/telegram.svg';
import vk from '@assets/icons/social_icons/vk.svg';
import whatsapp from '@assets/icons/social_icons/whatsapp.svg';

import style from './Footer.module.scss';

export const Footer = () => {
  const { setLanguage, language } = useContext(LanguageContext);

  const {
    data: { favorites, basket, contacts, termsOfService },
  } = useContext(LanguageContext);

  return (
    <footer className={style.footer}>
      <Link to="/" className={`logo ${style.hide}`}>
        qpick
      </Link>
      <ul className={style.footer__list}>
        <Link to="favorite" className={style.footer__item}>
          <span>{favorites}</span>
        </Link>
        <Link to="basket" className={style.footer__item}>
          <span>{basket}</span>
        </Link>
        <li className={style.footer__item}>
          <span>{contacts}</span>
        </li>
      </ul>
      <ul className={style.footer__list}>
        <li className={style.footer__item}>
          <span>{termsOfService}</span>
        </li>
        <li className={style.footer__language}>
          <img src={globe} alt="globe" />
          <div
            className={
              language === 'Рус'
                ? `${style.language} ${style.active}`
                : `${style.language}`
            }
            onClick={() => {
              setLanguage(LanguageKey.Ru);
            }}
          >
            {LanguageKey.Ru}
          </div>
          <div
            className={
              language === 'Eng'
                ? `${style.language} ${style.active}`
                : `${style.language}`
            }
            onClick={() => {
              setLanguage(LanguageKey.En);
            }}
          >
            {LanguageKey.En}
          </div>
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
