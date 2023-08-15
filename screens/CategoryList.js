import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Categories from '../config/Categories'
import categoryMapImage from '../util/categoryMapImage';
import {SCREEN_HEIGHT, SCREEN_WIDTH, STANDARD_FLEX, STANDARD_SPACING} from '../config/Constants';
import { LightThemeColors as theme } from '../config/Colors';


const CategoryList = (props) => {
  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Scrollview */}
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryItemsWrapper}>
          {/* Mapping categories */}
          {Categories.map((item, index) => (
            <View key={index} style={styles.categoryItemComponentWrapper}>
              <Text style={styles.labelText}>{item.label}</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ProductList', {category: item.label})}
              >
                <Image
                  style={styles.categoryImageCard}
                  source={categoryMapImage(item.image)}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default CategoryList

const styles = StyleSheet.create({
    mainWrapper: {
        flex: STANDARD_FLEX,
      },
    categoryItemsWrapper: {
        flex: STANDARD_FLEX,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: STANDARD_SPACING * 2,
        backgroundColor: theme.secondary,
      },
    categoryItemComponentWrapper: {
        marginVertical: STANDARD_SPACING * 2,
        marginHorizontal: STANDARD_SPACING,
        justifyContent: 'center',
        alignItems: 'center',
      },
      categoryImageCard: {
        width: SCREEN_WIDTH - (STANDARD_SPACING * 6) ,
        height: SCREEN_HEIGHT / 5,
        borderRadius: 10,
        resizeMode: 'cover'
      },
      labelText: {
        position: 'absolute',
        color: theme.primary,
        fontSize: 20,
        fontWeight: 'bold',
        zIndex: 1,
      },
})