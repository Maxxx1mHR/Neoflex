import { useDispatch, useSelector } from 'react-redux';
import style from './Modal.module.scss';
import {
  handlerModalStatus,
  setHeadphoneWithAddInfo,
} from '@redux/productSlice';
import { RootState } from '@redux/store';
import { HeadphoneCard } from '@components/HeadphoneCard/HeadphoneCard';

export const Modal = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: RootState) => state.basket.isModalOpen
  );

  const headphoneWithAddInfo = useSelector(
    (state: RootState) => state.basket.headphoneWithAddInfo
  );

  const classOverlay = isModalOpen
    ? `${style.modal__wrapper} ${style.active}`
    : `${style.modal__wrapper}`;

  return (
    <div className={classOverlay}>
      <div
        className={style.overlay}
        onClick={() => {
          dispatch(handlerModalStatus());
          dispatch(setHeadphoneWithAddInfo([]));
        }}
      ></div>

      <div className={style.modal}>
        <div className={style.modal__content}>
          <HeadphoneCard headphoneData={headphoneWithAddInfo} />
        </div>
      </div>
    </div>
  );
};
