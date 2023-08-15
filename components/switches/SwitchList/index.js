import {View, Text, Switch} from 'react-native';
import {memo} from 'react';
import styles from './styles';
import {IndependentColors} from '../../../config/Colors';

// Functional component
const SwitchList = ({
  title,
  titleColor,
  subTitle,
  subTitleColor,
  trackActiveColor,
  trackInactiveColor,
  thumbActiveColor,
  thumbInactiveColor,
  onValueChange,
  value,
  borderBottomColor,
}) => {
  // Returning
  return (
    <View style={[styles.switchList, {borderBottomColor}]}>
      {/* Title and sub-title */}
      <View style={[styles.titleAndSubtitleWrapper]}>
        <View>
          <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
          <Text style={[styles.subTitle, {color: subTitleColor}]}>
            {subTitle}
          </Text>
        </View>
      </View>

      <Switch
        trackColor={{
          false: trackInactiveColor,
          true: trackActiveColor,
        }}
        thumbColor={value ? thumbActiveColor : thumbInactiveColor}
        onValueChange={onValueChange}
        value={value}
        ios_backgroundColor={IndependentColors.grey}
        style={styles.switchSize}
      />
    </View>
  );
};

// Exporting
export default memo(SwitchList);
