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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTypeIconWrapper: {
    width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE / 2,
  },
  addressTypeLabel: {
    fontSize: FONT_SIZE_XS,
    marginLeft: scale(7.5),
  },
  addresseeWrapper: {
    marginTop: scale(5),
  },
  addresseeNameAndPhoneNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addresseeName: {
    fontSize: FONT_SIZE_XS,
  },
  addresseePhoneNumber: {
    fontSize: FONT_SIZE_XS,
  },
  address: {
    fontSize: FONT_SIZE_XS,
    marginTop: scale(15),
  },
});
