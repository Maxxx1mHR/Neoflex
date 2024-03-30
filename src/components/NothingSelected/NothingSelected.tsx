import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';

import cat from '@assets/images/sad_cat.png';

import style from './NothingSelected.module.scss';

export const NothingSelected = () => {
  const {
    data: { nothingSelected },
  } = useContext(LanguageContext);

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{nothingSelected}</h2>
      <img src={cat} alt="sad cat" className={style.image} />
    </div>
  );
};
