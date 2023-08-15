import {View, Text, Pressable, Image} from 'react-native';
import styles from './styles';
import categoryMapSVG from '../../../util/categoryMapSVG';

// Functional component
const HomeCategoriesItemCard = ({
  cardBorderColor,
  cardBackgroundColor,
  onPress,
  imageBackgroundColor,
  categoryImage,
  categoryLabelColor,
  categoryLabel,
}) => {
  return (
    <Pressable
      style={[
        styles.categoryWrapper,
        {
          borderColor: cardBorderColor,
          backgroundColor: cardBackgroundColor,
        },
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.categoryImageWrapper,
          {backgroundColor: imageBackgroundColor},
        ]}>

        {categoryMapSVG(categoryImage)}
        
      </View>

      <Text
        numberOfLines={1}
        style={[styles.categoryLabel, {color: categoryLabelColor}]}>
        {categoryLabel}
      </Text>
    </Pressable>
  );
};

// Exporting
export default HomeCategoriesItemCard;
