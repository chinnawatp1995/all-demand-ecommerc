import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  OPEN_SANS_MEDIUM,
  FONT_SIZE_XXS,
  OPEN_SANS_BOLD,
  STANDARD_POLICIES_ITEM_CARD_MIN_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  card: {
    padding: scale(15),
    borderRadius: scale(15),
    minHeight: STANDARD_POLICIES_ITEM_CARD_MIN_HEIGHT,
  },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  shortText: {
    marginTop: scale(10),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    padding: scale(15),
    borderRadius: scale(15),
  },
  circledButtonComponentWrapper: {
    position: 'absolute',
    bottom: scale(15),
    right: scale(15),
  },
});
