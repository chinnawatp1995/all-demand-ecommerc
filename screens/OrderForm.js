import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useRef, useState} from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
  set,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import { LightThemeColors as theme } from '../config/Colors'
import FeatherIcons from 'react-native-vector-icons/Feather';
import AddressCard from '../components/cards/AddressCard';
import TextInput from '../components/inputs/TextInput';
import MultiLineTextInput from '../components/inputs/MultiLineTextInput';
import Button from '../components/buttons/Button';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  SCREEN_WIDTH,
  STANDARD_TEXT_TICKER_ANIMATED_CIRCLE_SIZE,
  STANDARD_TEXT_TICKER_HEIGHT,
  STANDARD_ORDER_ICON_WRAPPER_SIZE,
  FONT_SIZE_XS,
  FONT_SIZE_SM,
  STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE,
  STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_Z_INDEX,
  STANDARD_VECTOR_ICON_SIZE
} from '../config/Constants';
import { useDispatch, useSelector } from 'react-redux';
import MapInput from '../components/inputs/MapInput/MapInput'
import Profile from '../assets/icons/svg/Profile.svg';
import Chat from '../assets/icons/svg/Chat.svg';
import Call from '../assets/icons/svg/Call.svg';
import Message from '../assets/icons/svg/Message.svg';
import { placeOrder } from '../states/reducers/ordersSlice';
import { clearCart } from '../states/reducers/cartSlice';
import { orderFormValidation } from '../schemas/orderFormValidation';
import { useFormik } from 'formik';

