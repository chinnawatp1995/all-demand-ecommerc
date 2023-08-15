import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React , { useState, useRef } from 'react'
import TextInput from '../components/inputs/TextInput';
import Message from '../assets/icons/svg/Message.svg';
import Lock from '../assets/icons/svg/Lock.svg';
import EyeOpen from '../assets/icons/svg/EyeOpen.svg';
import Facebook from '../assets/icons/svg/Facebook.svg';
import Google from '../assets/icons/svg/Google.svg';
import Call from '../assets/icons/svg/Call.svg';
import LargeHeading from '../components/headings/LargeHeading';
import {scale} from 'react-native-size-matters';
import Button from '../components/buttons/Button';
import Checkbox from '../components/inputs/Checkbox';
import Link from '../components/links/Link';
import HorizontalDivider from '../components/dividers/HorizontalDivider';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  STANDARD_FLEX,
  STANDARD_OTP_LOCK_ICON_WRAPPER_SIZE,
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_VECTOR_ICON_SIZE,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  FONT_SIZE_XXS,
  STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
  STANDARD_OTP_TEXT_VIEW_SIZE
} from '../config/Constants';
import {LightThemeColors as theme, IndependentColors} from '../config/Colors';
import OTPTextView from 'react-native-otp-textinput';
import LoginWithEmail from './LoginWithEmail';
import LogInWithPhone from './LoginWithPhone';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginS = (props) => {

  const [logInMethod, setLogInMethod] = useState('email')
  const [loading, setLoading] = useState(false);
  


  return (
    <View tyle={[styles.mainWrapper, {backgroundColor: theme.primary}]}> 
      <View style={styles.contentWrapper}>
        <View style={styles.largeHeadingComponentWrapper}>
          <LargeHeading
            headingText="เข้าสู่ระบบ"
            headingColor={theme.textHighContrast}
          />
        </View>

        {/* Info */}
        <Text style={[styles.info, {color: theme.textLowContrast}]}>
          ยินดีต้อนรับสู่ All Demand วัตถุดิบอาหาร สะอาด ปลอดภัย ได้มาตรฐาน
        </Text>

        {logInMethod ==='email'? <LoginWithEmail setLogInMethod={setLogInMethod} 
                                                 navigation={props.navigation}
                                                 setLoading={setLoading} 
                                  />
                                  :
                                 <LogInWithPhone setLogInMethod={setLogInMethod} 
                                                 navigation={props.navigation} 
                                                 setLoading={setLoading}
                                 />
        }
      
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: theme.textHighContrast}}
      />
    </View>
  )
}

export default LoginS

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: STANDARD_SPACING * 3,
    },
    largeHeadingComponentWrapper: {
        marginBottom: STANDARD_SPACING * 1.5,
    },
    info: {
        marginBottom: STANDARD_SPACING * 8,
        fontSize: FONT_SIZE_SM,
    },
    textInputComponentWrapper: {
        marginBottom: STANDARD_SPACING * 3,
    },
    checkboxAndLinkWrapper: {
        marginBottom: STANDARD_SPACING * 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkboxAndLabelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: STANDARD_SPACING * 1.5,
        fontSize: FONT_SIZE_XS,
    },
    horizontalDividerComponentWrapper: {
        marginTop: STANDARD_SPACING * 6,
    },
    socialIconsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: STANDARD_SPACING * 6,
    },
    questionAndLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: STANDARD_SPACING * 6,
    },
    phoneAuthButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primary,
      borderRadius: STANDARD_BORDER_RADIUS * 3,
      borderColor: theme.accent,
      borderWidth: 1,
      padding: STANDARD_SPACING
    },
    contentWrapper: {
      marginHorizontal: STANDARD_SPACING * 6,
      marginVertical: STANDARD_SPACING * 9 ,
      paddingHorizontal: STANDARD_SPACING * 6,
      paddingVertical: STANDARD_SPACING * 3,
      borderRadius: STANDARD_BORDER_RADIUS * 3,
      backgroundColor: theme.primary,
    },
    otpVerificationFormWrapper: {
      flex: STANDARD_FLEX,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: STANDARD_BORDER_RADIUS,
      borderTopRightRadius: STANDARD_BORDER_RADIUS,
    },
    otpLockIconWrapper: {
      padding: scale(20),
      borderRadius: STANDARD_OTP_LOCK_ICON_WRAPPER_SIZE * 0.2,
      width: STANDARD_OTP_LOCK_ICON_WRAPPER_SIZE,
      aspectRatio: 1,
    },
    otpLockIcon: {
      width: null,
      height: null,
      resizeMode: 'contain',
      flex: STANDARD_FLEX,
    },
    otpLockIconTitle: {
      marginVertical: STANDARD_SPACING * 1.5,
      fontSize: FONT_SIZE_SM,
    },
    otpLockIconSubtitle: {
      fontSize: FONT_SIZE_XXS,
    },
    otpTextView: {
      borderRadius: STANDARD_BORDER_RADIUS * 2,
      marginVertical: STANDARD_SPACING * 6,
      borderBottomWidth: STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
      borderWidth: STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
      width: STANDARD_OTP_TEXT_VIEW_SIZE,
      aspectRatio: 1,
    },
    questionAndResendLinkWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    question: {
      marginRight: STANDARD_SPACING,
      fontSize: FONT_SIZE_XS,
    },
    
})