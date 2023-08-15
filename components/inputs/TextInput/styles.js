import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_XS,
  STANDARD_TEXT_INPUT_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  label: {
    marginBottom: scale(7.5),
    fontSize: FONT_SIZE_XS,
  },
  textInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    height: STANDARD_TEXT_INPUT_HEIGHT,
    borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.2,
  },
  textInput: {
    flex: 1,
    fontSize: FONT_SIZE_XS,
    paddingLeft: STANDARD_TEXT_INPUT_HEIGHT,
  },
  textInputIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    
    width: STANDARD_TEXT_INPUT_HEIGHT,
    height: STANDARD_TEXT_INPUT_HEIGHT,
  },
  textInputIconWrapperWithRightZero: {
    right: 0,
  },
  errorText: {
    fontSize: FONT_SIZE_XS * 0.8,
    alignSelf: 'flex-start',
  }
});
