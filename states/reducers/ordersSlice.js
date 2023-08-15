import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../firebase'
import { addDoc, collection, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { DateTime } from "luxon";



// orderObject = {
//     id: ,
//     userUid: ,
//     name: ,
//     products: [{id: , quantity: }, ...]
//     total: ,
//     date: ,
//     status: pending|paid|delivered|cancelled,
//     address: {},
//     telephone: ,
//     additionalInfo: ,
// }

const initialState = [];

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (userUid, {getState}) => {
        try{
        const q = query(collection(db, 'orders'), where('userUid', '==', userUid));
        const orders = await getDocs(q);
        const ordersArray = orders.docs.map(doc => ({...doc.data(), uid : doc.id}));
        return ordersArray;
        }catch (e) {
            console.log(e);
        }     
    }
)

export const placeOrder = createAsyncThunk('orders/placeOrder', async (order, {getState}) => {
        const cart = getState().cart;
        const user = getState().user;
        const date = DateTime.local().setZone('Asia/Bangkok');
        const orderObject = {
            userUid: user.uid,
            name: user.name,
            products: [...cart.items],
            total:  cart.total,
            date: date.toString(),
            status: 'pending',
            address: order.address,
            phoneNumber: order.phoneNumber, 
            additionalInfo: order.additionalInfo
        }
        try{
            const collectionRef = collection(db, 'orders');
            const docSnap = await addDoc(collectionRef, orderObject);
            return {...orderObject, uid: docSnap.id};
        } catch (e) {
            console.log(e.message);
        }
    }
)


export const removeOrder = createAsyncThunk('orders/removeOrder', async (order, {getState}) => {
        const orderUid = order.uid;
        try{
            const docRef = doc(db, 'orders', orderUid);
            await deleteDoc(docRef);
            return order.uid;
        }catch (e) {
            console.log(e);
        }
    }
)



const  ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        logOut: (state, action) => {
            return initialState;
        },
        updateOrder: (state, action) => {
            state = action.payload;
            return state;
        }


    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {        
                return action.payload;
                }
            )

            
            
            .addCase(removeOrder.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.uid == action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                    }
                }
            )
    }
})

export const { logOut, updateOrder } = ordersSlice.actions;

export default ordersSlice.reducer;







