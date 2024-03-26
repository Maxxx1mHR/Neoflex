import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Headphone } from '@type/interfaces/product.interface';

interface BasketState {
  basketList: { [id: number]: Headphone };
  countProductsInBasket: number;
  totalBasketSum: number;
}

const initialState: BasketState = {
  basketList: {},
  countProductsInBasket: 0,
  totalBasketSum: 0,
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
      // state.basketList.push(action.payload.id action.payload);
      // state.basketList[index].quantity += 1;
      // state.countProductsInBasket++; // Увеличиваем общее количество товаров в корзине при добавлении нового товара

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
      // state.basketList = state.basketList.filter((headphone) => {
      //   return headphone.id !== action.payload.id;
      // });
      // state.countProductsInBasket -= action.payload.quantity;

      delete state.basketList[action.payload.id];
      state.countProductsInBasket -= action.payload.quantity;
      state.totalBasketSum = updateTotalSum(state.basketList);
    },
    increaseProductQuantity(state, action: PayloadAction<Headphone>) {
      // const index = action.payload;
      // state.basketList[index].quantity += 1;
      // state.countProductsInBasket++; // Увеличиваем общее количество товаров в корзине при увеличении количества товара
      // if (state.basketList[action.payload.id].quantity === 1) {
      //   return;
      // }
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

      // const index = action.payload;
      // if (state.basketList[index].quantity === 1) {
      //   return;
      // }
      // state.basketList[index].quantity -= 1;
      // state.countProductsInBasket--;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
} = basketSlice.actions;

export default basketSlice.reducer;
