import {memo, useContext} from 'react';
import {View, Text} from 'react-native';
import {IndependentColors} from '../../../config/Colors';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../../theming/ThemeContext';
import {STANDARD_VECTOR_ICON_SIZE} from '../../../config/Constants';
import styles from './styles';

// Functional component
const OverallRatingCard = ({
  cardBackgroundColor,
  earnedRatingValue,
  earnedRatingValueColor,
  earnedRatingCount,
  earnedRatingCountColor,
  earnedRatingStarsStatsData,
  progressBarBackgroundColor,
}) => {
  // Using context
  const {isLightTheme, lightTheme, darkTheme} = useContext(ThemeContext);

  // Storing theme config according to the theme mode
  const theme = isLightTheme ? lightTheme : darkTheme;

  // Getting rating stars
  const getRatingStars = count => {
    // Declaring an empty array
    const stars = [];

    // Comparing
    count = count > 5 ? 5 : count;

    // Iterating
    for (let index = 0; index < Math.round(count); index++) {
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

  // Getting rating stars status
  const getRatingStarsStats = data => {
    // Declaring an empty array
    const status = [];

    // Iterating
    data.map((item, index) =>
      // Pushing into array
      status.push(
        <View key={item.id} style={styles.earnedRatingStarsStats}>
          <Text
            style={[
              styles.earnedRatingStarsStatsLabel,
              {color: theme.textLowContrast},
            ]}>
            {item.label}
          </Text>
          <View
            style={[
              styles.progressBar,
              {backgroundColor: progressBarBackgroundColor},
            ]}>
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: item.progress_bar_color,
                  width: `${item.rating_percentage}%`,
                },
              ]}
            />
          </View>
        </View>,
      ),
    );

    // Returning
    return status;
  };

  // Returning
  return (
    <View
      style={[
        styles.overallRatingWrapper,
        {backgroundColor: cardBackgroundColor},
      ]}>
      <View style={styles.overallRatingContentWrapper}>
        <View>
          <View style={styles.overallRatingValueWrapper}>
            <Text
              style={[
                styles.overallRatingValue,
                {color: earnedRatingValueColor},
              ]}>
              {earnedRatingValue}
            </Text>
            <Text style={[styles.slash, {color: earnedRatingValueColor}]}>
              /
            </Text>
            <Text
              style={[
                styles.totalRatingValue,
                {color: earnedRatingValueColor},
              ]}>
              {earnedRatingStarsStatsData.length}
            </Text>
          </View>
          <Text
            style={[styles.totalRatingCount, {color: earnedRatingCountColor}]}>
            {earnedRatingCount} ratings
          </Text>
          <View style={styles.totalRatingStarsWrapper}>
            {/* Displaying rating stars */}
            {getRatingStars(earnedRatingValue)}
          </View>
        </View>
      </View>
      <View style={styles.earnedRatingStarsStatsWrapper}>
        {/* Displaying rating stars progress stats */}
        {getRatingStarsStats(earnedRatingStarsStatsData)}
      </View>
    </View>
  );
};

// Exporting
export default memo(OverallRatingCard);
