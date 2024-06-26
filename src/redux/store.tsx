import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import getAllCharReducer from "./slice/get-all-char-slice";
import getAllLocationsReducer from "./slice/get-all-locations-slice";

const store = configureStore({
  reducer: {
    getAllChar: getAllCharReducer,
    getAllLocations: getAllLocationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
