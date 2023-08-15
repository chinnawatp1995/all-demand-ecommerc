import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  STANDARD_LANGUAGE_FLAG_SIZE,
  STANDARD_LANGUAGE_RADIO_CHECKBOX_SIZE,
  STANDARD_LANGUAGE_RADIO_WRAPPER_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    height: STANDARD_LANGUAGE_RADIO_WRAPPER_HEIGHT,
    borderRadius: STANDARD_LANGUAGE_RADIO_WRAPPER_HEIGHT * 0.2,
  },
  flagImageAndLanguageLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagImage: {
    width: STANDARD_LANGUAGE_FLAG_SIZE,
    aspectRatio: 1,
  },
  languageLabel: {
    paddingLeft: scale(20),
    fontSize: FONT_SIZE_SM,
  },
  radioCheckBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_LANGUAGE_RADIO_CHECKBOX_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_LANGUAGE_RADIO_CHECKBOX_SIZE * 0.5,
  },
});
