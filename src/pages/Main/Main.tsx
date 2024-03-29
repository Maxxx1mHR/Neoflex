import { useSelector } from 'react-redux';

import style from './Main.module.scss';
import { RootState } from '@redux/store';
import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';
import { HeadphoneCard } from '@components/HeadphoneCard/HeadphoneCard';

export const Main = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const wiredHeadphonesData = products.slice(0, 6);
  const wirelessHeadphonesData = products.slice(6);

  const {
    data: { headphones, wirelessHeadphones },
  } = useContext(LanguageContext);

  return (
    <>
      <section className={style.headphones__wired}>
        <h2 className={style.title}>{headphones}</h2>
        <HeadphoneCard headphoneData={wiredHeadphonesData} />
      </section>
      <section className={style.headphones__wireless}>
        <h2 className={style.title}>{wirelessHeadphones}</h2>
        <HeadphoneCard headphoneData={wirelessHeadphonesData} />
      </section>
    </>
  );
};
