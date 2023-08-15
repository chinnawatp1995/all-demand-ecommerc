import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { useCallback, useContext, useState, useEffect, useRef} from 'react'
import {scale} from 'react-native-size-matters';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {LightThemeColors as theme, IndependentColors} from '../config/Colors';
import ButtonCircled from '../components/buttons/ButtonCircled';
import ButtonSquared from '../components/buttons/ButtonSquared';
import DoubleArrowLeft from '../assets/icons/svg/DoubleArrowLeft.svg';
import DoubleArrowRight from '../assets/icons/svg/DoubleArrowRight.svg';
import Plus from '../assets/icons/svg/Plus.svg';
import Minus from '../assets/icons/svg/Minus.svg';
import Button from '../components/buttons/Button';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';
import {SCREEN_WIDTH, 
        STANDARD_VECTOR_ICON_SIZE,
        FONT_SIZE_SM,
        FONT_SIZE_XS,
        FONT_SIZE_MD,
        FONT_SIZE_XXS,
        STANDARD_FLEX,
        STANDARD_SPACING,} from '../config/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart} from '../states/reducers/cartSlice';

const ProductDetail = (props) => {
  
  const dispatch = useDispatch();


  const products = useSelector(state => state.products);

  let filteredProducts = products;

  if(props.route.params && props.route?.params?.category !== 'bestSeller'){
    filteredProducts = products.filter(product => product.category === props.route.params.category);
  }else{
    filteredProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0,10);
  }

  const cart = useSelector(state => state.cart);

  // Declaring shared value
  const scrollX = useSharedValue(0);

  // Declaring current index of the slide
  const currentIndex = useRef(filteredProducts.findIndex(product => product.id === props.route.params.id));
  console.log('currentIndex', currentIndex.current);
  const [currentProduct, setCurrentProduct] = useState(currentIndex.current);
  
  // Defining reference for the Flatlist
  const flatListRef = useRef(null);
  
  // Local states
  const [isNextDisabled, setIsNextDisabled] = useState(
    filteredProducts.length === 1 ? true : false,
    );
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  
  // Handling scroll of the flat list
  const scrollHandler = useAnimatedScrollHandler(event => {
    // Storing scrolled offset value of the x direction
    scrollX.value = withSpring(event.contentOffset.x);
  });
  
    //
  // const onViewableItemsChanged = useCallback(({viewableItems}) => {
  //   if (viewableItems.length === 0) {
  //     return;
  //   }
  //   console.log('viewableItems : ', viewableItems);
  //   currentIndex.current = viewableItems[0].index;
  //   setCurrentProduct(currentIndex.current);
  // }, []);
  
  // // Declaring viewability config for the Flatlist
  // const viewabilityConfig = {
  //   itemVisiblePercentThreshold: 100,
  // };
  
  // // Declaring viewability config callback pairs for the Flatlist
  // const viewabilityConfigCallbackPairs = useRef([
  //   {viewabilityConfig, onViewableItemsChanged},
  // ]);
  
  // Handling previous slide
  const previousSlideHandler = () => {
    // Comparing    
    if (flatListRef.current) {
      setIsNextDisabled(false);
      // Scrolling to requested index
      currentIndex.current = currentIndex.current - 1;
      setCurrentProduct(currentIndex.current);
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current,
      });
    }

    if (currentIndex.current === 0) {
      setIsPrevDisabled(true);
    }
  };
  
  // Handling next slide
  const nextSlideHandler = () => {
    // Comparing
    if (flatListRef.current) {
      currentIndex.current = currentIndex.current + 1;
      setCurrentProduct(currentIndex.current);
      setIsPrevDisabled(false);
      // Scrolling to requested index
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex.current ,
      });
    }

    if (currentIndex.current === filteredProducts.length - 1) {
      setIsNextDisabled(true);
    }
  };

  useEffect(() => {
    if(flatListRef.current) { 
      flatListRef.current.scrollToIndex({
        animated: true,
        index: filteredProducts.findIndex(product => product.id === props.route.params.id),
      });
    }
    
    if(currentIndex.current === 0) {
      setIsPrevDisabled(true);
      if(filteredProducts.length === 1) {
        setIsNextDisabled(true);
      }else {
        setIsNextDisabled(false);
      }
    }else if(currentIndex.current === filteredProducts.length - 1) {
      setIsNextDisabled(true);
      setIsPrevDisabled(false);
    }else {
      setIsNextDisabled(false);
      setIsPrevDisabled(false);
    }
  }, [props.route.params.id])

  const onAddToCartHandler = () => {
    console.log('Add to cart');
    console.log(products[currentProduct]);
    dispatch(addToCart({uid: filteredProducts[currentProduct].id, productData: filteredProducts[currentProduct]}))
  }

  const onRemoveFromCartHandler = () => {
    console.log('Remove from cart');
    dispatch(removeFromCart({uid: filteredProducts[currentProduct].id, productData: filteredProducts[currentProduct]})) 
  }




