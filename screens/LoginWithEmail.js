import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState} from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../states/reducers/userSlice'
import TextInput from '../components/inputs/TextInput';
import Message from '../assets/icons/svg/Message.svg';
import Lock from '../assets/icons/svg/Lock.svg';
import EyeOpen from '../assets/icons/svg/EyeOpen.svg';
import Call from '../assets/icons/svg/Call.svg';
import {scale} from 'react-native-size-matters';
import Button from '../components/buttons/Button';
import Link from '../components/links/Link'
import HorizontalDivider from '../components/dividers/HorizontalDivider';
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
import { useFormik } from 'formik'
import { logInWithEmailFormInitialValues, logInWithEmailFormValidation } from '../schemas/logInFormValidation'
import { firebaseLogInErrorTextToLocalString } from '../util/firebaseErrorTextToLocalString'

const LoginWithEmail = (props) => {

    const [errorText, setErrorText] = useState('');
    const [hiddenText, setHiddenText] = useState(true);

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: logInWithEmailFormInitialValues,
        onSubmit: async (values) => {
            onLogIn()
        },
        validationSchema: logInWithEmailFormValidation
    })
  

    async function onLogIn(){
        try{
            setErrorText('');
            props.setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
            const user = userCredential.user;
            props.navigation.navigate('TabNavigator', {screen: 'Home'})
        }catch(e){
            setErrorText(e.message);
        }finally{
            props.setLoading(false)
        }
        
    }

    console.log(touched.email);


  return (
    <>
      <View style={styles.textInputComponentWrapper}>

        <TextInput
          label="Email"
          labelColor={theme.textHighContrast}
          placeholder="Enter your email address"
          placeholderTextColor={theme.textLowContrast}
          leftIcon={
            <Message
              width={STANDARD_VECTOR_ICON_SIZE}
              height={STANDARD_VECTOR_ICON_SIZE}
            />
          }
          backgroundColor={theme.secondary}
          textInputValueColor={theme.textHighContrast}
          onTextChange={handleChange('email')}
          error={errors.email}
          errorText={errors.email}
          value={values.email}
          touched={touched.email}
          handleBlur={handleBlur('email')}
        />
      </View>

      <View style={styles.textInputComponentWrapper}>
        <TextInput
          label="Password"
          labelColor={theme.textHighContrast}
          placeholder="Enter your password"
          placeholderTextColor={theme.textLowContrast}
          leftIcon={
            <Lock
              width={STANDARD_VECTOR_ICON_SIZE}
              height={STANDARD_VECTOR_ICON_SIZE}
            />
          }
          rightIcon={
            <EyeOpen
            width={STANDARD_VECTOR_ICON_SIZE}
            height={STANDARD_VECTOR_ICON_SIZE}
            />
          }
          backgroundColor={theme.secondary}
          textInputValueColor={theme.textHighContrast}
          onTextChange={handleChange('password')}
          error={errors.password}
          errorText={errors.password}
          value={values.password}
          touched={touched.password}
          handleBlur={handleBlur('password')}
          hiddenText={hiddenText}
          onRightIconPress={() => setHiddenText(!hiddenText)}
        />
      </View>

      {/* Error text */}
      {errorText.length>0 && (<Text style={{color: 'red'}}>{firebaseLogInErrorTextToLocalString(errorText)}</Text>)}
      
      {/* Submit button */}
      <Button
        label={'Login'}
        labelColor={theme.primary}
        backgroundColor={theme.accent}
        onPress={handleSubmit}
        disabled={errors.email || errors.password}
      />

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
          onPress={() => props.setLogInMethod('phone')}
        >
          
          <Call 
            width={STANDARD_SOCIAL_ICON_SIZE}
            height={STANDARD_SOCIAL_ICON_SIZE}
            
          />
          <Text>เข้าสู่ระบบด้วยเบอร์โทร</Text>
        </TouchableOpacity>
    
      </View>

      {/* Question & link */}
      <View style={styles.questionAndLinkWrapper}>
        {/* Question */}
        <Text style={[styles.question, {color: theme.textLowContrast}]}>
          Don't have an account?
        </Text>

        {/* Link */}
        <Link
          label={'Create here'}
          labelColor={theme.textHighContrast}
          onPress={() => props.navigation.navigate('SignUp')}
        />
      </View>
    </>
  )
}

export default LoginWithEmail

const styles = StyleSheet.create({
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  horizontalDividerComponentWrapper: {
    marginTop: STANDARD_SPACING * 6,
 },
  socialIconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
})