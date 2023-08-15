import {memo} from 'react';
import {View, Text, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {IndependentColors} from '../../../config/Colors';
import {
  SCREEN_WIDTH,
  STANDARD_NOTIFICATION_CARD_HEIGHT,
  STANDARD_SPACING,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
} from '../../../config/Constants';
import styles from './styles';

// Functional component
function NotificationItemCard({
  id,
  avatar,
  title,
  age,
  message,
  cardBackgroundColor,
  avatarBackgroundColor,
  titleColor,
  ageColor,
  messageColor,
  removeNotification,
}) {
  // Declaring constants
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

  // Declaring shared value
  const translationX = useSharedValue(0);
  const cardHeight = useSharedValue(STANDARD_NOTIFICATION_CARD_HEIGHT);
  const carMarginTop = useSharedValue(STANDARD_SPACING * 3);
  const carMarginHorizontal = useSharedValue(STANDARD_SPACING * 3);
  const cardPadding = useSharedValue(STANDARD_SPACING * 3);
  const avatarImageWrapperSize = useSharedValue(
    STANDARD_USER_AVATAR_WRAPPER_SIZE,
  );

  // Handling gesture event
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      // Updating shared value
      translationX.value = event.translationX;
    },
    onFinish: () => {
      // Comparing and getting boolean value as result
      const shouldBeDismissed = translationX.value < TRANSLATE_X_THRESHOLD;

      // Checking
      if (shouldBeDismissed) {
        // Updating shared value
        translationX.value = -SCREEN_WIDTH;
        cardHeight.value = withTiming(0);
        carMarginTop.value = withTiming(0);
        carMarginHorizontal.value = withTiming(0);
        cardPadding.value = withTiming(0);
        avatarImageWrapperSize.value = withTiming(0);
        removeNotification(id);
      } else {
        // Updating shared value
        translationX.value = withSpring(0);
      }
    },
  });

  // Declaring input range to avoid its duplication
  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];

  // Defining notification item card animated styles using useAnimatedStyle hook
  const cardAnimatedStyles = useAnimatedStyle(() => {
    // Returning
    return {
      height: cardHeight.value,
      borderRadius: cardHeight.value * 0.2,
      marginTop: carMarginTop.value,
      marginHorizontal: carMarginHorizontal.value,
      padding: cardPadding.value,
      transform: [
        {
          translateX: translationX.value,
        },
      ],
      opacity: interpolate(
        translationX.value,
        inputRange,
        [-0.75, 1, 1],
        Extrapolate.CLAMP,
      ),
      backgroundColor: interpolateColor(translationX.value, inputRange, [
        IndependentColors.red,
        cardBackgroundColor,
        cardBackgroundColor,
      ]),
    };
  });

  // Defining avatar image wrapper animated styles using useAnimatedStyle hook
  const avatarImageWrapperAnimatedStyles = useAnimatedStyle(() => {
    // Returning
    return {
      width: avatarImageWrapperSize.value,
      borderRadius: avatarImageWrapperSize.value * 0.5,
    };
  });

  // Returning
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.card, cardAnimatedStyles]}>
        <View style={styles.cardContentWrapper}>
          <View>
            <Animated.View
              style={[
                styles.avatarImageWrapper,
                avatarImageWrapperAnimatedStyles,
                {backgroundColor: avatarBackgroundColor},
              ]}>
              <Image style={styles.avatarImage} source={avatar} />
            </Animated.View>
          </View>

          <View style={styles.notificationDetailsWrapper}>
            <View style={styles.titleAndAgeWrapper}>
              <Text style={[styles.title, {color: titleColor}]}>{title}</Text>

              <Text style={[styles.age, {color: ageColor}]}>{age}</Text>
            </View>
            <Text
              style={[styles.message, {color: messageColor}]}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {message}
            </Text>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

// Exporting
export default memo(NotificationItemCard);
