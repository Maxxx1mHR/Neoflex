import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  handlerModalStatus,
  setHeadphoneWithAddInfo,
} from '@redux/productSlice';

import { HeadphoneCard } from '@components/HeadphoneCard/HeadphoneCard';

import style from './Modal.module.scss';

export const Modal = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: RootState) => state.product.isModalOpen
  );

  const headphoneWithAddInfo = useSelector(
    (state: RootState) => state.product.headphoneWithAddInfo
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
