import {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import categoryMapSVG from '../../../util/categoryMapSVG';

// Functional component
const CategoryItemCard = ({
  image,
  label,
  labelColor,
  backgroundColor,
  onPress,
}) => {


  return (
    <View style={styles.itemImageLabelWrapper}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.itemImageWrapper,
          {
            backgroundColor: backgroundColor,
          },
        ]}>
        {categoryMapSVG(image)}
      </TouchableOpacity>
      {/* Label */}
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </View>
  );
};

// Exporting
export default memo(CategoryItemCard);
