import { useDispatch } from 'react-redux';
import style from './Modal.module.scss';
import styles from '../Main/Main.module.scss';
import { Headphone } from '@type/interfaces/product.interface';
import { addProduct } from '@redux/productSlice';
import star from '@assets/icons/interface_icons/star.svg';

export const Modal = ({
  headphoneWithAddInfo,
  // setActiveModal,
  openModal,
  activeModal,
}: {
  headphoneWithAddInfo: Headphone[];
  // setActiveModal: (active: boolean) => void;
  openModal: () => void;

  activeModal: boolean;
}) => {
  const dispatch = useDispatch();

  const addProductToBasket = (headphone: Headphone) => {
    dispatch(addProduct(headphone));
  };

  const classOverlay = activeModal
    ? `${style.modal__wrapper} ${style.active}`
    : `${style.modal__wrapper}`;

  return (
    <div className={classOverlay}>
      <div className={style.overlay} onClick={openModal}></div>
      {/* <div
        className={
          activeModal ? `${style.modal} ${style.active}` : `${style.modal}`
        }
      > */}
      <div className={style.modal}>
        <div className={style.modal__content}>
          <ul className={styles.headphones__list}>
            {headphoneWithAddInfo.map((item) => (
              <li className={styles.headphones__item} key={item.id}>
                <div className={styles.wrapper__image}>
                  <img
                    src={item.img}
                    alt="headphone image"
                    className={styles.headphone__image}
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
                      <div className={styles.description__additionalInfo}>
                        {item.description}
                      </div>
                    </div>
                    <div className={styles.description__line}>
                      <div className={styles.wrapper__rate}>
                        <img src={star} alt="star" />
                        <div className={styles.description__rate}>
                          {item.rate}
                        </div>
                      </div>
                      <div
                        className={styles.description__button}
                        onClick={() => addProductToBasket(item)}
                      >
                        Купить
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>

    // <div
    //   className={
    //     activeModal ? `${style.modal} ${style.active}` : `${style.modal}`
    //   }
    // >
    //   <div className={style.modal}>
    //     <div className={style.modal__content}>
    //       <ul className={style.headphones__list}>
    //         {headphoneWithAddInfo.map((item) => (
    //           <li className={style.headphones__item} key={item.id}>
    //             <div className={style.wrapper__image}>
    //               <img
    //                 src={item.img}
    //                 alt="headphone image"
    //                 className={style.headphone__image}
    //               />
    //             </div>
    //             <ul className={style.description__list}>
    //               <li className={style.description__item}>
    //                 <div className={style.description__line}>
    //                   <div className={style.description__title}>
    //                     {item.title}
    //                   </div>
    //                   <div className={style.wrapper__price}>
    //                     <div className={style.description__price_new}>
    //                       {item.price} ₽
    //                     </div>
    //                     {item.old_price && (
    //                       <div className={style.description__price_old}>
    //                         {item.old_price} ₽
    //                       </div>
    //                     )}
    //                   </div>
    //                 </div>
    //                 <div className={style.description__line}>
    //                   <div className={style.wrapper__rate}>
    //                     <img src={star} alt="star" />
    //                     <div className={style.description__rate}>
    //                       {item.rate}
    //                     </div>
    //                   </div>
    //                   <div
    //                     className={style.description__button}
    //                     onClick={() => addProductToBasket(item)}
    //                   >
    //                     Купить
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};
