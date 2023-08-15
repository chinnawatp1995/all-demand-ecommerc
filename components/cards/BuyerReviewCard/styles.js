import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_CARD_MIN_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  buyerReviewCard: {
    padding: scale(15),
    minHeight: STANDARD_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_CARD_MIN_HEIGHT * 0.2,
    justifyContent: 'space-between',
  },
  buyerReviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buyerImageNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyerImageWrapper: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
  },
  buyerImage: {
    width: null,
    height: null,
    resizeMode: 'contain',
    flex: 1,
  },
  buyerNameAndReviewAgeWrapper: {
    marginLeft: scale(15),
  },
  buyerName: {
    fontSize: FONT_SIZE_XS,
  },
  reviewAge: {
    fontSize: FONT_SIZE_XXS,
  },
  ratingStarsWrapper: {
    flexDirection: 'row',
  },
  review: {
    marginTop: scale(7.5),
    fontSize: FONT_SIZE_XS,
  },
});
