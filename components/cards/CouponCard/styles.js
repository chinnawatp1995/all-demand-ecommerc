import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  STANDARD_COUPON_CARD_MIN_HEIGHT,
  STANDARD_COUPON_CARD_BRAND_IMAGE_WRAPPER_SIZE,
  STANDARD_SPACING,
  STANDARD_FLEX,
} from '../../../config/Constants';

// Creating stylesheets
export default StyleSheet.create({
  card: {
    position: 'relative',
    minHeight: STANDARD_COUPON_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_COUPON_CARD_MIN_HEIGHT * 0.1,
    shadowColor: '#6c757d',
    shadowOffset: {width: scale(0), height: scale(7.5)},
    shadowOpacity: 0.15,
    shadowRadius: scale(5),
    elevation: scale(7.5),
  },
  imageWrapper: {
    height: STANDARD_COUPON_CARD_MIN_HEIGHT * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandImageWrapper: {
    width: STANDARD_COUPON_CARD_BRAND_IMAGE_WRAPPER_SIZE,
    aspectRatio: 1,
    padding: STANDARD_SPACING,
    overflow: 'hidden',
    borderRadius: STANDARD_COUPON_CARD_BRAND_IMAGE_WRAPPER_SIZE * 0.5,
  },
  brandImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'cover',
  },
  detailsBackgroundImageWrapper: {
    height: STANDARD_COUPON_CARD_MIN_HEIGHT * 0.5,
    borderBottomLeftRadius: STANDARD_COUPON_CARD_MIN_HEIGHT * 0.1,
    borderBottomRightRadius: STANDARD_COUPON_CARD_MIN_HEIGHT * 0.1,
    overflow: 'hidden',
    position: 'relative',
  },
  detailsWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZE_SM,
  },
  brandName: {
    fontSize: FONT_SIZE_XXS,
    marginVertical: STANDARD_SPACING,
  },
  validUpto: {
    fontSize: FONT_SIZE_XS,
  },
});
