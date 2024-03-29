import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { LanguageContext } from '@context/LanguageContext';

import { HeadphoneCard } from '@components/HeadphoneCard/HeadphoneCard';

import style from './Main.module.scss';

export const Main = () => {
  const {
    data: { headphones, wirelessHeadphones },
  } = useContext(LanguageContext);

  const products = useSelector((state: RootState) => state.product.products);
  const wiredHeadphonesData = products.slice(0, 6);
  const wirelessHeadphonesData = products.slice(6);

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
