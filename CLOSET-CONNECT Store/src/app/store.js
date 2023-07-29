// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Enum for PricingOption
export const PricingOption = {
  PAID: 0,
  FREE: 1,
  VIEW_ONLY: 2,
};

const initialState = {
  pricingOptions: [],
  searchKeyword: '',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setPricingOption(state, action) {
      state.pricingOptions = action.payload;
    },
    setSearchKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
  },
});

export const { setPricingOption, setSearchKeyword } = contentSlice.actions;

// Store
export default configureStore({
  reducer: contentSlice.reducer,
});
