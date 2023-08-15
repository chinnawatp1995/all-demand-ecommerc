import {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';

// Functional component
const HorizontalDivider = ({
  leftLineColors,
  label,
  labelColor,
  rightLineColors,
}) => {
  return (
    <View style={styles.dividerWrapper}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={leftLineColors}
        style={[styles.dividerLine, styles.dividerLineLeft]}
      />
      <Text style={[styles.dividerLabel, {color: labelColor}]}>{label}</Text>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={rightLineColors}
        style={[styles.dividerLineRight, styles.dividerLine]}
      />
    </View>
  );
};

// Exporting
export default memo(HorizontalDivider);
