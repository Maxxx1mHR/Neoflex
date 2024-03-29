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

const updateTotalSum = (basketList: { [id: number]: Headphone }) => {
  return Object.values(basketList).reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Headphone>) {
      const { id } = action.payload;
      if (state.basketList[id]) {
        state.basketList[action.payload.id].quantity += 1;
        localStorage.setItem('basketList', JSON.stringify(state.basketList));
      } else {
        state.basketList[action.payload.id] = action.payload;
        localStorage.setItem('basketList', JSON.stringify(state.basketList));
      }
      state.countProductsInBasket += 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
      localStorage.setItem('basketList', JSON.stringify(state.basketList));

      localStorage.setItem(
        'countProductsInBasket',
        String(state.countProductsInBasket)
      );
      localStorage.setItem('totalBasketSum', String(state.totalBasketSum));
    },
    removeProduct(state, action: PayloadAction<Headphone>) {
      delete state.basketList[action.payload.id];
      state.countProductsInBasket -= action.payload.quantity;
      state.totalBasketSum = updateTotalSum(state.basketList);
      localStorage.setItem('basketList', JSON.stringify(state.basketList));

      localStorage.setItem(
        'countProductsInBasket',
        String(state.countProductsInBasket)
      );
      localStorage.setItem('totalBasketSum', String(state.totalBasketSum));
    },
    increaseProductQuantity(state, action: PayloadAction<Headphone>) {
      state.basketList[action.payload.id].quantity += 1;
      state.countProductsInBasket += 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
      localStorage.setItem('basketList', JSON.stringify(state.basketList));

      localStorage.setItem(
        'countProductsInBasket',
        String(state.countProductsInBasket)
      );
      localStorage.setItem('totalBasketSum', String(state.totalBasketSum));
    },
    decreaseProductQuantity(state, action: PayloadAction<Headphone>) {
      if (state.basketList[action.payload.id].quantity === 1) {
        return;
      }
      state.basketList[action.payload.id].quantity -= 1;
      state.countProductsInBasket -= 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
      localStorage.setItem('basketList', JSON.stringify(state.basketList));

      localStorage.setItem(
        'countProductsInBasket',
        String(state.countProductsInBasket)
      );
      localStorage.setItem('totalBasketSum', String(state.totalBasketSum));
    },
    toggleLikeStatus(state, action: PayloadAction<Headphone>) {
      let countLike = 0;
      const { id } = action.payload;
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.liked = !product.liked;
          if (state.favoriteList[id]) {
            delete state.favoriteList[id];
            localStorage.setItem(
              'favoriteList',
              JSON.stringify(state.favoriteList)
            );
          } else {
            state.favoriteList[id] = product;
            localStorage.setItem(
              'favoriteList',
              JSON.stringify(state.favoriteList)
            );
          }
        }
        if (product.liked) {
          countLike += 1;
        }
      });
      state.countLike = countLike;
      localStorage.setItem('countLike', String(state.countLike));
    },
    clearBasket(state) {
      state.basketList = [];
      state.countProductsInBasket = 0;
      state.totalBasketSum = 0;
      localStorage.setItem('basketList', JSON.stringify(state.basketList));
      localStorage.removeItem('countProductsInBasket');
      localStorage.setItem('totalBasketSum', String(state.totalBasketSum));
    },
    handlerModalStatus(state) {
      state.isModalOpen = !state.isModalOpen;
    },
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
