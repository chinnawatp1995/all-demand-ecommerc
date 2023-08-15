import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import productsSlice from "./reducers/productsSlice";
import ordersSlice from "./reducers/ordersSlice";
import cartSlice from "./reducers/cartSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        products : productsSlice,
        orders: ordersSlice,
        cart: cartSlice,
    }
})