return (
  <View style={styles.mainWrapper}>
    {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
      <View style={styles.carouselWrapper}>
        {/* Navigation controls */}
        <View
          style={[
            styles.leftNavigationControlWrapper,
            {
              transform: [{translateX: scale(15)}, {translateY: scale(-15)}],
              zIndex: 1,
            },
          ]}>
          <ButtonCircled
            height={scale(30)}
            icon={<DoubleArrowLeft width={scale(20)} height={scale(20)} />}
            backgroundColor={theme.primary}
            onPress={isPrevDisabled ? null : previousSlideHandler}
            opacity={isPrevDisabled ? 0.2 : 1}
          />
        </View>
        <View
          style={[
            styles.rightNavigationControlWrapper,
            {
              transform: [{translateX: scale(-15)}, {translateY: scale(-15)}],
              zIndex: 1,
            },
          ]}>
          <ButtonCircled
            height={scale(30)}
            icon={<DoubleArrowRight width={scale(20)} height={scale(20)} />}
            backgroundColor={theme.primary}
            onPress={isNextDisabled ? null : nextSlideHandler}
            opacity={isNextDisabled ? 0.2 : 1}
          />
        </View>

        {/* Animated flatlist */}
        <Animated.FlatList
          ref={flatListRef}
          data={filteredProducts}
          renderItem={({item, index}) => (
            <ProductSliderItem
              index={index}
              scrollX={scrollX}
              image={item.image}
              slideBgColor={item.slide_bg_color}
              itemImageBgColor={theme.primary}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.flatlist}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          // viewabilityConfigCallbackPairs={
          //   viewabilityConfigCallbackPairs.current
          // }
          scrollEnabled={true}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
        />
      </View>
    ) : null}

    <View
      style={[styles.itemDetailsWrapper, {backgroundColor: theme.primary}]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.itemTitleRatingWrapper}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.itemTitle, {color: theme.textHighContrast}]}>
            {filteredProducts[currentIndex.current].name}
          </Text>
          
          <ButtonCircled
            height={scale(30)}
            icon={
              <IonIcons
                name="heart-outline"
                size={STANDARD_VECTOR_ICON_SIZE}
                color={theme.textHighContrast}
              />
            }
            backgroundColor={theme.secondary}
          />
        </View>

     

      

        <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
          Price
        </Text>

        <View style={styles.itemPriceAndQunatityWrapper}>
          <View style={styles.itemPriceWrapper}>
            <Text
              style={[
                styles.itemDiscountedPrice,
                {color: theme.textHighContrast},
              ]}>
              {filteredProducts[currentIndex.current].price} บาท
            </Text>
          </View>

          <View style={styles.itemQuantityWrapper}>
            {/* Increase button */}
            <ButtonSquared
            onPress={onAddToCartHandler}
              height={32}
              icon={
                <Plus
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              
              }
              backgroundColor={theme.secondary}
            />

            {/* Quantity */}
            <Text
              style={[styles.itemQuantity, {color: theme.textHighContrast}]}>
              {cart.items.findIndex(item => item.uid === filteredProducts[currentIndex.current].id) !== -1 ? 
               cart.items[cart.items.findIndex(item => item.uid === filteredProducts[currentIndex.current].id)].quantity : 0}
            </Text>

            {/* Decrease button */}
            <ButtonSquared
              onPress={onRemoveFromCartHandler}
              height={32}
              icon={
                <Minus
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              }
              backgroundColor={theme.secondary}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, {color: theme.textHighContrast}]}>
          Description
        </Text>

        <Text
          style={[styles.itemDescription, {color: theme.textLowContrast}]}>
          {filteredProducts[currentIndex.current].detail}
        </Text>

        
      </ScrollView>
      
    </View>
    {/* Submit button */}
    <View style={styles.submitButtonComponentWrapper}>
      <Button
        label={'สั่งซื้อสินค้า'}
        labelColor={theme.primary}
        backgroundColor={theme.accent}
      />
    </View>

  </View>
  

);
}

