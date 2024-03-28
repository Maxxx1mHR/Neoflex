import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Favorite } from '@components/Favorite/Favorite';
import { Basket } from '@components/Basket/Basket';
import { Footer } from '@components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Modal } from '@components/Modal/Modal';
import { Headphone } from '@type/interfaces/product.interface';
import { useEffect, useState } from 'react';
import { Order } from '@components/Order/Order';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';

export const App = () => {
  const [headphoneWithAddInfo, setHeadphoneWithAddInfo] = useState<Headphone[]>(
    []
  );

  const [activeModal, setActiveModal] = useState(false);

  const openModal = () => {
    setActiveModal((prev) => !prev);
    document.body.classList.toggle('no-scroll');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeModal) {
        openModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const [showAlert, setShowAlert] = useState(false);

  return (
    <ErrorBoundary>
      <div className="container">
        <BrowserRouter>
          <Header />
          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    setHeadphoneWithAddInfo={setHeadphoneWithAddInfo}
                    openModal={openModal}
                  />
                }
              />
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
      <Modal
        headphoneWithAddInfo={headphoneWithAddInfo}
        openModal={openModal}
        activeModal={activeModal}
      />
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
          <span style={{ fontSize: '2rem' }}>Ваш заказ успешно оформлен!</span>
        </Alert>
      )}
    </ErrorBoundary>
  );
};
