import { useSelector } from 'react-redux';
import increase from '@assets/icons/interface_icons/increase.svg';
import decrease from '@assets/icons/interface_icons/decrease.svg';
import trash from '@assets/icons/interface_icons/trash.svg';

import style from './Basket.module.scss';
import { RootState } from '@redux/store';

export const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket.basketList);
  console.log(basket);
  return (
    <section>
      <h2 className={style.title}>Корзина</h2>
      <div className={style.wrapper__basket}>
        <ul className={style.basket__list}>
          {basket.map((item) => (
            <li className={style.basket__item} key={item.id}>
              <div className={style.wrapper__image}>
                <img
                  src={item.img}
                  alt="headphone image"
                  className={style.headphone__image}
                />
                <div className={style.wrapper__quantity}>
                  <img
                    src={increase}
                    alt="increase"
                    className={style.button__quantity}
                  />
                  <div className={style.quantity}>1</div>
                  <img
                    src={decrease}
                    alt="decrease"
                    className={style.button__quantity}
                  />
                </div>
              </div>
              <ul className={style.description__list}>
                <li className={style.description__item}>
                  {/* <div className={style.description__line}> */}
                  <div className={style.description__title}>{item.title}</div>
                  <div className={style.wrapper__price}>
                    <div className={style.description__price_new}>
                      {item.price} ₽
                    </div>
                    {/* {item.old_price && (
                      <div className={style.description__price_old}>
                        {item.old_price} ₽
                      </div>
                    )} */}
                  </div>

                  {/* </div> */}
                  {/* <div className={style.description__line}>
                    <div className={style.wrapper__rate}>
                      <div className={style.description__rate}>{item.rate}</div>
                    </div>
                    <div className={style.description__button}>Купить</div>
                  </div> */}
                </li>
              </ul>
              <div className={style.wrapper__trash}>
                <img src={trash} alt="trash" className={style.trash} />
                <div className={style.price}> 2 927 ₽</div>
              </div>
            </li>
          ))}
        </ul>
        <div className={style.order}>
          <div className={style.wrapper__total}>
            <div className={style.total}>итого</div>
            <div className={style.sum}>₽ 2 927</div>
          </div>
          <button className={style.button__order}>Перейти к оформлению</button>
        </div>
      </div>
    </section>
  );
};
