import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Footer } from '@components/Footer/Footer';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Basket } from '@components/Basket/Basket';

export const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="basket" element={<Basket />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
