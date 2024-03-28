import { Alert, TextField, makeStyles } from '@mui/material';
import style from './Order.module.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from '@utils/Theme.tsx';
import { RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearBasket } from '@redux/productSlice';

export const Order = ({
  setShowAlert,
}: {
  setShowAlert: (value: boolean) => void;
}) => {
  const totalBasketSum = useSelector(
    (state: RootState) => state.basket.totalBasketSum
  );

  const count = useSelector(
    (state: RootState) => state.basket.countProductsInBasket
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });

  const [orderDataError, setOrderDataError] = useState({
    firstName: {
      error: false,
      message: '',
    },
    lastName: {
      error: false,
      message: '',
    },
    address: {
      error: false,
      message: '',
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const lettersRegex = /^[a-zA-Zа-яА-Я]+$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOrderDataError({
      firstName: {
        error: false,
        message: '',
      },
      lastName: {
        error: false,
        message: '',
      },
      address: {
        error: false,
        message: '',
      },
    });

    if (orderData.firstName.trim().length < 3) {
      setOrderDataError((prevState) => ({
        ...prevState,
        firstName: { error: true, message: 'Минимум 3 буквы' },
      }));
      return;
    } else if (!lettersRegex.test(orderData.firstName)) {
      setOrderDataError((prevState) => ({
        ...prevState,
        firstName: { error: true, message: 'Только буквы' },
      }));
      return;
    }
    if (orderData.lastName.trim().length < 3) {
      setOrderDataError((prevState) => ({
        ...prevState,
        lastName: { error: true, message: 'Минимум 3 буквы' },
      }));
      return;
    } else if (!lettersRegex.test(orderData.lastName)) {
      setOrderDataError((prevState) => ({
        ...prevState,
        lastName: { error: true, message: 'Только буквы' },
      }));
      return;
    }

    if (orderData.address.trim().length < 10) {
      setOrderDataError((prevState) => ({
        ...prevState,
        address: { error: true, message: 'Минимум 10 символов' },
      }));
      return;
    }

    setShowAlert(true);
    navigate('/');

    setTimeout(() => {
      setShowAlert(false);
    }, 1300);

    dispatch(clearBasket());
  };

  return (
    <ThemeProvider theme={theme}>
      <section>
        <h2 className={style.title}>Офрмление заказа</h2>

        <form onSubmit={handleSubmit}>
          <div className={style.order}>
            <div className={style.order__wrapper}>
              <div className={style.input__line}>
                <TextField
                  error={orderDataError.firstName.error}
                  name="firstName"
                  id="outlined-basic"
                  label="Имя"
                  variant="outlined"
                  size="small"
                  helperText={
                    orderDataError.firstName.error &&
                    orderDataError.firstName.message
                  }
                  onChange={handleChange}
                />
                <TextField
                  error={orderDataError.lastName.error}
                  name="lastName"
                  id="outlined-basic"
                  label="Фамилия"
                  variant="outlined"
                  size="small"
                  helperText={
                    orderDataError.lastName.error &&
                    orderDataError.lastName.message
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={style.input__line}>
                <TextField
                  error={orderDataError.address.error}
                  name="address"
                  id="outlined-basic"
                  label="Адрес доставки"
                  variant="outlined"
                  size="small"
                  fullWidth
                  helperText={
                    orderDataError.address.error &&
                    orderDataError.address.message
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={style.input__lineInfo}>
                <span className={style.total}>Количество: {count}</span>
                <span className={style.sum}>Сумма: {totalBasketSum} ₽</span>
              </div>
            </div>
            <button
              type="submit"
              className={
                count
                  ? `${style.button__buy}`
                  : `${style.button__buy} ${style.button__disabled}`
              }
            >
              <span>Заказать</span>
            </button>
          </div>
        </form>
      </section>
    </ThemeProvider>
  );
};
