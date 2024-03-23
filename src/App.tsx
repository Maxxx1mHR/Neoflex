import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Footer } from '@components/Footer/Footer';
import './App.scss';

export const App = () => {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
