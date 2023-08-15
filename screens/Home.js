import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import ButtonSquared from '../components/buttons/ButtonSquared';
import GridViewItemCard from '../components/cards/GridViewItemCard';
import GridViewProductsData from '../data/GridViewProductsData';
import HomeMainSliderData from '../data/HomeMainSliderData';
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';
import Link from '../components/links/Link';
import HomeCategoriesItemCard from '../components/cards/HomeCategoriesItemCard';
import {
  SCREEN_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_PAGINATION_INDICATOR_WIDTH,
  FONT_SIZE_XL,
  FONT_SIZE_MD,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_BANNER_WRAPPER_HEIGHT,
} from '../config/Constants';
import { LightThemeColors as theme, IndependentColors } from '../config/Colors';
import Categories from '../config/Categories';
import AllDemandProductData from '../data/AllDemandProductData';


const Home = (props) => {

    const products = useSelector(state => state.products)
    // Declaring shared value
    const translationX = useSharedValue(0);

    const user = useSelector(state => state.user)

    // Declaring current index of the slide
    const currentIndex = useRef(0);
  
    // Defining reference for the Flatlist
    const flatListRef = useRef(null);
  
    // Handling scroll of the flat list
    const scrollHandler = useAnimatedScrollHandler(event => {
      // Storing scrolled offset value of the x direction
      translationX.value = withTiming(event.contentOffset.x);
    });
  
    //
    const onViewableItemsChanged = useCallback(({viewableItems}) => {
      if (viewableItems.length === 0) {
        return;
      }
  
      currentIndex.current = viewableItems[0].index;
    }, []);
  
    // Declaring viewability config for the Flatlist
    const viewabilityConfig = {
      itemVisiblePercentThreshold: 100,
    };
  
    // Declaring viewability config callback pairs for the Flatlist
    const viewabilityConfigCallbackPairs = useRef([
      {viewabilityConfig, onViewableItemsChanged},
    ]);


    return (
      <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.mainScrollView}>
        {/* Header */}
        <View style={styles.header}>

          {/* Welcome */}
          <Text style={[styles.welcomeLabel, {color: theme.textHighContrast}]}>
           {user.name?'สวัสดี, ' + user.name:'ยินดีต้อนรับสู่ All Demand'}
          </Text>

          {/* Avatar */}
          <View
            style={[
              styles.avatarWrapper,
              {backgroundColor: IndependentColors.redLightest},
            ]}>
            <Image
              source={require('../assets/illustrations/person.png')}
              style={styles.avatarImage}
            />
          </View>
        </View>

        {/* Searchbar */}
        <View style={styles.searchbarWrapper}>
          <TextInput
            style={[
              styles.searchbarTextInput,
              {backgroundColor: theme.secondary, color: theme.textHighContrast},
            ]}
            placeholder="Search here..."
            placeholderTextColor={theme.textLowContrast}
          />

          <ButtonSquared
            height={45}
            icon={
              <FeatherIcons
                name="search"
                color={theme.primary}
                size={scale(20)}
              />
            }
            backgroundColor={theme.accent}
          />
        </View>

        {/* Main carousel */}
        <View style={[styles.mainCarouselFlatListWrapper]}>
          {/* Carousel */}
          <Animated.FlatList
            ref={flatListRef}
            data={HomeMainSliderData}
            renderItem={({item, index}) => (
              <View style={[styles.mainCarouselFlatListItemWrapper]}>
                <Image
                  source={item.image}
                  style={styles.mainCarouselFlatListItemImage}
                />
              </View>
            )}
            // decelerationRate={0}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            style={styles.mainCarouselFlatList}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
          />
        </View>

        {/* Pagination indicators */}
        <View style={[styles.paginationIndicatorsWrapper]}>
          {HomeMainSliderData.map((_, index) => (
            <Pagination
              key={index}
              translationX={translationX}
              index={index}
              currentIndex={currentIndex}
              paginationIndicatorSize={
                STANDARD_HOME_MAIN_CAROUSEL_PAGINATION_INDICATOR_WIDTH
              }
            />
          ))}
        </View>

        {/* Categories */}
        <>
          <View style={styles.sectionTitleAndLinkWrapper}>
            <Text
              style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
              Categories
            </Text>
            <Link
              label="See all"
              labelColor={theme.accent}
              onPress={() => props.navigation.navigate('CategoryList')}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.horizontalScrollView}>
            {/* Mapping categories data */}
            {Categories.map((item, index) => (
              <HomeCategoriesItemCard
                key={index}
                cardBorderColor={index === 0 ? theme.accent : theme.secondary}
                cardBackgroundColor={index === 0 ? theme.accent : theme.primary}
                onPress={() => props.navigation.navigate({name: 'ProductList', 
                                                          params: {category: item.label}})}
                imageBackgroundColor={
                  index === 0 ? theme.primary : theme.secondary
                }
                categoryImage={item.image}
                categoryLabel={item.label}
                categoryLabelColor={
                  index === 0 ? theme.primary : theme.textHighContrast
                }
              />
            ))}
          </ScrollView>
        </>

        {/* Most popular */}
         <>
          <View style={styles.sectionTitleAndLinkWrapper}>
            <Text
              style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
              Most popular
            </Text>
            <Link
              label="See all"
              labelColor={theme.accent}
              onPress={() => props.navigation.navigate({name: 'ProductList', params: {category: 'bestSeller'}})}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.horizontalScrollView}>
            {[...products].sort((a,b) => b.sold- a.sold).map((item, index) => (
              <View key={index} style={styles.itemWrapper}>
                <GridViewItemCard
                  cardBackgroundColor={theme.secondary}
                  heartIconColor={theme.textHighContrast}
                  heartIconBackgroundColor={theme.primary}
                  itemImage={item.image}
                  itemName={item.name}
                  itemNameColor={theme.textHighContrast}
                  discountedPrice={item.price}
                  discountedPriceColor={theme.textHighContrast}
                  onPress={() => props.navigation.navigate({name: 'ProductDetail', params: {id: item.id, category: 'bestSeller'}})}
                />
              </View>
            ))}
          </ScrollView>
        </> 
      </ScrollView>
    </View>

    )
}

