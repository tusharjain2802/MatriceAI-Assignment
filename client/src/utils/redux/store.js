import { configureStore, combineReducers } from '@reduxjs/toolkit'; // combineReducers from redux-toolkit
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'admin'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
