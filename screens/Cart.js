import { StyleSheet, Text, View, ScrollView,SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import CartItemCard from '../components/cards/CartItemCard'
import Button from '../components/buttons/Button'
import { useSelector, useDispatch } from 'react-redux'
import { SCREEN_HEIGHT, STANDARD_FLEX, STANDARD_SPACING } from '../config/Constants'
import { LightThemeColors as theme } from '../config/Colors'
import { addToCart, removeFromCart, clearCart } from '../states/reducers/cartSlice';
import LottieView from 'lottie-react-native';


const Cart = (props) => {

  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const products = useSelector(state => state.products)
  const dispatch = useDispatch();

  const findIndex = (uid) => {
    return products.findIndex(item => item.id === uid)
  }

  const onAddToCart = (uid) => {
    dispatch(addToCart({uid: uid, productData: products[findIndex(uid)]}))
  }

  const onRemoveFromCart = (uid, flag= undefined) => {
    if(!flag){
      dispatch(removeFromCart({uid: uid, productData: products[findIndex(uid)]}))
    }else{
      dispatch(removeFromCart({uid: uid, productData: products[findIndex(uid)] , flag: true}))
    }

  }

  const onCheckout = () => {
    if(user.uid){
      props.navigation.navigate('OrderForm')
    }else{
      props.navigation.navigate('LoginS')
    }
  }

  const lottieRef = React.useRef(null);

  return (
    <Animatable.View
      style={[styles.mainWrapper, {backgroundColor: theme.primary},{justifyContent: cart.items.length>0 ? 'flex-start' : 'center'}]}
      delay={100}
      animation="fadeInUp"
      easing="ease-in-out-back"
      useNativeDriver={true}>
      {/* Scrollview */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {cart.items.map((item, index) => (
          <View
            key={item.uid}
            style={[
              index === 0 && styles.cartItemCardComponentWrapperWithTopMargin,
              styles.cartItemCardComponentWrapper,
            ]}>
            <CartItemCard
              cardBackgroundColor={theme.secondary}
              trashButtonBackgroundColor={theme.secondary}
              itemImageBackgroundColor={theme.primary}
              itemImage={products[findIndex(item.uid)].image}
              itemName={products[findIndex(item.uid)].name}
              itemNameColor={theme.textHighContrast}
              itemPrice={products[findIndex(item.uid)].price}
              itemPriceColor={theme.textHighContrast}
              itemQuantity={item.quantity}
              itemQuantityColor={theme.textLowContrast}
              itemType={products[findIndex(item.uid)].category}
              actionButtonBackgroundColor={theme.primary}
              onPressIncreaseButton={() => onAddToCart(item.uid)}
              onPressDecreaseButton={() => onRemoveFromCart(item.uid)}
              onPressThrashButton={() => onRemoveFromCart(item.uid, true)}
            />
          </View>
        ))}

        {/* Checkout button */}
        {cart.items.length>0 ? (<View style={styles.checkoutButtonComponentWrapper}>
          <Button
            label={'Checkout'}
            labelColor={theme.primary}
            backgroundColor={theme.accent}
            onPress={onCheckout}
          />
        </View>)
        :
        (
        <View style={styles.lottieWrapper}>
        <LottieView
          autoPlay
          ref={lottieRef}
          style={{
            width: 250,
            height: 250,
            backgroundColor: 'transparent',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../assets/lottie/empty.json')}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.textHighContrast}}>ยังไม่มีสินค้าในตระกร้า</Text>
        </View>
        )  
      }


      </ScrollView>
    </Animatable.View>
    
 
  )
}

export default Cart

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    justifyContent: 'center',
  },
  cartItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  cartItemCardComponentWrapperWithTopMargin: {
    marginTop: STANDARD_SPACING * 3,
  },
  checkoutButtonComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
  },
  lottieWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.2,
  },
})