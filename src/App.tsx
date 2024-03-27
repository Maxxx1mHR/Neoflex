import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Favorite } from '@components/Favorite/Favorite';
import { Basket } from '@components/Basket/Basket';
import { Footer } from '@components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Modal } from '@components/Modal/Modal';
import { useSelector } from 'react-redux';
import { Headphone } from '@type/interfaces/product.interface';
import { useEffect, useState } from 'react';
import { Order } from '@components/Order/Order';

export const App = () => {
  const [headphoneWithAddInfo, setHeadphoneWithAddInfo] = useState<Headphone[]>(
    []
  );

  const [activeModal, setActiveModal] = useState(false);

  // console.log(headphoneWithAddInfo);

  const openModal = () => {
    setActiveModal((prev) => !prev);
    document.body.classList.toggle('no-scroll');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeModal) {
        // setActiveModal(false);
        openModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  return (
    <>
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
                    // setActiveModal={setActiveModal}
                    openModal={openModal}
                  />
                }
              />
              <Route path="favorite" element={<Favorite />} />
              <Route path="basket" element={<Basket />} />
              <Route path="basket/order" element={<Order />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
      <Modal
        headphoneWithAddInfo={headphoneWithAddInfo}
        openModal={openModal}
        // setActiveModal={setActiveModal}
        activeModal={activeModal}
      />
    </>
  );
};
