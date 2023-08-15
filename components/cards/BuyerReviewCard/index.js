import {memo} from 'react';
import {View, Text, Image} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {IndependentColors} from '../../../config/Colors';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const BuyerReviewCard = ({
  buyerImage,
  buyerName,
  buyerNameTextColor,
  reviewAge,
  reviewAgeTextColor,
  rating,
  review,
  reviewTextColor,
  reviewCardBackgroundColor,
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
            color={IndependentColors.yellow}
            size={STANDARD_VECTOR_ICON_SIZE * 0.65}
          />
        </View>,
      );
    }

    // Returning
    return stars;
  };

  // Returning
  return (
    <View
      style={[
        styles.buyerReviewCard,
        {backgroundColor: reviewCardBackgroundColor},
      ]}>
      <View style={styles.buyerReviewCardHeader}>
        <View style={styles.buyerImageNameWrapper}>
          <View style={[styles.buyerImageWrapper]}>
            <Image style={styles.buyerImage} source={buyerImage} />
          </View>
          <View style={styles.buyerNameAndReviewAgeWrapper}>
            <Text style={[styles.buyerName, {color: buyerNameTextColor}]}>
              {buyerName}
            </Text>
            <Text style={[styles.reviewAge, {color: reviewAgeTextColor}]}>
              ({reviewAge})
            </Text>
          </View>
        </View>
        <View style={styles.ratingStarsWrapper}>
          {/* Displaying rating stars */}
          {getRatingStars(rating)}
        </View>
      </View>
      <Text style={[styles.review, {color: reviewTextColor}]}>{review}</Text>
    </View>
  );
};

// Exporting
export default memo(BuyerReviewCard);
