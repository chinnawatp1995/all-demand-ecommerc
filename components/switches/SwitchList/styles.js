import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {

  FONT_SIZE_XS,
  FONT_SIZE_XXS,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  switchList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(15),
    borderBottomWidth: scale(1),
  },
  titleAndSubtitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE_XS,
  },
  subTitle: {
    fontSize: FONT_SIZE_XXS,
  },
  switchSize: {
    transform: [{scaleX: scale(0.8)}, {scaleY: scale(0.8)}],
  },
});
