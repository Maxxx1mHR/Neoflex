import { useDispatch, useSelector } from 'react-redux';
import { addProduct, toggleLikeStatus } from '@redux/productSlice';
import { Headphone } from '@type/interfaces/product.interface';
import star from '@assets/icons/interface_icons/star.svg';
import like from '@assets/icons/interface_icons/favorite_like.svg';
import dislike from '@assets/icons/interface_icons/favorite_dislike.svg';

import style from './Main.module.scss';
import { RootState } from '@redux/store';
import { useContext } from 'react';
import { LanguageContext } from '@context/LanguageContext';

export const Main = ({
  setHeadphoneWithAddInfo,
  openModal,
}: {
  setHeadphoneWithAddInfo: (headphone: Headphone[]) => void;
  openModal: () => void;
}) => {
  let products = useSelector((state: RootState) => state.basket.products);

  const wiredHeadphonesData = products.slice(0, 6);
  const wirelessHeadphonesData = products.slice(6);

  const dispatch = useDispatch();

  const addProductToBasket = (headphone: Headphone) => {
    dispatch(addProduct(headphone));
  };

  const {
    data: { headphones, wirelessHeadphones, buy },
  } = useContext(LanguageContext);

  return (
    <>
      <section className={style.headphones__wired}>
        <h2 className={style.title}>{headphones}</h2>
        <ul className={style.headphones__list}>
          {wiredHeadphonesData.map((item) => (
            <li className={style.headphones__item} key={item.id}>
              <div className={style.wrapper__image}>
                <img
                  src={item.img}
                  alt="headphone image"
                  className={style.headphone__image}
                  onClick={() => {
                    setHeadphoneWithAddInfo([item]);
                    openModal();
                  }}
                />
              </div>
              <ul className={style.description__list}>
                <li className={style.description__item}>
                  <div className={style.description__line}>
                    <div className={style.description__title}>{item.title}</div>
                    <div className={style.wrapper__price}>
                      <div className={style.description__price_new}>
                        {item.price} ₽
                      </div>
                      {item.old_price && (
                        <div className={style.description__price_old}>
                          {item.old_price} ₽
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.description__line}>
                    <div className={style.wrapper__rate}>
                      <img src={star} alt="star" />
                      <div className={style.description__rate}>{item.rate}</div>
                    </div>
                    <div className={style.wrapper__button}>
                      <img
                        src={item.liked ? like : dislike}
                        alt="favorite"
                        className={style.like}
                        onClick={() => {
                          dispatch(toggleLikeStatus(item));
                        }}
                      />
                      <div
                        className={style.description__button}
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
      <section className={style.headphones__wireless}>
        <h2 className={style.title}>{wirelessHeadphones}</h2>
        <ul className={style.headphones__list}>
          {wirelessHeadphonesData.map((item) => (
            <li className={style.headphones__item} key={item.id}>
              <div className={style.wrapper__image}>
                <img
                  src={item.img}
                  alt="headphone image"
                  className={style.headphone__image}
                  onClick={() => {
                    setHeadphoneWithAddInfo([item]);
                    openModal();
                  }}
                />
              </div>
              <ul className={style.description__list}>
                <li className={style.description__item}>
                  <div className={style.description__line}>
                    <div className={style.description__title}>{item.title}</div>
                    <div className={style.wrapper__price}>
                      <div className={style.description__price_new}>
                        {item.price} ₽
                      </div>
                      {item.old_price && (
                        <div className={style.description__price_old}>
                          {item.old_price} ₽
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.description__line}>
                    <div className={style.wrapper__rate}>
                      <img src={star} alt="star" />
                      <div className={style.description__rate}>{item.rate}</div>
                    </div>
                    <div className={style.wrapper__button}>
                      <img
                        src={item.liked ? like : dislike}
                        alt="favorite"
                        className={style.like}
                        onClick={() => {
                          dispatch(toggleLikeStatus(item));
                        }}
                      />
                      <div
                        className={style.description__button}
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
    </>
  );
};
