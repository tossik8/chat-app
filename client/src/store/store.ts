import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import selectedChatSlice from "./selectedChatSlice";
import foundUsersSlice from "./foundUsersSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["selectedChat", "foundUsers"]
}

const rootReducer = persistCombineReducers(persistConfig, {
    user: userSlice.reducer,
    selectedChat: selectedChatSlice.reducer,
    foundUsers: foundUsersSlice.reducer
})
const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
export default store;
