import {View, Text, Image} from 'react-native';
import styles from './styles';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';

// Functional component
const index = ({
  backgroundColor,
  restaurantImage,
  mapPinIconColor,
  distance,
  distanceColor,
  restaurantName,
  restaurantNameColor,
  starIconColor,
  rating,
  ratingColor,
  ratingCount,
  ratingCountColor,
  priceRangeLabelColor,
  priceRange,
  priceRangeColor,
}) => {
  return (
    <View key={index} style={[styles.restaurantWrapper, {backgroundColor}]}>
      <View style={styles.restaurantImageWrapper}>
        <Image source={restaurantImage} style={styles.restaurantImage} />
        <View style={styles.restaurantDistanceWrapper}>
          <FeatherIcons
            name="map-pin"
            size={scale(16)}
            color={mapPinIconColor}
          />

          <Text style={[styles.restaurantDistance, {color: distanceColor}]}>
            {distance}
          </Text>
        </View>
      </View>

      <View style={styles.restaurantInfoWrapper}>
        <Text
          numberOfLines={1}
          style={[styles.restaurantName, {color: restaurantNameColor}]}>
          {restaurantName}
        </Text>
        <View style={styles.restaurantRatingWrapper}>
          <FeatherIcons name="star" size={scale(16)} color={starIconColor} />

          <Text style={[styles.restaurantRating, {color: ratingColor}]}>
            {rating}
          </Text>
          <Text
            style={[styles.restaurantRatingCount, {color: ratingCountColor}]}>
            ({ratingCount})
          </Text>
        </View>
        <View style={styles.restaurantPriceRangeWrapper}>
          <Text
            style={[
              styles.restaurantPriceRangeLabel,
              {color: priceRangeLabelColor},
            ]}>
            Price range:
          </Text>
          <Text style={[styles.restaurantPriceRange, {color: priceRangeColor}]}>
            {priceRange}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Exporting
export default index;
