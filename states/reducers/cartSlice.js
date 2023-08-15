import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//cartObject = {
//     items: [{id: , quantity: }, ...]
//     total: ,
// }    


const initialState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex(item => item.uid == action.payload.uid);
            if (index !== -1) {
                state.items[index].quantity += 1;
            } else {
                state.items.push({uid: action.payload.uid, quantity: 1});
            }
            state.total += action.payload.productData.price;
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.uid == action.payload.uid);
            if (index !== -1) {
                if(action.payload.flag) {
                    state.total -= action.payload.productData.price * state.items[index].quantity;
                    state.items.splice(index, 1);
                }else{
                    state.items[index].quantity -= 1;
                    state.total - action.payload.productData.price > 0 ? state.total -= action.payload.productData.price : state.total = 0;
                        if (state.items[index].quantity === 0) {
                            state.items.splice(index, 1);
                        }
               
                }
                
                
            }
        },

        clearCart: (state, action) => {
            state.items = [];
            state.total = 0;
        },

    },
    extraReducers: builder => {

    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;