import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  STANDARD_CATEGORY_IMAGE_WRAPPER_SIZE,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  itemImageLabelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageWrapper: {
    width: STANDARD_CATEGORY_IMAGE_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_CATEGORY_IMAGE_WRAPPER_SIZE * 0.5,
    padding: scale(15),
  },
  itemImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'contain',
  },
  label: {
    marginVertical: scale(5),
    fontSize: FONT_SIZE_SM,
  },
});
