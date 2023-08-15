import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ListViewItemCard from '../components/cards/ListViewItemCard'
import AllDemandProductData from '../data/AllDemandProductData'
import { LightThemeColors as theme } from '../config/Colors'
import {  STANDARD_FLEX,
          STANDARD_SPACING
}from '../config/Constants'
import { useSelector } from 'react-redux'

const ProductList = (props) => {

  let products = useSelector(state => state.products)
  
  console.log('props.route.params', props.route.params.category);

  if(props.route.params && props.route?.params?.category){

    if(props.route.params.category === 'bestSeller'){
      let bestSellerProducts = [...products].sort((a, b) => b.sold - a.sold);
      products = bestSellerProducts.slice(0, 10);
    }else{
      products = products.filter((item) => item.category === props.route.params.category);
    }
  }


  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Scrollview */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {products.map((item, index) => (
          <View
            key={item.id}
            style={[
              index === 0 &&
                styles.listViewItemCardComponentWrapperWithMarginTop,
              styles.listViewItemCardComponentWrapper,
            ]}>
            <ListViewItemCard
              cardBackgroundColor={theme.secondary}
              heartIconColor={theme.textHighContrast}
              heartButtonBackgroundColor={theme.secondary}
              itemImageBackgroundColor={theme.primary}
              itemImage={item.image}
              itemName={item.name}
              itemNameColor={theme.textHighContrast}
              itemDiscountedPrice={item.price}
              itemDiscountedPriceColor={theme.textHighContrast}
              actionButtonBackgroundColor={theme.primary}
              onPress={() => props.navigation.navigate({name: 'ProductDetail', params: {category: props.route.params.category, id: item.id}})}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  listViewItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  listViewItemCardComponentWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
})