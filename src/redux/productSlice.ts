import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Headphone } from '@type/interfaces/product.interface';
import headphonesData from '@data/headphones.json';

interface BasketState {
  basketList: { [id: number]: Headphone };
  favoriteList: { [id: number]: Headphone };
  countProductsInBasket: number;
  totalBasketSum: number;
  products: Headphone[];
  countLike: number;
  isModalOpen: boolean;
  headphoneWithAddInfo: Headphone[];
}

const basketList = JSON.parse(localStorage.getItem('basketList') || '{}');
const favoriteList = JSON.parse(localStorage.getItem('favoriteList') || '{}');
const countLike = Number(localStorage.getItem('countLike')) || 0;
const countProductsInBasket =
  Number(localStorage.getItem('countProductsInBasket')) || 0;
const totalBasketSum = Number(localStorage.getItem('totalBasketSum')) || 0;

// Если в localStorage, есть избранные продукты, отрисовываем их основном списке продуктов избранные (лайки/сердечки)
let updateHeadphonesFromLocalStorage: Headphone[] = [];
if (favoriteList) {
  updateHeadphonesFromLocalStorage = headphonesData.map((item) => ({
    ...item,
    liked: favoriteList[item.id] ? true : false,
  }));
}
const initialState: BasketState = {
  basketList: basketList,
  favoriteList: favoriteList,
  countProductsInBasket: countProductsInBasket,
  totalBasketSum: totalBasketSum,
  products: favoriteList ? updateHeadphonesFromLocalStorage : headphonesData,
  countLike: countLike,
  isModalOpen: false,
  headphoneWithAddInfo: [],
};

// Итоговая сумма всех товаров в корзине
const updateTotalSum = (basketList: { [id: number]: Headphone }) => {
  return Object.values(basketList).reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

// Обновление значений в localStorage
const updateLocalStorage = (state: BasketState) => {
  localStorage.setItem('basketList', JSON.stringify(state.basketList));
  localStorage.setItem(
    'countProductsInBasket',
    String(state.countProductsInBasket)
  );
  localStorage.setItem('totalBasketSum', String(state.totalBasketSum));
  localStorage.setItem('favoriteList', JSON.stringify(state.favoriteList));
  localStorage.setItem('countLike', String(state.countLike));
};

const basketSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Добавление продуктов в корзину. Если уже есть, увеличиваем количество
    addProduct(state, action: PayloadAction<Headphone>) {
      const { id } = action.payload;
      if (state.basketList[id]) {
        state.basketList[id].quantity += 1;
      } else {
        state.basketList[id] = action.payload;
      }
      state.countProductsInBasket += 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
      updateLocalStorage(state);
    },

    // Удаление пробуктов из корзины
    removeProduct(state, action: PayloadAction<Headphone>) {
      const { id } = action.payload;
      delete state.basketList[id];
      state.countProductsInBasket -= action.payload.quantity;
      state.totalBasketSum = updateTotalSum(state.basketList);
      updateLocalStorage(state);
    },

    // Увеличить количество пробуктов в корзине
    increaseProductQuantity(state, action: PayloadAction<Headphone>) {
      const { id } = action.payload;
      state.basketList[id].quantity += 1;
      state.countProductsInBasket += 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
      updateLocalStorage(state);
    },

    // Уменьшаем количество пробуктов в корзине
    decreaseProductQuantity(state, action: PayloadAction<Headphone>) {
      const { id } = action.payload;

      if (state.basketList[id].quantity === 1) {
        return;
      }
      state.basketList[id].quantity -= 1;
      state.countProductsInBasket -= 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
      updateLocalStorage(state);
    },

    // Добавить товар в избранное, удалить товар из избранного
    toggleLikeStatus(state, action: PayloadAction<Headphone>) {
      let countLike = 0;
      const { id } = action.payload;
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.liked = !product.liked;
          if (state.favoriteList[id]) {
            delete state.favoriteList[id];
          } else {
            state.favoriteList[id] = product;
          }
        }
        if (product.liked) {
          countLike += 1;
        }
      });
      if (state.headphoneWithAddInfo.length === 1) {
        state.headphoneWithAddInfo[0].liked =
          !state.headphoneWithAddInfo[0].liked;
      }
      state.countLike = countLike;
      updateLocalStorage(state);
    },

    // Удалить сохраненные продукты, после оформления заказа
    clearBasket(state) {
      state.basketList = {};
      state.countProductsInBasket = 0;
      state.totalBasketSum = 0;
      updateLocalStorage(state);
    },

    // Открытие/закрытие модального окна
    handlerModalStatus(state) {
      state.isModalOpen = !state.isModalOpen;
    },

    // Добавить товар для вывода в модальном окне, с подробной информацией
    setHeadphoneWithAddInfo(state, action: PayloadAction<Headphone[]>) {
      state.headphoneWithAddInfo = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  toggleLikeStatus,
  clearBasket,
  handlerModalStatus,
  setHeadphoneWithAddInfo,
} = basketSlice.actions;

export default basketSlice.reducer;
