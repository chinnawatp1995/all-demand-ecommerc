import { StyleSheet, Text, View, ScrollView, Pressable, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { STANDARD_FLEX,
         STANDARD_SPACING
 } from '../config/Constants'
 import OrdersData from '../data/OrdersData';
 import OrderItemCard from '../components/cards/OrderItemCard'
 import { LightThemeColors as theme } from '../config/Colors';
 import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../states/reducers/ordersSlice';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import LottieView from 'lottie-react-native';

const OrderList = (props) => {

    const orders = useSelector(state => state.orders);

    const [filter, setFilter] = useState('all');

    const formattedDate = (dateString) => {
      const luxonDateObject = DateTime.fromISO(dateString);
      const formattedDateString = luxonDateObject.toFormat('dd/MM/yyyy')
      return formattedDateString;
    }

    const filteredOrders = orders.filter((item) => {
      switch (filter) {
        case 'all':
          return true;
        case 'processing':
          return item.status === 'pending' || item.status === 'paid' || item.status === 'delivering';
        case 'delivered':
          return item.status === 'delivered';
        case 'canceled':
          return item.status === 'canceled';
        default:
          return true;
      }
    });

    

  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {orders.length > 0 && (<View style={styles.filterButtonWrapper}>
      <TouchableOpacity onPress={() => setFilter('all')}>
          <Text>ทั้งหมด</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('processing')}>
          <Text>กำลังดำเนินการ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('delivered')}>
          <Text>จัดส่งแล้ว</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('cancelled')}>
          <Text>ยกเลิก</Text>
        </TouchableOpacity>
      </View>)}
      
      {/* Scrollview */}
      {orders.length > 0 && (<ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {filteredOrders.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.orderItemCardComponentWrapper,
              index === 0 && styles.orderItemCardComponentWrapperWithMarginTop,
            ]}
            onPress={() => props.navigation.navigate({name: 'Order', params : { orderUid: item.uid}})}>
            <OrderItemCard
              borderColor={theme.secondary}
              backgroundColor={theme.primary}
              cardRowLabelColor={theme.textLowContrast}
              cardRowValueColor={theme.textHighContrast}
              orderId={item.uid}
              // orderDate={item.date}
              date={formattedDate(item.date)}
              itemsQuantity='1'
              orderTotal={item.total}
              status={item.status}
              invoiceIconColor={theme.accent}
              invoiceLabelColor={theme.accent}
              onPressInvoice={() => props.navigation.navigate('Order')}
            />
          </Pressable>
        ))}
      </ScrollView>)}

      {orders.length === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../assets/lottie/no-order-found.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.textHighContrast}}>ยังไม่มีรายการสั่งซื้อ</Text>
        </View>
      )}

    </View>
  )
}

export default OrderList

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  orderItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  orderItemCardComponentWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
  filterButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: STANDARD_SPACING * 3,
  },
})