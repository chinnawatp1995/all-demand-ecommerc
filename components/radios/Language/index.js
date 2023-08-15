import {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';

// Functional component
function Language({
  index,
  backgroundColor,
  flag,
  label,
  labelColor,
  uncheckedRadioBackgroundColor,
  checkedRadioBackgroundColor,
  checkIconColor,
  isSelected,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.radioWrapper,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={() => onPress(index)}>
      <View style={styles.flagImageAndLanguageLabelWrapper}>
        <Image style={[styles.flagImage]} source={flag} />
        <Text style={[styles.languageLabel, {color: labelColor}]}>{label}</Text>
      </View>
      <View
        style={[
          styles.radioCheckBox,
          {
            backgroundColor: isSelected
              ? checkedRadioBackgroundColor
              : uncheckedRadioBackgroundColor,
          },
        ]}>
        {isSelected && (
          <FeatherIcons
            color={checkIconColor}
            name={'check'}
            size={scale(10)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

// Exporting
export default memo(Language);
