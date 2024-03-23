import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Headphone } from '@type/interfaces/product.interface';

interface BasketState {
  basketList: Headphone[];
  countProductsInBasket: number;
}

const initialState: BasketState = {
  basketList: [],
  countProductsInBasket: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Headphone>) {
      state.basketList.push(action.payload);
      state.countProductsInBasket++; // Увеличиваем общее количество товаров в корзине при добавлении нового товара
    },
    increaseProductQuantity(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.basketList[index].quantity += 1;
      state.countProductsInBasket++; // Увеличиваем общее количество товаров в корзине при увеличении количества товара
    },
  },
});

export const { addProduct, increaseProductQuantity } = basketSlice.actions;

export default basketSlice.reducer;
