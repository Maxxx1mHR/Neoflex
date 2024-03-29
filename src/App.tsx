import { Header } from '@layouts/Header/Header';
import { Main } from '@pages/Main/Main';
import { Favorite } from '@pages/Favorite/Favorite';
import { Basket } from '@pages/Basket/Basket';
import { Footer } from '@layouts/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Modal } from '@components/Modal/Modal';
import { useContext, useEffect, useState } from 'react';
import { Order } from '@pages/Order/Order';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { LanguageContext } from '@context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  handlerModalStatus,
  setHeadphoneWithAddInfo,
} from '@redux/productSlice';

export const App = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.basket.isModalOpen
  );
  const dispatch = useDispatch();

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

  const {
    data: {
      alert: { successful },
    },
  } = useContext(LanguageContext);

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
