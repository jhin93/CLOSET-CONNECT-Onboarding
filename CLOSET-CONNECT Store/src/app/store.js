// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

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

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contentSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const { setPricingOption, setSearchKeyword } = contentSlice.actions;

export default store;
