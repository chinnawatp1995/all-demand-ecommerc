import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { LightThemeColors as theme , IndependentColors } from '../config/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XXS,
  FONT_SIZE_XS,
  STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
  STANDARD_ORDER_STATUS_PROGRESS_STEP_OUTER_CIRCLE_SIZE,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../config/Constants';
import { scale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import Button from '../components/buttons/Button';
import { DateTime } from 'luxon';
import Link from '../components/links/Link';

const Order = (props) => {

  const products = useSelector(states => states.products)
  const uid = props.route.params.orderUid;
  const order = useSelector(state => state.orders.find(item => item.uid == uid));
  const productsInOrder = products.filter(item => order.products.findIndex(orderItem => orderItem.uid === item.id) !== -1)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = React.useState(false);
  const luxonDateObject = DateTime.fromISO(order.date);
  const formattedDateString = luxonDateObject.toFormat('dd/MM/yyyy')

  const fetchPaymentSheetParams = async () => {
    
    try{
    
    const response = await fetch("http://192.168.171.96:5001/all-demand-chinnawat/us-central1/paymentIntentinit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: order.total,
        currency: 'thb',
        orderUid: order.uid,
      }),
    });
    const { paymentIntent} = await response.json();

    return {
      paymentIntent,
      };
    }catch(e){
      console.log(e.message)
    } 
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "ALL DEMANMD",
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Test Test',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  async function handlePayPress() {
    try {
      await initializePaymentSheet();
      await openPaymentSheet();
      } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Horizontal scrollview */}

      <View>

        <View style={styles.linkWrapper}>
          <Link
              label="ดูสินค้าในตระกร้าทั้งหมด"
              labelColor={theme.accent}
              onPress={() => props.navigation.navigate({name: 'ShowProductsInOrder', params: {items: order.products}})}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.horizontalScrollView}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}>
        
          {productsInOrder.map((item, index) => 
      
            <Pressable
                  key={index}
                  style={[styles.orderItemWrapper, {backgroundColor: theme.secondary}]}
                  onPress={() => navigation.navigate('Product')}>
                  <Image
                  style={styles.orderItemImage}
                  source={item.image}
                  />
            </Pressable>
            )
          }
        </ScrollView>
        
      </View> 


      {/* Vertical scrollview */}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalScrollView}>
        {/* Section title */}
        <View style={styles.sectionTitleWrapper}>
          <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
              ใบสั่งซื้อ :  {order.uid}
          </Text>
        </View>

        {/* Order total */}
        <>
          <View style={styles.sectionContentRow}>
            <Text
              style={[
                styles.sectionContentRowLabel,
                {color: theme.textLowContrast},
              ]}>
            วันที่สั่งซื้อ :
            </Text>
            <Text
              style={[
                styles.sectionContentRowLabelValue,
                {color: theme.textHighContrast},
              ]}>
              {formattedDateString}
            </Text>
          </View>

          <View style={styles.sectionContentRow}>
            <Text
              style={[
                styles.sectionContentRowLabel,
                {color: theme.textLowContrast},
              ]}>
              เบอร์ติดต่อ :
            </Text>
            <Text
              style={[
                styles.sectionContentRowLabelValue,
                {color: theme.textHighContrast},
              ]}>
              {order.phoneNumber}
            </Text>
          </View>

          <View style={styles.sectionContentRow}>
            <Text
              style={[
                styles.sectionContentRowLabel,
                {color: theme.textLowContrast},
              ]}>
              ผู้สั่งซื้อ :
            </Text>
            <Text
              style={[
                styles.sectionContentRowLabelValue,
                {color: theme.textHighContrast},
              ]}>
              {order.name}
            </Text>
          </View>



        </>

        {/* Section title */}
        
        <Text style={[
                styles.sectionContentRowLabel,
                {color: theme.textLowContrast},
              ]}>
            ที่อยู่จัดส่ง :
          </Text>
          <View style={styles.sectionTitleWrapper}>
          <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
            {order.address.description}
          </Text>
        </View>

        {/* Shipping information */}
        <>
          
          <View style={styles.sectionContentRow}>
            <Text
              style={[
                styles.sectionContentRowLabel,
                {color: theme.textLowContrast},
              ]}>
              ค่าจัดส่ง :
            </Text>
            <Text
              style={[
                styles.sectionContentRowLabelValue,
                {color: theme.textHighContrast},
              ]}>
              0 THB
            </Text>
          </View>

          <View style={styles.sectionContentRow}>
            <Text
              style={[
                styles.sectionContentRowLabel,
                {color: theme.textLowContrast},
              ]}>
              ราคาสินค้า :
            </Text>
            <Text
              style={[
                styles.sectionContentRowLabelValue,
                {color: theme.textHighContrast},
              ]}>
              {order.total} THB
            </Text>
          </View>
        </>

        {/* Order total payable */}
        <View style={styles.orderTotalPayableTitleAndAmountWrapper}>
          <Text
            style={[
              styles.orderTotalPayableTitle,
              {color: theme.textHighContrast},
            ]}>
            TOTAL :
          </Text>

          <Text style={[styles.orderTotalPayableAmount, {color: theme.accent}]}>
            {order.total} THB
          </Text>
        </View>

        {/* Section title */}
        <View style={styles.sectionTitleWrapper}>
          <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
            สถานะคำสั่งซื้อ :  
              {order.status ==='cancelled' && (
                <Text style={{color: 'red'}}>
                  คำสั่งซื้อถูกยกเลิก
                </Text>
              )}
          </Text>
        </View>

        {/* Order status steps */}
        {order.status !== 'cancelled' &&(<View style={styles.orderStatusProgressStepsWrapper}>
          {/* Step */}
          <View style={styles.progressStepWrapper}>
            <View
              style={[
                styles.progressStepOuterCircle,
                {backgroundColor: theme.accent, borderColor: theme.secondary},
              ]}>
              {order.status === 'pending'&&(<Ionicons
                name="checkmark-outline"
                size={scale(16)}
                color={IndependentColors.white}
              />)}
            </View>
            {/* Step label */}
            <Text style={[styles.progressStepLabel, {color: theme.accent}]}>
              รอการชำระเงิน
            </Text>
          </View>

          {/* Step */}
          <View style={styles.progressStepWrapper}>
            <View
              style={[
                styles.progressStepOuterCircle,
                {backgroundColor: theme.accent, borderColor: theme.secondary},
              ]}>
              {/* <View
                style={[
                  styles.progressStepInnerCircle,
                  {backgroundColor: theme.primary},
                ]}
              /> */}
              {order.status === 'paid'&&(<Ionicons
                name="checkmark-outline"
                size={scale(16)}
                color={IndependentColors.white}
              />)}
            </View>
            {/* Step label */}
            <Text
              style={[
                styles.progressStepLabel,
                {color: theme.textLowContrast},
              ]}>
              ชำระเงินแล้ว
            </Text>
          </View>

          {/* Step */}
          <View style={styles.progressStepWrapper}>
            <View
              style={[
                styles.progressStepOuterCircle,
                {backgroundColor: theme.accent, borderColor: theme.secondary},
              ]}>
              {/* <View
                style={[
                  styles.progressStepInnerCircle,
                  {backgroundColor: theme.primary},
                ]}
              /> */}
              {order.status === 'delivering'&&(<Ionicons
                name="checkmark-outline"
                size={scale(16)}
                color={IndependentColors.white}
              />)}
            </View>
            {/* Step label */}
            <Text
              style={[
                styles.progressStepLabel,
                {color: theme.textLowContrast},
              ]}>
              กำลังจัดส่ง
            </Text>
          </View>

          {/* Step */}
          <View style={styles.progressStepWrapper}>
            <View
              style={[
                styles.progressStepOuterCircle,
                {backgroundColor: theme.accent, borderColor: theme.secondary},
              ]}>
              {/* <View
                style={[
                  styles.progressStepInnerCircle,
                  {backgroundColor: theme.primary},
                ]}
              /> */}
              {order.status === 'delivered'&&(<Ionicons
                name="checkmark-outline"
                size={scale(16)}
                color={IndependentColors.white}
              />)}
            </View>
            {/* Step label */}
            <Text
              style={[
                styles.progressStepLabel,
                {color: theme.textLowContrast},
              ]}>
              จัดส่งแล้ว
            </Text>
          </View>

          {/* Horizontal line */}
          <View
            style={[
              styles.orderStatusProgressStepsLine,
              {backgroundColor: theme.secondary},
            ]}
          />
        </View>
)}
        {/* Payment Button */}
        <View style={styles.buttonWrapper}>
          <Button
            labelColor={theme.primary} 
            backgroundColor={theme.accent}
            title="ชำระเงิน"
            onPress={handlePayPress}
          />
        </View>
      </ScrollView>
    </View>
  );
}


