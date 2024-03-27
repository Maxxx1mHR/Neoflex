import { TextField, makeStyles } from '@mui/material';
import style from './Order.module.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from '@utils/Theme.tsx';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

export const Order = () => {
  const totalBasketSum = useSelector(
    (state: RootState) => state.basket.totalBasketSum
  );

  const count = useSelector(
    (state: RootState) => state.basket.countProductsInBasket
  );

  return (
    <ThemeProvider theme={theme}>
      <section>
        <h2 className={style.title}>Офрмление заказа</h2>
        <div className={style.order}>
          <div className={style.order__wrapper}>
            <div className={style.input__line}>
              <TextField
                id="outlined-basic"
                label="Имя"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Фамилия"
                variant="outlined"
                size="small"
              />
            </div>
            <div className={style.input__line}>
              <TextField
                id="outlined-basic"
                label="Адрес доставки"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className={style.input__lineInfo}>
              <span className={style.total}>Количество: {count}</span>
              <span className={style.sum}>Сумма: {totalBasketSum} ₽</span>
            </div>
          </div>
          <button className={style.button__buy}>
            <span>Заказать</span>
          </button>
        </div>
      </section>
    </ThemeProvider>
  );
};
