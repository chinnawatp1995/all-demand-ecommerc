import {memo} from 'react';
import {Text} from 'react-native';
import styles from './styles';

// Functional component
const LargeHeading = ({headingText, headingColor, textAlign}) => {
  return (
    <Text style={[styles.style, {color: headingColor, textAlign: textAlign}]}>
      {headingText}
    </Text>
  );
};

// Exporting
export default memo(LargeHeading);
