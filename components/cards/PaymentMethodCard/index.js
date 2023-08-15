import {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const PaymentMethodCard = ({
  type,
  onPress,
  cardBorderColor,
  cardBackgroundColor,
  paymentTypeIconBackgroundColor,
  paymentTypeIconName,
  paymentTypeIconColor,
  paymentType,
  paymentTypeColor,
  checkCircleColor,
  payeeName,
  payeeNameColor,
  payeeCardNumber,
  payeeCardNumberColor,
  footerMessage,
  footerMessageColor,
  selected,
}) => {
  // Returning
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {borderColor: cardBorderColor, backgroundColor: cardBackgroundColor},
      ]}
      onPress={() => onPress(type)}>
      <View style={styles.header}>
        <View style={styles.paymentType}>
          <View
            style={[
              styles.paymentTypeIconWrapper,
              {backgroundColor: paymentTypeIconBackgroundColor},
            ]}>
            <FeatherIcons
              name={paymentTypeIconName}
              size={STANDARD_VECTOR_ICON_SIZE}
              color={paymentTypeIconColor}
            />
          </View>
          <Text style={[styles.paymentTypeLabel, {color: paymentTypeColor}]}>
            {paymentType} {selected ? '(Default)' : null}
          </Text>
        </View>

        {selected && (
          <FeatherIcons
            name="check-circle"
            size={STANDARD_VECTOR_ICON_SIZE}
            color={checkCircleColor}
          />
        )}
      </View>

      <View style={[styles.payeeWrapper]}>
        <View style={[styles.payeeNameAndCardNumberWrapper]}>
          <Text style={[styles.payeeName, {color: payeeNameColor}]}>
            {payeeName} -{' '}
          </Text>
          <Text style={[styles.payeeCardNumber, {color: payeeCardNumberColor}]}>
            {payeeCardNumber}
          </Text>
        </View>

        <Text style={[styles.footerMessage, {color: footerMessageColor}]}>
          {footerMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(PaymentMethodCard);
