import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Cart from './Cart';
import OrderList from './OrderList';
import Profile from './Profile';

const BottomTab = createBottomTabNavigator();

const TabNavigatior = () => {
  return (
     <BottomTab.Navigator screenOptions={{ }}>
        <BottomTab.Screen name='Home' component={Home}/>
        <BottomTab.Screen name='Cart' component={Cart}/>
        <BottomTab.Screen name='OrderList' component={OrderList}/>
        <BottomTab.Screen name='Profile' component={Profile}/>
     </BottomTab.Navigator>
  );
}

export default TabNavigatior

const styles = StyleSheet.create({})