const OrderForm = (props) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [placedOrder, setPlacedOrder] = useState('');

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      additionalInfo: '',
    },
    validationSchema: orderFormValidation,
    onSubmit: values => {
      console.log(values);
    },
  });


  const scrollRef = useRef(null);

  // Declaring text ticker labels
  const CHECKOUT_STEPS = [
    'Delivery Address',
    'Checkout Status',
  ];
   

  // Declaring shared value
  const translationX = useSharedValue(0);

  // // Handling scroll of the scroll view
  // const scrollHandler = useAnimatedScrollHandler(event => {
  //   // Storing scrolled offset value of the x direction
  //   translationX.value = withTiming(event.contentOffset.x);
  // });

  // Animated styles for the ticker
  const animatedTickerStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [STANDARD_TEXT_TICKER_HEIGHT, 0, -STANDARD_TEXT_TICKER_HEIGHT],
    );
    // Returning
    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  // Animated styles for the circle
  const animatedCircleStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      translationX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [
        -STANDARD_TEXT_TICKER_ANIMATED_CIRCLE_SIZE,
        0,
        STANDARD_TEXT_TICKER_ANIMATED_CIRCLE_SIZE,
      ],
    );

    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  // Toggling address card selection
  const selectAddress = useCallback(param => {
    // Updating state value
    setSelectedAddressIndex(param);
  }, []);


  const scrollToNext = useCallback(() => {
    // Scrolling to next
    scrollRef.current.scrollTo({
      x: SCREEN_WIDTH,
      y: 0,
      animated: true,
    });
    translationX.value = withTiming(SCREEN_WIDTH);
  }, []);

  async function handlePlaceOrder() {
    try{
      const order = { 
                      phoneNumber: phoneNumber,
                      address: user.address[selectedAddressIndex],
                      additionalInfo: '',
                    }
      
      const dispatchResult = await dispatch(placeOrder(order));
      dispatch(clearCart());
      setPlacedOrder(dispatchResult.payload.uid);
      scrollToNext();
    
    }catch(error){
      console.log(error);
    }
  }


  return (

    <SafeAreaView style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      <View style={[styles.header, {backgroundColor: theme.primary}]}>
        {/* Text ticker  */}
        <View style={styles.tickerContainer}>
          {CHECKOUT_STEPS.map((step, index) => (
            <Animated.View key={index} style={[animatedTickerStyles]}>
              <Text
                style={[styles.tickerText, {color: theme.textHighContrast}]}>
                {step}
              </Text>
            </Animated.View>
          ))}
        </View>

        {/* Pagination dots */}
        <View style={styles.paginationDotsContainer}>
          {/* Animated circle */}
          <Animated.View
            style={[
              animatedCircleStyles,
              styles.animatedCircle,
              {borderColor: theme.accent, backgroundColor: '#FB85000D'},
            ]}>
            <View
              style={[styles.paginationDot, {backgroundColor: theme.accent}]}
            />
          </Animated.View>
          {/* Dots */}
          {CHECKOUT_STEPS.map((_, index) => (
            <View key={index} style={[styles.paginationDotWrapper]}>
              <Animated.View
                style={[
                  styles.paginationDot,
                  {backgroundColor: theme.secondary},
                ]}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Animated horizontal scroll view */}
      <Animated.ScrollView
        horizontal
        ref={scrollRef}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={16}
        style={styles.horizontalScrollView}>

        {/* Addresses */}
        <ScrollView bounces={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
      
          <View
            style={[
              styles.slide, styles.contentWrapper,
              {paddingTop: useHeaderHeight()},
            ]}>
          

            <View style={[styles.formWrapper]}>
              {/* Text input */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  label="ชื่อ - นามสกุล"
                  labelColor={theme.textHighContrast}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.textLowContrast}
                  leftIcon={
                    <Profile
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  backgroundColor={theme.secondary}
                  textInputValueColor={theme.textHighContrast}
                  onTextChange={handleChange('name')}
                  handleBlur={handleBlur('name')}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  errorText={errors.name}
                />
              </View>

              {/* Text input */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  label="เบอร์โทรศัพท์"
                  labelColor={theme.textHighContrast}
                  placeholder="Enter your phone number"
                  placeholderTextColor={theme.textLowContrast}
                  leftIcon={
                    <Call
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  backgroundColor={theme.secondary}
                  textInputValueColor={theme.textHighContrast}
                  onTextChange={handleChange('phoneNumber')}
                  handleBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  errorText={errors.phoneNumber}
                />

                {/* Text input */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  label="E-mail"
                  labelColor={theme.textHighContrast}
                  placeholder="Enter your E-mail"
                  placeholderTextColor={theme.textLowContrast}
                  leftIcon={
                    <Message
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  backgroundColor={theme.secondary}
                  textInputValueColor={theme.textHighContrast}
                  onTextChange={handleChange('email')}
                  handleBlur={handleBlur('email')}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  errorText={errors.email}
                />
              </View>

                {/* Text input */}
              <View style={styles.textInputWrapper}>
                <MultiLineTextInput
                  label="ข้อมูลเพิ่มเติม"
                  labelColor={theme.textHighContrast}
                  placeholder={"ข้อมูลเพิ่มเติม\nเช่น เบอร์โทรติดต่อเพิ่มเติม\nหรือ ข้อมูลที่ต้องการให้ผู้ส่งสินค้าทราบ"}
                  placeholderTextColor={theme.textLowContrast}
                  leftIcon={
                    <Chat
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  backgroundColor={theme.secondary}
                  textInputValueColor={theme.textHighContrast}
                  onTextChange={handleChange('additionalInfo')}
                  handleBlur={handleBlur('additionalInfo')}
                  value={values.additionalInfo}
                  error={errors.additionalInfo}
                  touched={touched.additionalInfo}
                  errorText={errors.additionalInfo}
                />
              </View>

              </View>

            </View>
           
            <MapInput/>

            <View>
              {(user.address.length>0) &&
              (user.address.map((item, index) => (
              <View key={index} id={item.uid} style={[styles.cardComponentWrapper]}>
                <AddressCard
                  onPress={() => selectAddress(index)}
                  cardBorderColor={
                  selectedAddressIndex === index
                  ? theme.accent
                  : theme.secondary
                  }       
                  cardBackgroundColor={
                  selectedAddressIndex === index
                  ? '#FB85000D'
                  : theme.primary
                  }
                  addressTypeIconBackgroundColor={theme.secondary}
                  addressTypeIconName='home'
                  addressTypeIconColor={theme.accent}
                  addressTypeColor={theme.textHighContrast}
                  checkCircleColor={theme.accent}
                  addresseeName={item.name}
                  addresseeNameColor={theme.textHighContrast}
                  address={item.description}
                  addressColor={theme.textLowContrast}
                  selected={selectedAddressIndex === index ? true : false}
                />
              </View>
              )))
              }
            </View>
  
            <Button 
              label="ยืนยันคำสั่งซื้อ"
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              disabled={errors.name || errors.phoneNumber || errors.email || errors.additionalInfo}
              onPress={() => handlePlaceOrder()}
            />

          </View>
          
     
        </ScrollView>

        {/* Checkout status */}
        <View
          style={[
            styles.slide,
            {paddingTop: getStatusBarHeight()},
          ]}>
          <View style={styles.contentWrapper} />

          <View style={[styles.checkoutStatus]}>
            <View
              style={[
                styles.orderSuccessCheckMarkWrapper,
                {backgroundColor: theme.accent},
              ]}>
              <FeatherIcons
                name="check"
                size={STANDARD_ORDER_ICON_WRAPPER_SIZE * 0.5}
                color={theme.primary}
              />
            </View>

            <Text
              style={[
                styles.orderStatusTitle,
                {color: theme.textHighContrast},
              ]}>
              Order Placed!
            </Text>

            <Text
              style={[
                styles.orderStatusMessage,
                {color: theme.textLowContrast},
              ]}>
              Hey! your order was placed successfully. For more details about
              your order status click the button below.
            </Text>

            <Button
              label="ดูคำสั่งซื้อของคุณ"
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={() => props.navigation.navigate({name: 'Order', params: {orderUid: placedOrder}})}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default OrderForm

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
    height: scale(75),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickerContainer: {
    overflow: 'hidden',
    height: STANDARD_TEXT_TICKER_HEIGHT,
  },
  tickerText: {
    textTransform: 'uppercase',
    fontSize: STANDARD_TEXT_TICKER_HEIGHT,
    lineHeight: STANDARD_TEXT_TICKER_HEIGHT,
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    marginTop: scale(7.5),
  },
  animatedCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
    height: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
    borderWidth: scale(1.25),
    zIndex: STANDARD_Z_INDEX,
  },
  paginationDotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
    height: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
  },
  paginationDot: {
    borderRadius: STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE / 2,
    width: STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE,
    height: STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE,
  },
  horizontalScrollView: {
    flex: STANDARD_FLEX,
  },
  slide: {
    width: SCREEN_WIDTH,
  },
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flex: STANDARD_FLEX,
  },
  addButtonComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  cardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  checkoutStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  sectionTitle: {
    marginVertical: STANDARD_SPACING * 3,
    fontSize: FONT_SIZE_SM,
  },
  textInputWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  orderSuccessCheckMarkWrapper: {
    width: STANDARD_ORDER_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_ORDER_ICON_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusTitle: {
    marginVertical: STANDARD_SPACING * 3,
    fontSize: FONT_SIZE_SM,
  },
  orderStatusMessage: {
    fontSize: FONT_SIZE_XS,
    textAlign: 'center',
    marginHorizontal: STANDARD_SPACING * 3,
    marginBottom: STANDARD_SPACING * 4,
  },
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 6,
    paddingBottom: STANDARD_SPACING * 3,
  },

})