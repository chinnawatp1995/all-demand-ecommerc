import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_XS,
  STANDARD_ORDERED_ITEM_CARD_MIN_HEIGHT,
  STANDARD_SPACING,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  card: {
    padding: STANDARD_SPACING * 3,
    borderRadius: scale(15),
    minHeight: STANDARD_ORDERED_ITEM_CARD_MIN_HEIGHT,
    borderWidth: scale(1),
    justifyContent: 'space-between',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardRowLabel: {
    fontSize: FONT_SIZE_XS,
  },
  cardRowValue: {
    fontSize: FONT_SIZE_XS,
  },
  statusIcon: {
    marginLeft: STANDARD_SPACING,
  },
  invoiceIcon: {
    marginRight: STANDARD_SPACING,
  },
});
