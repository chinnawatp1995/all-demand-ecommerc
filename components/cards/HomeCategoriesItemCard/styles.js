import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_XS,
  STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH,
  STANDARD_SPACING,
  STANDARD_FLEX,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  categoryWrapper: {
    width: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH,
    height: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 1.5,
    borderWidth: scale(1),
    borderRadius: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: STANDARD_SPACING * 1.5,
  },
  categoryImageWrapper: {
    width: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 0.6,
    aspectRatio: 1,
    borderRadius:
      (STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 0.6) / 2,
    padding: STANDARD_SPACING * 2,
  },
  categoryImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: FONT_SIZE_XS,
  },
});
