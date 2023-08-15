import {memo} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from 'react-native-size-matters';
import ButtonCircled from '../../buttons/ButtonCircled';
import FetherIcons from 'react-native-vector-icons/Feather';

// Functional component
const PolicyCard = ({
  backgroundColor,
  title,
  titleColor,
  shortText,
  shortTextColor,
  buttonBackgroundColor,
  onPress,
  linearGradientColorsArray,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, {backgroundColor: backgroundColor}]}>
        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={8}
          style={[styles.shortText, {color: shortTextColor}]}>
          {shortText}
        </Text>
      </View>

      <LinearGradient
        colors={linearGradientColorsArray}
        style={styles.linearGradient}>
        <View style={styles.circledButtonComponentWrapper}>
          <ButtonCircled
            height={40}
            icon={
              <FetherIcons name="arrow-right" color="white" size={scale(15)} />
            }
            backgroundColor={buttonBackgroundColor}
            onPress={onPress}
          />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

// Exporting
export default memo(PolicyCard);