const Pagination = ({translationX, index, paginationIndicatorSize}) => {
  // Declaring input range to avoid its duplication
  const inputRange = [
    (index - 1) * (SCREEN_WIDTH - scale(30)),
    index * (SCREEN_WIDTH - scale(30)),
    (index + 1) * (SCREEN_WIDTH - scale(30)),
  ];

  // Defining pagination indicator animated styles using useAnimatedStyle hook
  const paginationIndicatorAnimatedStyles = useAnimatedStyle(() => {
    // Background color
    const backgroundColor = interpolateColor(translationX.value, inputRange, [
      '#F6F5F6',
      '#FB8500',
      '#F6F5F6',
    ]);

    // Width
    const width = interpolate(
      translationX.value,
      inputRange,
      [
        paginationIndicatorSize,
        paginationIndicatorSize * 2,
        paginationIndicatorSize,
      ],
      Extrapolate.CLAMP,
    );

    // Returning
    return {
      backgroundColor,
      width,
    };
  });

  // Returning
  return (
    <Animated.View
      style={[styles.paginationIndicator, paginationIndicatorAnimatedStyles]}
    />
  );
};


export default Home

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  mainScrollView: {
    paddingBottom: STANDARD_SPACING * 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: STANDARD_SPACING * 3,
    marginTop: STANDARD_SPACING * 3,
  },
  avatarWrapper: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  avatarImage: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.9,
    height: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.9,
  },
  welcomeLabel: {
    
    fontSize: FONT_SIZE_XL,
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: STANDARD_SPACING * 3,
  },
  searchbarTextInput: {
    width: SCREEN_WIDTH * 0.75,
    height: STANDARD_TEXT_INPUT_HEIGHT,
    borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.2,
    paddingLeft: STANDARD_SPACING * 3,
  },
  mainCarouselFlatListWrapper: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
    alignSelf: 'center',
    position: 'relative',
  },
  mainCarouselFlatList: {
    flex: STANDARD_FLEX,
  },
  mainCarouselFlatListItemWrapper: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  },
  mainCarouselFlatListItemImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  paginationIndicatorsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: scale(15),
  },
  paginationIndicator: {
    height: scale(6),
    marginHorizontal: STANDARD_SPACING,
    borderRadius: STANDARD_BORDER_RADIUS,
  },
  bannerWrapper: {
    width: '100%',
    height: STANDARD_BANNER_WRAPPER_HEIGHT,
  },
  bannerImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    marginHorizontal: STANDARD_SPACING * 3,
  },
  sectionTitleAndLinkWrapper: {
    margin: STANDARD_SPACING * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleWrapper: {
    margin: STANDARD_SPACING * 3,
  },
  sectionTitle: {
    fontSize: FONT_SIZE_MD,
  },
  horizontalScrollView: {
    marginHorizontal: STANDARD_SPACING * 1.5,
  },
  itemWrapper: {
    width: scale(160),
    marginHorizontal: scale(7.5),
  },
})