import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import  storage  from "redux-persist/lib/storage";
import { persistStore,persistReducer } from "redux-persist";

const persistConfig={
    key:"map-key",
    storage,
}
const persistedReducer=persistReducer(persistConfig,userReducer);
// const rootReducer=combineReducers({
//     user:userReducer
// });
export const store=configureStore({
    // reducer:rootReducer
    reducer:persistedReducer
});
export const persistor=persistStore(store);