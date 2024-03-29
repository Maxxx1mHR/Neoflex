import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { LanguageContext } from '@context/LanguageContext';

import { HeadphoneCard } from '@components/HeadphoneCard/HeadphoneCard';

import style from './Favorite.module.scss';

export const Favorite = () => {
  const {
    data: { favorites },
  } = useContext(LanguageContext);

  const favorite = useSelector(
    (state: RootState) => state.product.favoriteList
  );

  return (
    <section>
      <h2 className={style.title}>{favorites}</h2>
      <HeadphoneCard headphoneData={Object.values(favorite)} />
    </section>
  );
};
