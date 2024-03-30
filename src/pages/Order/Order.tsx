import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { clearBasket } from '@redux/productSlice';
import { LanguageContext } from '@context/LanguageContext';

import { theme } from '@utils/Theme.tsx';

import { TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material';

import style from './Order.module.scss';

export const Order = ({
  setShowAlert,
}: {
  setShowAlert: (value: boolean) => void;
}) => {
  const totalBasketSum = useSelector(
    (state: RootState) => state.product.totalBasketSum
  );

  const {
    data: {
      makingAnOrder,
      form: { firstName, lastName, address, quantity, sum, order },
      errors: { length, onlyLetters, characters },
    },
  } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const count = useSelector(
    (state: RootState) => state.product.countProductsInBasket
  );

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

  // Обработчик события изменения ввода
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Имя(название) поля inputa и введеные значение
    const { name, value } = event.target;

    // Обновление состояния новым введеным значением
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const lettersRegex = /^[a-zA-Zа-яА-Я]+$/;

  // Обработка формы отправки заказа
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Убнуляем ошибки ввода при отправки формы
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

    // Проверяем inputs на ошибки ввода. Обновляем состояние ошибки и сообщение ошибки
    if (orderData.firstName.trim().length < 3) {
      setOrderDataError((prevState) => ({
        ...prevState,
        firstName: { error: true, message: length },
      }));
      return;
    } else if (!lettersRegex.test(orderData.firstName)) {
      setOrderDataError((prevState) => ({
        ...prevState,
        firstName: { error: true, message: onlyLetters },
      }));
      return;
    }
    if (orderData.lastName.trim().length < 3) {
      setOrderDataError((prevState) => ({
        ...prevState,
        lastName: { error: true, message: length },
      }));
      return;
    } else if (!lettersRegex.test(orderData.lastName)) {
      setOrderDataError((prevState) => ({
        ...prevState,
        lastName: { error: true, message: onlyLetters },
      }));
      return;
    }

    if (orderData.address.trim().length < 10) {
      setOrderDataError((prevState) => ({
        ...prevState,
        address: { error: true, message: characters },
      }));
      return;
    }

    // Если ошибок нет, показываем alert об успешном заказе
    setShowAlert(true);
    navigate('/');

    setTimeout(() => {
      setShowAlert(false);
    }, 1300);

    // Удаляем сохраненные товары из корзины (store) и localStorage
    dispatch(clearBasket());
  };

  return (
    <ThemeProvider theme={theme}>
      <section>
        <h2 className={style.title}>{makingAnOrder}</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.order}>
            <div className={style.order__wrapper}>
              <div className={style.input__line}>
                <TextField
                  error={orderDataError.firstName.error}
                  name="firstName"
                  id="outlined-basic"
                  label={firstName}
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
                  label={lastName}
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
                  label={address}
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
                <span className={style.total}>
                  {quantity}: {count}
                </span>
                <span className={style.sum}>
                  {sum}: {totalBasketSum} ₽
                </span>
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
              <span>{order}</span>
            </button>
          </div>
        </form>
      </section>
    </ThemeProvider>
  );
};
