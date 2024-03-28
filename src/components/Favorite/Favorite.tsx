import { RootState } from '@redux/store';
import style from './Favorite.module.scss';
import styles from '../Main/Main.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import star from '@assets/icons/interface_icons/star.svg';
import like from '@assets/icons/interface_icons/favorite_like.svg';
import dislike from '@assets/icons/interface_icons/favorite_dislike.svg';
import { addProduct, toggleLikeStatus } from '@redux/productSlice';
import { Headphone } from '@type/interfaces/product.interface';

export const Favorite = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const dispatch = useDispatch();

  const addProductToBasket = (headphone: Headphone) => {
    dispatch(addProduct(headphone));
  };

  return (
    <section>
      <h2 className={style.title}>Избранное</h2>
      <ul className={styles.headphones__list}>
        {products.map(
          (item) =>
            item.liked && (
              <li className={styles.headphones__item} key={item.id}>
                <div className={styles.wrapper__image}>
                  <img
                    src={item.img}
                    alt="headphone image"
                    className={styles.headphone__image}
                    onClick={() => {
                      // setHeadphoneWithAddInfo([item]);
                      // setActiveModal(true);
                      // openModal();
                    }}
                  />
                </div>
                <ul className={styles.description__list}>
                  <li className={styles.description__item}>
                    <div className={styles.description__line}>
                      <div className={styles.description__title}>
                        {item.title}
                      </div>
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
                        <div className={styles.description__rate}>
                          {item.rate}
                        </div>
                      </div>
                      <div className={styles.wrapper__button}>
                        <img
                          src={item.liked ? like : dislike}
                          alt="favorite"
                          className={styles.like}
                          // onClick={() => setIsLike((prev) => !prev)}
                          onClick={() => {
                            dispatch(toggleLikeStatus(item));
                            // console.log(item);
                          }}
                        />
                        <div
                          className={styles.description__button}
                          onClick={() => addProductToBasket(item)}
                        >
                          Купить
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            )
        )}
      </ul>
    </section>
  );
};