export default Order

const styles = StyleSheet.create({
  mainWrapper: {
  flex: STANDARD_FLEX,
},
horizontalScrollView: {
  marginHorizontal: STANDARD_SPACING * 1.5,
  marginVertical: STANDARD_SPACING * 3,
},
orderItemWrapper: {
  padding: STANDARD_SPACING * 3,
  marginHorizontal: STANDARD_SPACING * 1.5,
  width: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
  aspectRatio: 1,
  borderRadius: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.25,
},
orderItemImage: {
  width: null,
  height: null,
  flex: STANDARD_FLEX,
  resizeMode: 'contain',
},
verticalScrollView: {
  marginHorizontal: STANDARD_SPACING * 3,
},
sectionTitle: {
  fontSize: FONT_SIZE_SM,
  marginTop: STANDARD_SPACING * 3,
  marginBottom: STANDARD_SPACING * 6,
},
sectionContentRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: STANDARD_SPACING * 3,
},
sectionContentRowLabel: {
  fontSize: FONT_SIZE_XS,
},
sectionContentRowLabelValue: {
  fontSize: FONT_SIZE_XS,
},
orderTotalPayableTitleAndAmountWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: STANDARD_SPACING * 3,
},
orderTotalPayableTitle: {
  fontSize: FONT_SIZE_SM,
},
orderTotalPayableAmount: {
  fontSize: FONT_SIZE_SM,
},
orderStatusProgressStepsWrapper: {
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
orderStatusProgressStepsLine: {
  height: scale(1.25),
  zIndex: -1,
  width: '90%',
  marginLeft: '5%',
  position: 'absolute',
  top: STANDARD_SPACING * 3,
},
progressStepWrapper: {
  alignItems: 'center',
},
progressStepOuterCircle: {
  width: STANDARD_ORDER_STATUS_PROGRESS_STEP_OUTER_CIRCLE_SIZE,
  aspectRatio: 1,
  borderWidth: scale(3),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: STANDARD_ORDER_STATUS_PROGRESS_STEP_OUTER_CIRCLE_SIZE * 0.5,
},
progressStepInnerCircle: {
  width: STANDARD_ORDER_STATUS_PROGRESS_STEP_OUTER_CIRCLE_SIZE * 0.5,
  borderRadius: STANDARD_ORDER_STATUS_PROGRESS_STEP_OUTER_CIRCLE_SIZE * 0.5,
  aspectRatio: 1,
},
progressStepLabel: {
  fontSize: FONT_SIZE_XXS,
  marginTop: STANDARD_SPACING,
},
buttonWrapper: {  
  alignItems: 'center',
  marginVertical: STANDARD_SPACING ,
  width: '100%',
},
linkWrapper: {
  alignItems: 'flex-end',
  marginRight: STANDARD_SPACING * 3,
  marginTop: STANDARD_SPACING * 3,
},
}
)