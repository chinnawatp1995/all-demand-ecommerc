import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_MD,
  STANDARD_BUTTON_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  label: {
    fontSize: FONT_SIZE_MD,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
    paddingHorizontal: scale(15),
  },
  disabledButton: {
    opacity: 0.5,
  }
});
