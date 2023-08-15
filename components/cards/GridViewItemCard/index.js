import {memo} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../../config/Colors';
import ButtonSquared from '../../buttons/ButtonSquared';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const GridViewItemCard = ({
  cardBackgroundColor,
  heartIconColor,
  heartIconBackgroundColor,
  itemImage,
  itemName,
  rating,
  ratingColor,
  ratingCount,
  ratingCountColor,
  itemNameColor,
  originalPrice,
  originalPriceColor,
  discountedPrice,
  discountedPriceColor,
  onPress,
}) => {
  // Getting rating stars
  const getRatingStars = count => {
    // Declaring an empty array
    const stars = [];

    // Iterating
    for (let index = 0; index < count; index++) {
      // Pushing into array
      stars.push(
        <View key={index}>
          <IonIcons
            name="star"
            size={STANDARD_VECTOR_ICON_SIZE * 0.65}
            color={IndependentColors.yellow}
          />
        </View>,
      );
    }

    // Returning
    return stars;
  };

  // Returning
  return (
    <Pressable
      style={[styles.card, {backgroundColor: cardBackgroundColor}]}
      onPress={onPress}>
      <View style={styles.squareButtonComponentWrapper}>
        <ButtonSquared
          height={scale(25)}
          icon={
            <IonIcons
              name="heart-outline"
              size={STANDARD_VECTOR_ICON_SIZE}
              color={heartIconColor}
            />
          }
          backgroundColor={heartIconBackgroundColor}
        />
      </View>
      <View style={styles.itemImageWrapper}>
        <Image source={itemImage} style={styles.itemImage} />
      </View>
      <View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={[styles.itemName, {color: itemNameColor}]}>
          {itemName}
        </Text>
        <View style={styles.ratingWrapper}>
          <View style={styles.ratingStarsWrapper}>
            {getRatingStars(parseInt(rating))}
          </View>
          <Text style={[styles.rating, {color: ratingColor}]}>{rating}</Text>
          <Text style={[styles.ratingCount, {color: ratingCountColor}]}>
            ({ratingCount})
          </Text>
        </View>
        <View style={styles.itemPriceWrapper}>
          <Text style={[styles.itemOriginalPrice, {color: originalPriceColor}]}>
            {originalPrice}
          </Text>
          <Text
            style={[styles.itemDiscountedPrice, {color: discountedPriceColor}]}>
            {discountedPrice}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

// Exporting
export default memo(GridViewItemCard);
