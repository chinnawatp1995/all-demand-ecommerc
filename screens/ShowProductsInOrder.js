import { StyleSheet, Text, View, ScrollView,SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import ProductInOrderCard from '../components/cards/ProductInOrderCard';
import Button from '../components/buttons/Button'
import { useSelector, useDispatch } from 'react-redux'
import { STANDARD_FLEX, STANDARD_SPACING } from '../config/Constants'
import { LightThemeColors as theme } from '../config/Colors'

const ShowProductsInorder = (props) => {
    const products = useSelector(state => state.products)
    
    const findIndex = (uid) => {
        return products.findIndex(item => item.id == uid);
    }


    
    return (
        <Animatable.View
          style={[styles.mainWrapper, {backgroundColor: theme.primary}]}
          delay={100}
          animation="fadeInUp"
          easing="ease-in-out-back"
          useNativeDriver={true}>
          {/* Scrollview */}
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {props.route.params.items.map((item, index) => (
              <View
                key={item.uid}
                style={[
                  index === 0 && styles.cartItemCardComponentWrapperWithTopMargin,
                  styles.cartItemCardComponentWrapper,
                ]}>
                <ProductInOrderCard
                  onCardPress={() => props.navigation.navigate('ProductDetail')}
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
                />
              </View>
            ))}
    
          </ScrollView>
        </Animatable.View>
      )
}

export default ShowProductsInorder

const styles = StyleSheet.create({
    mainWrapper: {
        flex: STANDARD_FLEX,
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
})