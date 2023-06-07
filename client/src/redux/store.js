import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import { rootReducer } from "./rootReducer";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    root: rootReducer,
  },
});
