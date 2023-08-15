import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import AllDemandProductData from "../../data/AllDemandProductData";

const initialState = []

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {   
        try{
            const collectionRef= await collection(db, 'products');
            const snapshot = await getDocs(collectionRef);
            const products = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return products;
        }catch(error){
            console.log(error);
        }
    }
)

export const fetchTestProducts = createAsyncThunk('products/fetchTestProducts', async () => 
    {   
        return [...AllDemandProductData];
    }
)

const  productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(fetchTestProducts.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export default productsSlice.reducer;