// Functional component
const ProductSliderItem = ({
  index,
  scrollX,
  image,
  slideBgColor,
  itemImageBgColor,
}) => {
  // Defining
  const itemImageWrapperSize = SCREEN_WIDTH * 0.5;
  const itemImageSize = itemImageWrapperSize * 0.9;

  // Declaring input range to avoid its duplication
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];
  const scaleAndOpacityOutputRange = [0, 1, 0];

  // Defining item wrapper animated styles using useAnimatedStyle hook
  const itemImageWrapperAnimatedStyle = useAnimatedStyle(() => {
    // Scale
    const scale = interpolate(
      scrollX.value,
      inputRange,
      scaleAndOpacityOutputRange,
      Extrapolate.CLAMP,
    );

    // Opacity
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      scaleAndOpacityOutputRange,
      Extrapolate.CLAMP,
    );

    // Border radius
    const borderRadius = interpolate(
      scrollX.value,
      inputRange,
      [0, itemImageWrapperSize * 0.5, 0],
      Extrapolate.CLAMP,
    );

    // Returning animated styles
    return {
      transform: [
        {
          scale,
        },
      ],
      opacity,
      borderRadius,
    };
  });

  // Defining item image animated styles using useAnimatedStyle hook
  const itemImageAnimatedStyle = useAnimatedStyle(() => {
    // Translate Y
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
      Extrapolate.CLAMP,
    );

    // Opacity
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    // Returning animated styles
    return {
      transform: [
        {
          translateY,
        },
      ],
      opacity,
    };
  });

  // Returning
  return (
    <View
      style={[
        styles.carouselItemWrapper,
        {width: SCREEN_WIDTH, backgroundColor: slideBgColor},
      ]}>
      <Animated.View
        style={[
          styles.carouselItemImageWrapper,
          {
            width: itemImageWrapperSize,
            aspectRatio: 1,
            backgroundColor: itemImageBgColor,
          },
          itemImageWrapperAnimatedStyle,
        ]}>
        <Animated.Image
          style={[
            {
              flex: 1,
              width: itemImageSize,
              height: itemImageSize,
              resizeMode: 'contain',
            },
            itemImageAnimatedStyle,
          ]}
          source={image}
        />
      </Animated.View>
    </View>
  );
};

export default ProductDetail

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  carouselWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flatlist: {
    flex: STANDARD_FLEX,
  },
  carouselItemWrapper: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItemImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNavigationControlWrapper: {
    position: 'absolute',
    left: 0,
    top: '50%',
  },
  rightNavigationControlWrapper: {
    position: 'absolute',
    right: 0,
    top: '50%',
  },
  itemDetailsWrapper: {
    flex: STANDARD_FLEX,
  },
  itemTitleRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingTop: STANDARD_SPACING * 3,
  },
  itemTitle: {
    fontSize: FONT_SIZE_MD,
    flex: STANDARD_FLEX,
  },
  itemRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.75,
  },
  starIcon: {
    marginRight: STANDARD_SPACING,
  },
  rating: {
    fontSize: FONT_SIZE_SM,
  },
  ratingCount: {
    marginHorizontal: STANDARD_SPACING * 1.5,
    fontSize: FONT_SIZE_SM,
  },
  sectionTitle: {
    margin: STANDARD_SPACING * 3,
    fontSize: FONT_SIZE_SM,
  },
  badgePillComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
  },
  ingredientScrollViewContentContainer: {
    marginHorizontal: STANDARD_SPACING * 1.5,
  },
  ingredientWrapper: {
    borderRadius: STANDARD_SPACING * 2,
    marginHorizontal: STANDARD_SPACING * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(60),
    height: scale(75),
  },
  ingredientImage: {
    marginBottom: STANDARD_SPACING,
  },
  ingredientTitle: {
    fontSize: FONT_SIZE_XXS,
  },
  itemDescription: {
    paddingHorizontal: STANDARD_SPACING * 3,
    fontSize: FONT_SIZE_XS,
  },
  itemPriceAndQunatityWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemOriginalPrice: {
    fontSize: FONT_SIZE_XS,
    textDecorationLine: 'line-through',
  },
  itemDiscountedPrice: {
    marginLeft: STANDARD_SPACING * 1.5,
    fontSize: FONT_SIZE_MD,
  },
  itemQuantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  itemQuantity: {
    paddingHorizontal: STANDARD_SPACING * 1.5,
  },
  submitButtonComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    marginVertical: STANDARD_SPACING * 3,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
})