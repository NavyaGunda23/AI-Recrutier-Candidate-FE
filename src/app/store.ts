import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/app/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // 👈 sessionStorage adapter

// Configure persist
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth'], // ✅ only persist auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  // other slices...
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});


export const persistor = persistStore(store);


// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;