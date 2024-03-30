import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  handlerModalStatus,
  setHeadphoneWithAddInfo,
} from '@redux/productSlice';
import { LanguageContext } from '@context/LanguageContext';

import { Header } from '@layouts/Header/Header';
import { Footer } from '@layouts/Footer/Footer';
import { Main } from '@pages/Main/Main';
import { Favorite } from '@pages/Favorite/Favorite';
import { Basket } from '@pages/Basket/Basket';
import { Order } from '@pages/Order/Order';
import { Modal } from '@components/Modal/Modal';

import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import './App.scss';

export const App = () => {
  const {
    data: {
      alert: { successful },
    },
  } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.product.isModalOpen
  );

  // Еффект для закрытия модального окна на ESC.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        dispatch(handlerModalStatus());
        dispatch(setHeadphoneWithAddInfo([]));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="basket" element={<Basket />} />
              <Route
                path="basket/order"
                element={<Order setShowAlert={setShowAlert} />}
              />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
      <Modal />
      {showAlert && (
        <Alert
          icon={<CheckIcon sx={{ fontSize: '3rem' }} />}
          severity="success"
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <span style={{ fontSize: '2rem' }}>{successful}</span>
        </Alert>
      )}
    </>
  );
};
