import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Basket } from '@components/Basket/Basket';
import { Footer } from '@components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Modal } from '@components/Modal/Modal';
import { useSelector } from 'react-redux';
import { Headphone } from '@type/interfaces/product.interface';
import { useEffect, useState } from 'react';

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
              <Route path="basket" element={<Basket />} />
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
