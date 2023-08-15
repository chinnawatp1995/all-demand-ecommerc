import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT,
  STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
  STANDARD_FLEX,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  card: {
    justifyContent: 'center',
    padding: scale(15),
    position: 'relative',
    minHeight: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT * 0.1,
  },
  squareButtonComponentWrapper: {
    position: 'absolute',
    left: scale(15),
    top: scale(15),
  },
  itemImageWrapper: {
    alignSelf: 'center',
    marginBottom: scale(15),
    width: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE - scale(15),
    aspectRatio: 1,
  },
  itemImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  itemName: {
    marginBottom: scale(7.5),
    fontSize: FONT_SIZE_SM,
  },
  itemOriginalPrice: {
    fontSize: FONT_SIZE_XS,
    textDecorationLine: 'line-through',
  },
  itemDiscountedPrice: {
    marginLeft: scale(5),
    fontSize: FONT_SIZE_MD,
  },
  ratingWrapper: {
    marginBottom: scale(7.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStarsWrapper: {
    flexDirection: 'row',
  },
  rating: {
    marginHorizontal: scale(5),
    fontSize: FONT_SIZE_XS,
  },
  ratingCount: {
    fontSize: FONT_SIZE_XS,
  },
  itemPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
