import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  addProduct,
  handlerModalStatus,
  setHeadphoneWithAddInfo,
  toggleLikeStatus,
} from '@redux/productSlice';
import { LanguageContext } from '@context/LanguageContext';

import { Headphone } from '@type/interfaces/product.interface';

import star from '@assets/icons/interface_icons/star.svg';
import like from '@assets/icons/interface_icons/favorite_like.svg';
import dislike from '@assets/icons/interface_icons/favorite_dislike.svg';

import style from './HeadphoneCard.module.scss';

export const HeadphoneCard = ({
  headphoneData,
}: {
  headphoneData: Headphone[];
}) => {
  const {
    data: { buy, headphoneDescription },
  } = useContext(LanguageContext);

  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: RootState) => state.product.isModalOpen
  );

  return (
    <ul className={style.headphones__list}>
      {headphoneData.map((item) => (
        <li className={style.headphones__item} key={item.id}>
          <div className={style.wrapper__image}>
            <img
              src={item.img}
              alt="headphone image"
              className={style.headphone__image}
              onClick={() => {
                dispatch(setHeadphoneWithAddInfo([item]));
                dispatch(handlerModalStatus());
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
              {isModalOpen && headphoneData.length === 1 && (
                <div className={style.description__line}>
                  <div className={style.description__additionalInfo}>
                    {headphoneDescription[item.id].description}
                  </div>
                </div>
              )}

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
                    onClick={() => {
                      dispatch(addProduct(item));
                    }}
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
  );
};
