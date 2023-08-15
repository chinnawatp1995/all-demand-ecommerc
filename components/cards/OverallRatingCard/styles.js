import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  STANDARD_OVERALL_RATING_CARD_HEIGHT,
  STANDARD_PROGRESS_BAR_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  overallRatingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    height: STANDARD_OVERALL_RATING_CARD_HEIGHT,
    borderRadius: STANDARD_OVERALL_RATING_CARD_HEIGHT * 0.2,
  },
  overallRatingContentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  overallRatingValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRatingValue: {
    fontSize: FONT_SIZE_XL,
  },
  slash: {
    marginLeft: scale(7.5),
    fontSize: FONT_SIZE_SM,
  },
  totalRatingValue: {
    fontSize: FONT_SIZE_SM,
  },
  totalRatingCount: {
    marginVertical: scale(5),
    fontSize: FONT_SIZE_SM,
  },
  totalRatingStarsWrapper: {
    flexDirection: 'row',
  },
  earnedRatingStarsStatsWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  earnedRatingStarsStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(3),
  },
  earnedRatingStarsStatsLabel: {
    marginRight: scale(10),
    fontSize: FONT_SIZE_XS,
  },
  progressBar: {
    flex: 1,
    position: 'relative',
    height: STANDARD_PROGRESS_BAR_HEIGHT,
    borderRadius: STANDARD_PROGRESS_BAR_HEIGHT * 0.5,
  },
});
