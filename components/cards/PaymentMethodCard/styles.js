import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_XS,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  card: {
    borderWidth: scale(1),
    padding: scale(15),
    borderRadius: scale(15),
    marginTop: scale(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTypeIconWrapper: {
    width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE / 2,
  },
  paymentTypeLabel: {
    fontSize: FONT_SIZE_XS,
    marginLeft: scale(7.5),
  },
  payeeWrapper: {
    marginTop: scale(5),
  },
  payeeNameAndCardNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payeeName: {
    fontSize: FONT_SIZE_XS,
  },
  payeeCardNumber: {
    fontSize: FONT_SIZE_XS,
  },
  footerMessage: {
    fontSize: FONT_SIZE_XS,
    marginTop: scale(15),
  },
});
