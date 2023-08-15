import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE * 0.5,
  },
  label: {
    marginLeft: scale(10),
    textTransform: 'capitalize',
    fontSize: FONT_SIZE_SM,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
    borderWidth: scale(1),
    borderStyle: 'dashed',
  },
  buttonIconLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
