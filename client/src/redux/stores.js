// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice/authSlice";

// const rootReducer = combineReducers({
//   auth: authSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export default store;
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice/authSlice";
import categorySlice from "./categorySlice/categorySlice";
import postSlice from "./postSlice/postSlice";
import appSlice from "./appSlice/appSlice";
import userSlice from "./userSlice/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["post", "app"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  category: categorySlice,
  post: postSlice,
  app: appSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
export { store, persistor };
