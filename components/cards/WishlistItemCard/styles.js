import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_CARD_MIN_HEIGHT,
  STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    minHeight: STANDARD_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_CARD_MIN_HEIGHT * 0.2,
  },
  itemImageWrapper: {
    marginTop: scale(20),
    marginHorizontal: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.2,
  },
  itemImage: {
    width: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.6,
    height: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.6,
    resizeMode: 'contain',
  },
  trashButtonWrapper: {
    position: 'absolute',
    transform: [
      {translateX: scale(0)},
      {translateY: -(STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.5)},
    ],
  },
  itemDetailsWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingRight: scale(15),
  },
  itemName: {
    marginBottom: scale(7.5),
    fontSize: FONT_SIZE_SM,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPriceAndCartButtonWrapper: {
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
    margin: scale(7.5),
    fontSize: FONT_SIZE_MD,
  },
  ratingCount: {
    fontSize: FONT_SIZE_XS,
  },
  starIcon: {
    marginHorizontal: scale(5),
  },
});
