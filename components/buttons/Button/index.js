import {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

// Functional component
const Button = ({label, labelColor, backgroundColor, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: backgroundColor},
      disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      >
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(Button);
