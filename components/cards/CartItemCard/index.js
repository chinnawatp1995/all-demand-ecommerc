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
const CartItemCard = ({
  onCardPress,
  cardBackgroundColor,
  trashButtonBackgroundColor,
  itemImageBackgroundColor,
  itemImage,
  itemName,
  itemNameColor,
  itemPrice,
  itemPriceColor,
  itemQuantity,
  itemQuantityColor,
  itemType,
  actionButtonBackgroundColor,
  onPressIncreaseButton,
  onPressDecreaseButton,
  onPressThrashButton,
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
        {/* Trash button */}
        <View style={[styles.trashButtonWrapper]}>
          <ButtonCircled
            onPress={onPressThrashButton}
            height={32}
            icon={
              <Trash
                width={STANDARD_VECTOR_ICON_SIZE}
                height={STANDARD_VECTOR_ICON_SIZE}
              />
            }
            backgroundColor={trashButtonBackgroundColor}
          />
        </View>

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
          {itemType === 'Non veg' ? (
            <BadgePill
              label={'Non veg'}
              labelColor={IndependentColors.red}
              backgroundColor={IndependentColors.redLightest}
            />
          ) : (
            <BadgePill
              label={'Pure veg'}
              labelColor={IndependentColors.green}
              backgroundColor={IndependentColors.greenLightest}
            />
          )}
        </View>

        <View style={styles.itemPriceQuantityWrapper}>
          {/* Item price */}
          <Text style={[styles.itemPrice, {color: itemPriceColor}]}>
            {itemPrice}
          </Text>

          <View style={styles.itemQuantityIncreaseDecreaseButtonWrapper}>
            {/* Increase button */}
            <ButtonSquared
              onPress={onPressIncreaseButton}
              height={32}
              icon={
                <Plus
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              }
              backgroundColor={actionButtonBackgroundColor}
            />

            {/* Quantity */}
            <Text style={[styles.quantity, {color: itemQuantityColor}]}>
              {itemQuantity}
            </Text>

            {/* Decrease button */}
            <ButtonSquared
              onPress={onPressDecreaseButton}
              height={32}
              icon={
                <Minus
                  width={STANDARD_VECTOR_ICON_SIZE}
                  height={STANDARD_VECTOR_ICON_SIZE}
                />
              }
              backgroundColor={actionButtonBackgroundColor}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// Exporting
export default memo(CartItemCard);
