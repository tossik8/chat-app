import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage
}

const rootReducer = persistCombineReducers(persistConfig, {
    user: userSlice.reducer
})
const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)
export default store;
