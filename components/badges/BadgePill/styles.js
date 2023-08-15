import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_XXS,
  STANDARD_BADGE_PILL_WIDTH,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  badge: {
    width: STANDARD_BADGE_PILL_WIDTH,
    maxWidth: STANDARD_BADGE_PILL_WIDTH * 2,
    height: STANDARD_BADGE_PILL_WIDTH / 4,
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: FONT_SIZE_XXS,
  },
});
