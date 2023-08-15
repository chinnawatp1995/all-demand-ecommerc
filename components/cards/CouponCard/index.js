import {memo} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';

// Functional component
const CouponCard = ({
  brandImage,
  brandName,
  brandNameColor,
  title,
  titleColor,
  validUpto,
  validUptoColor,
  backgroundColor,
}) => {
  // Returning
  return (
    <View style={[styles.card, {backgroundColor}]}>
      <View style={[styles.imageWrapper]}>
        <View style={[styles.brandImageWrapper, {backgroundColor: '#fff'}]}>
          <Image style={styles.brandImage} source={brandImage} />
        </View>
      </View>
      <View style={[styles.detailsBackgroundImageWrapper]}>
        <Image
          style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
          source={require('../../../assets/images/backgrounds/coupon.png')}
        />

        <View style={[styles.detailsWrapper]}>
          <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
          <Text style={[styles.brandName, {color: brandNameColor}]}>
            {brandName}
          </Text>
          <Text style={[styles.validUpto, {color: validUptoColor}]}>
            {validUpto}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Exporting
export default memo(CouponCard);
