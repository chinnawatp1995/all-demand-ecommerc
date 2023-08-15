import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_SIZE_XS} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieViewWrapper: {
    width: scale(150),
    aspectRatio: 1,
  },
  icon: {
    alignSelf: 'center',
  },
  message: {
    fontSize: FONT_SIZE_XS,
    textAlign: 'center',
    marginTop: scale(15),
    marginHorizontal: scale(15),
  },
});
