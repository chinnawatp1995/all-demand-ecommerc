import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationDetailsWrapper: {
    flex: 1,
    paddingLeft: scale(10),
  },
  avatarImageWrapper: {
    aspectRatio: 1,
  },
  avatarImage: {
    width: null,
    height: null,
    resizeMode: 'contain',
    flex: 1,
  },
  titleAndAgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: scale(5),
    fontSize: FONT_SIZE_SM,
  },
  age: {
    fontSize: FONT_SIZE_XXS,
  },
  message: {
    fontSize: FONT_SIZE_XS,
  },
});
