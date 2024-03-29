import { RootState } from '@redux/store';
import style from './Favorite.module.scss';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';
import { HeadphoneCard } from '@components/HeadphoneCard/HeadphoneCard';

export const Favorite = () => {
  const favorite = useSelector((state: RootState) => state.basket.favoriteList);

  const {
    data: { favorites },
  } = useContext(LanguageContext);

  return (
    <section>
      <h2 className={style.title}>{favorites}</h2>
      <HeadphoneCard headphoneData={Object.values(favorite)} />
    </section>
  );
};
