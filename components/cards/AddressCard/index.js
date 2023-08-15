import {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const AddressCard = ({
  onPress,
  cardBorderColor,
  cardBackgroundColor,
  addressTypeIconBackgroundColor,
  addressTypeIconName,
  addressTypeIconColor,
  addressType,
  addressTypeColor,
  checkCircleColor,
  addresseeName,
  addresseeNameColor,
  addresseePhoneNumber,
  addresseePhoneNumberColor,
  address,
  addressColor,
  selected=undefined,

}) => {
  // Returning
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {borderColor: cardBorderColor, backgroundColor: cardBackgroundColor},
      ]}
      onPress={onPress}>
        <View style={styles.header}>
          <View style={styles.addressType}>
            <View
              style={[
                styles.addressTypeIconWrapper,
                {backgroundColor: addressTypeIconBackgroundColor},
               ]}>
              {selected && (
                <FeatherIcons
                  name="check-circle"
                  size={STANDARD_VECTOR_ICON_SIZE}
                  color={checkCircleColor}
                />
               )}

               {selected === undefined && (
                <FeatherIcons
                  name={'home'}
                  size={STANDARD_VECTOR_ICON_SIZE}
                  color={addressTypeIconColor}
                />
                )}
          </View>
          <Text style={[styles.addressTypeLabel, {color: addressTypeColor}]}>
            
          </Text>
        </View>

        
      </View>

      <View style={[styles.addresseeWrapper]}>
        <View style={[styles.addresseeNameAndPhoneNumberWrapper]}>
          <Text style={[styles.addresseeName, {color: addresseeNameColor}]}>
            {addresseeName} 
          </Text>
          <Text
            style={[
              styles.addresseePhoneNumber,
              {color: addresseePhoneNumberColor},
            ]}>
            {addresseePhoneNumber}
          </Text>
        </View>

        <Text style={[styles.address, {color: addressColor}]}>{address}</Text>
      </View>
    
    </TouchableOpacity>
  );
};

// Exporting
export default memo(AddressCard);
