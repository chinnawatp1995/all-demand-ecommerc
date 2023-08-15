import {memo} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {IndependentColors} from '../../../config/Colors';
import Cart from '../../../assets/icons/svg/Cart.svg';
import Trash from '../../../assets/icons/svg/Trash.svg';
import BadgePill from '../../badges/BadgePill';
import ButtonSquared from '../../buttons/ButtonSquared';
import ButtonCircled from '../../buttons/ButtonCircled';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const WishlistItemCard = ({
  onCardPress,
  cardBackgroundColor,
  trashButtonBackgroundColor,
  itemImageBackgroundColor,
  itemImage,
  itemName,
  itemNameColor,
  itemOriginalPrice,
  itemOriginalPriceColor,
  itemDiscountedPrice,
  itemDiscountedPriceColor,
  rating,
  ratingCount,
  ratingStatus,
  ratingCountColor,
  actionButtonBackgroundColor,
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

          {/* Rating */}
          <View style={styles.ratingWrapper}>
            {ratingStatus === 'Excellent' ? (
              <BadgePill
                label={`${rating} out of 5`}
                labelColor={IndependentColors.green}
                backgroundColor={IndependentColors.greenLightest}
              />
            ) : ratingStatus === 'Good' ? (
              <BadgePill
                label={`${rating} out of 5`}
                labelColor={IndependentColors.yellow}
                backgroundColor={IndependentColors.yellowLightest}
              />
            ) : (
              <BadgePill
                label={`${rating} out of 5`}
                labelColor={IndependentColors.red}
                backgroundColor={IndependentColors.redLightest}
              />
            )}

            <IonIcons
              name="star"
              size={STANDARD_VECTOR_ICON_SIZE * 0.65}
              color={IndependentColors.yellow}
              style={styles.starIcon}
            />
            <Text style={[styles.ratingCount, {color: ratingCountColor}]}>
              ({ratingCount})
            </Text>
          </View>
        </View>

        <View style={styles.itemPriceAndCartButtonWrapper}>
          {/* Item price */}
          <View style={styles.itemPriceWrapper}>
            <Text
              style={[
                styles.itemOriginalPrice,
                {color: itemOriginalPriceColor},
              ]}>
              {itemOriginalPrice}
            </Text>
            <Text
              style={[
                styles.itemDiscountedPrice,
                {color: itemDiscountedPriceColor},
              ]}>
              {itemDiscountedPrice}
            </Text>
          </View>

          {/* Cart button */}
          <ButtonSquared
            height={32}
            icon={
              <Cart
                width={STANDARD_VECTOR_ICON_SIZE}
                height={STANDARD_VECTOR_ICON_SIZE}
              />
            }
            backgroundColor={actionButtonBackgroundColor}
          />
        </View>
      </View>
    </Pressable>
  );
};

// Exporting
export default memo(WishlistItemCard);
