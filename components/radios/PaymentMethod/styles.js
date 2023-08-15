import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  STANDARD_PAYMENT_METHOD_RADIO_WRAPPER_HEIGHT,
  STANDARD_PAYMENT_METHOD_RADIO_CHECKBOX_SIZE,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    height: STANDARD_PAYMENT_METHOD_RADIO_WRAPPER_HEIGHT,
    borderRadius: STANDARD_PAYMENT_METHOD_RADIO_WRAPPER_HEIGHT * 0.2,
  },
  paymentMethodLabel: {

    fontSize: FONT_SIZE_SM,
  },
  paymentMethodIconAndCheckboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCheckBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(10),
    width: STANDARD_PAYMENT_METHOD_RADIO_CHECKBOX_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_PAYMENT_METHOD_RADIO_CHECKBOX_SIZE * 0.5,
  },
});
