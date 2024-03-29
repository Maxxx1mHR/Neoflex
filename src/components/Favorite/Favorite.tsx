import { RootState } from '@redux/store';
import style from './Favorite.module.scss';
import styles from '../Main/Main.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import star from '@assets/icons/interface_icons/star.svg';
import like from '@assets/icons/interface_icons/favorite_like.svg';
import dislike from '@assets/icons/interface_icons/favorite_dislike.svg';
import { addProduct, toggleLikeStatus } from '@redux/productSlice';
import { Headphone } from '@type/interfaces/product.interface';
import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';

export const Favorite = () => {
  const dispatch = useDispatch();

  const addProductToBasket = (headphone: Headphone) => {
    dispatch(addProduct(headphone));
  };

  const favorite = useSelector((state: RootState) => state.basket.favoriteList);

  const {
    data: { favorites, buy },
  } = useContext(LanguageContext);

  return (
    <section>
      <h2 className={style.title}>{favorites}</h2>
      <ul className={styles.headphones__list}>
        {Object.values(favorite).map((item) => (
          <li className={styles.headphones__item} key={item.id}>
            <div className={styles.wrapper__image}>
              <img
                src={item.img}
                alt="headphone image"
                className={styles.headphone__image}
                onClick={() => {}}
              />
            </div>
            <ul className={styles.description__list}>
              <li className={styles.description__item}>
                <div className={styles.description__line}>
                  <div className={styles.description__title}>{item.title}</div>
                  <div className={styles.wrapper__price}>
                    <div className={styles.description__price_new}>
                      {item.price} ₽
                    </div>
                    {item.old_price && (
                      <div className={styles.description__price_old}>
                        {item.old_price} ₽
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.description__line}>
                  <div className={styles.wrapper__rate}>
                    <img src={star} alt="star" />
                    <div className={styles.description__rate}>{item.rate}</div>
                  </div>
                  <div className={styles.wrapper__button}>
                    <img
                      src={item.liked ? like : dislike}
                      alt="favorite"
                      className={styles.like}
                      onClick={() => {
                        dispatch(toggleLikeStatus(item));
                      }}
                    />
                    <div
                      className={styles.description__button}
                      onClick={() => addProductToBasket(item)}
                    >
                      {buy}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
