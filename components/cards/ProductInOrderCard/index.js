import {memo} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {IndependentColors} from '../../../config/Colors';
import Plus from '../../../assets/icons/svg/Plus.svg';
import Minus from '../../../assets/icons/svg/Minus.svg';
import Trash from '../../../assets/icons/svg/Trash.svg';
import BadgePill from '../../badges/BadgePill';
import ButtonSquared from '../../buttons/ButtonSquared';
import ButtonCircled from '../../buttons/ButtonCircled';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const ProductInOrderCard = ({
  onCardPress,
  cardBackgroundColor,
  itemImageBackgroundColor,
  itemImage,
  itemName,
  itemNameColor,
  itemPrice,
  itemPriceColor,
  itemQuantity,
  itemQuantityColor,
  itemType,
}) => {
  // Returning
  return (
    <Pressable
      style={[styles.card, {backgroundColor: cardBackgroundColor}]}
      onPress={onCardPress}>
      {/* Item image wrapper */}
      <View
        style={[
          styles.itemImageWrapper,
          {backgroundColor: itemImageBackgroundColor},
        ]}>
        

        {/* Itemm image */}
        <Image source={itemImage} style={styles.itemImage} />
      </View>

      <View style={styles.itemDetailsWrapper}>
        <View>
          {/* Item name */}
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.itemName, {color: itemNameColor}]}>
            {itemName}
          </Text>

          {/* Badge */}
        </View>

        <View style={styles.itemPriceQuantityWrapper}>
          {/* Item price */}
          <Text style={[styles.itemPrice, {color: itemPriceColor}]}>
            {itemPrice} บาท
          </Text>

          <View style={styles.itemQuantityIncreaseDecreaseButtonWrapper}>

            {/* Quantity */}
            <Text style={[styles.quantity, {color: itemQuantityColor}]}>
              จำนวน {itemQuantity}  
            </Text>

          </View>
        </View>
      </View>
    </Pressable>
  );
};

// Exporting
export default ProductInOrderCard;
