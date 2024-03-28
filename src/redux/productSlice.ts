import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Headphone } from '@type/interfaces/product.interface';
import headphonesData from '@data/headphones.json';

interface BasketState {
  basketList: { [id: number]: Headphone };
  countProductsInBasket: number;
  totalBasketSum: number;
  products: Headphone[];
  countLike: number;
}

const initialState: BasketState = {
  basketList: {},
  countProductsInBasket: 0,
  totalBasketSum: 0,
  products: headphonesData,
  countLike: 0,
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
      } else {
        state.basketList[action.payload.id] = action.payload;
      }
      state.countProductsInBasket += 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
    },
    removeProduct(state, action: PayloadAction<Headphone>) {
      delete state.basketList[action.payload.id];
      state.countProductsInBasket -= action.payload.quantity;
      state.totalBasketSum = updateTotalSum(state.basketList);
    },
    increaseProductQuantity(state, action: PayloadAction<Headphone>) {
      state.basketList[action.payload.id].quantity += 1;
      state.countProductsInBasket += 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
    },
    decreaseProductQuantity(state, action: PayloadAction<Headphone>) {
      if (state.basketList[action.payload.id].quantity === 1) {
        return;
      }
      state.basketList[action.payload.id].quantity -= 1;
      state.countProductsInBasket -= 1;
      state.totalBasketSum = updateTotalSum(state.basketList);
    },
    toggleLikeStatus(state, action: PayloadAction<Headphone>) {
      let countLike = 0;
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.liked = !product.liked;
        }
        if (product.liked) {
          countLike += 1;
        }
      });
      state.countLike = countLike;
    },
    clearBasket(state) {
      state.basketList = [];
      state.countProductsInBasket = 0;
      state.totalBasketSum = 0;
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
} = basketSlice.actions;

export default basketSlice.reducer;
