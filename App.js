import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import store from './states/store';



import { StripeProvider } from '@stripe/stripe-react-native';

import { auth, db, storage, functions} from './firebase'

import TabNavigatior from './screens/TabNavigatior';
// import Login from './screens/Login';
import UpdateProfile from './screens/UpdateProfile';
import LoginWithEmail from './screens/LoginWithEmail';
import TestCheckout from './screens/TestCheckout';
import CategoryList from './screens/CategoryList';
import ProductDetail from './screens/ProductDetail';
import ProductList from './screens/ProductList';
import OrderForm from './screens/OrderForm';
import OrderList from './screens/OrderList';
import Order from './screens/Order';
import LoginS from './screens/LoginS';
import SignUp from './screens/SignUp';
import { fetchTestProducts } from './states/reducers/productsSlice';
import { fetchOrders, logOut as ordersLogOut, updateOrder } from './states/reducers/ordersSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserProfile, logout as userLogOut } from './states/reducers/userSlice';
import ShowProductsInOrder from './screens/ShowProductsInOrder';
// import TestStripe from './screens/TestStripe';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import EditAddress from './screens/EditAddress';
import EditTextInput from './screens/EditTextInput';


const Stack = createNativeStackNavigator();

export default function App() {
  
  useEffect(() => {
    store.dispatch(fetchTestProducts());
  }, [])

  let unsubscribe = null;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      store.dispatch(fetchUserProfile(user.uid));
      store.dispatch(fetchOrders(user.uid));
      const collectionRef = collection(db, 'orders');
      const q = query(collectionRef, where("userUid", "==", user.uid));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("in order listener ");
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({...doc.data(), uid: doc.id});
          console.log("order is : ", doc.data());
        });
        store.dispatch(updateOrder(orders));
      });
    } else {
      store.dispatch(userLogOut())
      store.dispatch(ordersLogOut());
      if (unsubscribe) {
        unsubscribe();
      }
    }
  });


  return (

    <Provider store={store}>
    <StripeProvider
    publishableKey="YOUR_STRIPE_PUBLISHABLE_KEY"
    >

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigatior}/>
          <Stack.Screen name="CategoryList" component={CategoryList}/>
          <Stack.Screen name="ProductDetail" component={ProductDetail}/>
          <Stack.Screen name="OrderList" component={OrderList}/>
          <Stack.Screen name="Order" component={Order}/>
          <Stack.Screen name="OrderForm" component={OrderForm}/> 
          <Stack.Screen name="ShowProductsInOrder" component={ShowProductsInOrder}/>
          <Stack.Screen name="ProductList" component={ProductList}/>
          {/* <Stack.Screen name="logIn" component={Login}/> */}
          <Stack.Screen name='UpdateProfile' component={UpdateProfile}/>
          <Stack.Screen name='logInWithEmail' component={LoginWithEmail}/>
          <Stack.Screen name='testCheckout' component={TestCheckout}/>
          <Stack.Screen name='LoginS' component={LoginS} />
          <Stack.Screen name='SignUp' component={SignUp}/>
          <Stack.Screen name='EditAddress' component={EditAddress} />
          <Stack.Screen name='EditTextInput' component={EditTextInput}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  </StripeProvider>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
