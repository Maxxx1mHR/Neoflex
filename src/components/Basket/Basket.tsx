import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProduct,
} from '@redux/basketSlice';
import { Headphone } from '@type/interfaces/product.interface';
import increase from '@assets/icons/interface_icons/increase.svg';
import decrease from '@assets/icons/interface_icons/decrease.svg';
import trash from '@assets/icons/interface_icons/trash.svg';
import style from './Basket.module.scss';
import { Link } from 'react-router-dom';

export const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket.basketList);

  const dispatch = useDispatch();

  const increaseCountProduct = (headphone: Headphone) => {
    dispatch(increaseProductQuantity(headphone));
  };

  const decreaseCountProduct = (headphone: Headphone) => {
    dispatch(decreaseProductQuantity(headphone));
  };

  const removeProductFromBasket = (headphone: Headphone) => {
    dispatch(removeProduct(headphone));
  };

  const totalBasketSum = useSelector(
    (state: RootState) => state.basket.totalBasketSum
  );

  return (
    <section>
      <h2 className={style.title}>Корзина</h2>
      <div className={style.wrapper__basket}>
        <ul className={style.basket__list}>
          {Object.values(basket).map((item) => (
            <li className={style.basket__item} key={item.id}>
              <div className={style.wrapper__image}>
                <img
                  src={item.img}
                  alt="headphone image"
                  className={style.headphone__image}
                />
                <div className={style.wrapper__quantity}>
                  <img
                    src={decrease}
                    alt="decrease"
                    className={style.button__quantity}
                    onClick={() => decreaseCountProduct(item)}
                  />
                  <div className={style.quantity}>{item.quantity}</div>
                  <img
                    src={increase}
                    alt="increase"
                    className={style.button__quantity}
                    onClick={() => increaseCountProduct(item)}
                  />
                </div>
              </div>
              <ul className={style.description__list}>
                <li className={style.description__item}>
                  <div className={style.wrapper__description}>
                    <div className={style.description__title}>{item.title}</div>
                    <div className={style.wrapper__price}>
                      <div className={style.description__price_new}>
                        {item.price} ₽
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <img
                src={trash}
                alt="trash"
                className={style.trash}
                onClick={() => removeProductFromBasket(item)}
              />
              <div className={style.price}>{item.price * item.quantity} ₽</div>
            </li>
          ))}
        </ul>
        <div className={style.order}>
          <div className={style.wrapper__total}>
            <div className={style.total}>итого</div>
            <div className={style.sum}>₽ {totalBasketSum}</div>
          </div>
          <Link to="order">
            <button className={style.button__order}>
              <span>Перейти к оформлению</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
