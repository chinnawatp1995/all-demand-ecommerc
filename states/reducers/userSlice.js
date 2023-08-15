import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, addDoc, deleteDoc, getDocs, collection, query } from "firebase/firestore";
import { acc } from "react-native-reanimated";

// userObject = {
//     uid: ,
//     email: ,
//     name: ,
//     phone: ,
//     profileStatus: ,    
//     role: ,
//     addresses: [{id: , name: , description: , 
//                  coordinate:{ latitude: ,longitude: } }, ...]
// }



const profileStatusEnum = {complete: 1 , incomplete: 0}

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async uid => {
        try{
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            const userProfile = {uid:docSnap.id, ...docSnap.data()}
            console.log(userProfile)
            const subCollectionRef = collection(docRef, 'addresses');
            const subCollectionSnapshot = await getDocs(subCollectionRef);
            if(!subCollectionSnapshot.empty){
                userProfile.address = subCollectionSnapshot.docs.map(doc => ({uid: doc.id, ...doc.data()}));
                }
            else{
                userProfile.address = [];
            }
            return userProfile;
        }catch(e){
            console.log(e.message)
        }
    }
)

export const addAddress = createAsyncThunk('user/addAddress', async (newAddress, {getState}) =>{
        try{
            const user = getState().user;
            const docRef = doc(db, 'users', user.uid);
            const subCollectionRef = collection(docRef, 'addresses')
            const docSnapshot = await addDoc(subCollectionRef, {
                name: newAddress.name,
                description: newAddress.description,
                coordinate: newAddress.coordinate
            })
            //console.log(docSnapshot)
            return {uid: docSnapshot.id, ...newAddress};
            }catch(e){
            console.log(e.message);
        }
    }
)

export const removeAddress = createAsyncThunk('user/removeAddress', async (oldAddressUID, {getState}) =>{
        try{
            const user = getState().user;
            const subCollectionRef = collection(db, 'users', user.uid, 'addresses')
            await deleteDoc(doc(subCollectionRef, oldAddressUID))
            return oldAddressUID;
        }catch(e){
            console.log(e.message);
        }
    }
)

export const updateProfile = createAsyncThunk('user/updateProfile', async (newProfile, {getState}) =>{
        try{
            const docRef = doc(db, 'users', getState().user.uid);
            await updateDoc(docRef, {
                name: newProfile.name,
                email: newProfile.email,
                phoneNumber: newProfile.phoneNumber,
            })
            return newProfile;
        }catch(e){
            console.log(e.message);
        }
    }
)

const initialState = {
    uid:'',
    name:'',
    email: '',
    phoneNumber: '',
    role: '',
    address: [] ,
    profileStatus: profileStatusEnum.incomplete,
};

const  userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            return initialState;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.fulfilled, (state,action)=>{
                //console.log(action.payload)
                state.uid = action.payload.uid;
                state.email = action.payload.email
                state.address = action.payload.address
                state.name = action.payload.name
                state.phoneNumber = action.payload.phoneNumber
                state.profileStatus = (action.payload.name&&action.payload.address.length>0)?profileStatusEnum.complete:profileStatusEnum.incomplete;
                //console.log(state); 
                }
            )
            .addCase(fetchUserProfile.rejected, (state,action) => {

            })
            .addCase(addAddress.fulfilled, (state,action)=>{
                 state.address.push(action.payload)
                 }
             )
             .addCase(removeAddress.fulfilled, (state,action) => {
                 const index = state.address.findIndex(item => item.uid == action.payload);
                 state.address.splice(index, 1);
                 }
             )
             .addCase(updateProfile.fulfilled, (state,action) => {
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.phoneNumber = action.payload.phoneNumber;
                state.profileStatus = (state.name&&state.address.length>0)?profileStatusEnum.complete:profileStatusEnum.incomplete;
                }
                
             )
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;