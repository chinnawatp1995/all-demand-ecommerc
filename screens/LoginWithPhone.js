import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
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
  STANDARD_OTP_TEXT_VIEW_SIZER_RADIUS,
  } from '../config/Constants';
import Button from '../components/buttons/Button';
import LargeHeading from '../components/headings/LargeHeading';
import OTPTextView from 'react-native-otp-textinput';
import Link from '../components/links/Link';
import Call from '../assets/icons/svg/Call.svg';
import TextInput from '../components/inputs/TextInput';
import { LightThemeColors as theme, IndependentColors } from '../config/Colors';
import HorizontalDivider from '../components/dividers/HorizontalDivider';


import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {signInWithCredential, PhoneAuthProvider} from 'firebase/auth';

import firebaseConfig,{ auth } from '../firebase';
import { fetchUserProfile } from '../states/reducers/userSlice';

const LoginWithPhone = (props) => {

    const dispatch = useDispatch();
    const recaptchaVerifier = useRef(null);
    const [phoneNumber,setPhoneNumber] = useState('');
    const [verificationId,setVerificationID] = useState('');
    const [verificationCode,setVerificationCode] = useState('');
    const attemptInvisibleVerification = false;
  
    const handleSendVerificationCode = async () => {
      try{
          const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
          const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
          ); // get the verification id
          setVerificationID(verificationId); // set the verification id
          
      }catch(error){
        console.log(error.message)
      }
  };
  
  const handleVerifyVerificationCode = async () => {
    try{
        console.log(verificationCode)
        const credential = PhoneAuthProvider.credential(verificationId,verificationCode); // get the credential
        await signInWithCredential(auth,credential); // verify the credential
        const user = credential.uid
        dispatch(fetchUserProfile(user.uid))
        if(!userProfile.profileStatus){
          props.navigation.navigate('createProfile');
        }else{
          props.navigation.navigate('TabNavigator', {screen:'home'});
        }
    }catch(error){
        console.log(error.message)
        
    }
  }
  
  return (
    <>
        <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />

        { // show the phone number input field when verification id is not set.
          !verificationId && (
          <>  
            <View style={styles.textInputComponentWrapper}>
              <TextInput
                label="เบอร์โทร"
                labelColor={theme.textHighContrast}
                placeholder="Enter your phone number"
                placeholderTextColor={theme.textLowContrast}
                leftIcon={
                  <Call
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                }
                backgroundColor={theme.secondary}
                textInputValueColor={theme.textHighContrast}
                onTextChange={setPhoneNumber}
              />
            </View>

            <Button
              label='ส่งรหัส OTP'
              labelColor={theme.primary}
              backgroundColor={theme.accent}
              onPress={handleSendVerificationCode}
            />
          </>  )  
        }
  
        { // if verification id exists show the confirm code input field.
            verificationId && (
                <View>
                    <View style={[styles.largeHeadingComponentWrapper]}>
                        <LargeHeading
                            headingText="Verify OTP Sent To Your Mobile Number!"
                            headingColor="white"
                            textAlign="center"
                        />
                    </View>
                    
                    <View
                        style={[
                        styles.otpVerificationFormWrapper,
                        {backgroundColor: theme.primary},
                        ]}>

                        <View
                        style={[
                            styles.otpLockIconWrapper,
                            {backgroundColor: theme.secondary},
                            ]}>
                            <Image
                                style={styles.otpLockIcon}
                                source={require('../assets/icons/png/otp-lock.png')}
                            />
                        </View>

                        <Text
                            style={[styles.otpLockIconTitle, {color: theme.textHighContrast}]}>
                            OTP Verification
                        </Text>

                        <Text
                            style={[styles.otpLockIconSubtitle, {color: theme.textLowContrast}]}>
                            Enter 6 Digit OTP code Sent To +91 7280000000
                        </Text>

                        <OTPTextView
                            textInputStyle={[styles.otpTextView]}
                            tintColor={theme.accent}
                            inputCount={7}
                            handleTextChange={text => setVerificationCode(text)}
                        />

                        <View style={[styles.questionAndResendLinkWrapper]}>
                            <Text style={[styles.question, {color: theme.textLowContrast}]}>
                                Didn't get OTP code?
                            </Text>
                            <Link label="Resend code" labelColor={theme.accent} />
                        </View>
                    </View>
                    <Button
                      label='ยืนยัน'
                      labelColor={theme.primary}
                      backgroundColor={theme.accent}
                      onPress={handleVerifyVerificationCode}
                    />
                </View>
            )
        }
  
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner/>}

        {/* Horizontal divider */}
        <View style={styles.horizontalDividerComponentWrapper}>
          <HorizontalDivider
            leftLineColors={[theme.primary, theme.secondary]}
            label={'Or'}
            labelColor={theme.textHighContrast}
            rightLineColors={[theme.secondary, theme.primary]}
          />
        </View>

      {/* Social icons */}
        <View style={styles.socialIconsWrapper}>

          <TouchableOpacity
            style={styles.phoneAuthButton} 
            onPress={() => props.setLogInMethod('email')}
          >
          
            <Call 
              width={STANDARD_SOCIAL_ICON_SIZE}
              height={STANDARD_SOCIAL_ICON_SIZE}
            
            />
            <Text>เข้าสู่ระบบด้วยอีเมลล์</Text>
        </TouchableOpacity>
    
        </View>
    
    </>
  )
  }
  
const styles = StyleSheet.create({
    text:{
        color: "#aaa"
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
      question: {
        marginRight: STANDARD_SPACING,
        fontSize: FONT_SIZE_XS,
      },
      questionAndResendLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    })

export default LoginWithPhone

