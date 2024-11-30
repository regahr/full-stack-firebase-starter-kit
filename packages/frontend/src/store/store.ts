import { configureStore, Reducer } from '@reduxjs/toolkit';
import userReducer, { UserState } from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: persistedReducer as unknown as Reducer<UserState>
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
