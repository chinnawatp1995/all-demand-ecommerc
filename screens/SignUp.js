import { StyleSheet, Text, View } from 'react-native'
import { useState,} from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { fetchUserProfile } from '../states/reducers/userSlice'
import TextInput from '../components/inputs/TextInput'
import Button from '../components/buttons/Button'
import { LightThemeColors as theme, IndependentColors } from '../config/Colors'
import Message from '../assets/icons/svg/Message.svg';
import Lock from '../assets/icons/svg/Lock.svg';
import EyeOpen from '../assets/icons/svg/EyeOpen.svg'; 
import {
    FONT_SIZE_SM,
    FONT_SIZE_XS,
    STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    STANDARD_SPACING,
    STANDARD_BORDER_RADIUS,
    STANDARD_VECTOR_ICON_SIZE
  } from '../config/Constants';
import { useFormik } from 'formik'
import { signUpFormInitialValues, signUpFormValidation } from '../schemas/signUpFormValidation'
import { firebaseSignUpErrorTextToLocalString } from '../util/firebaseErrorTextToLocalString'
import Spinner from 'react-native-loading-spinner-overlay'
import LargeHeading from '../components/headings/LargeHeading'

const SignUp = (props) => {

    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [hiddenText, setHiddenText] = useState(true);

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
      initialValues: signUpFormInitialValues,
      onSubmit: (values) => {
        onSignUp()
      },
      validationSchema: signUpFormValidation
    })

    const dispatch = useDispatch();

    async function onSignUp(){;
        try{
            setErrorText('');
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
           
            const user = userCredential.user;
            const dispatchResult = await dispatch(fetchUserProfile(user.uid));
           
            if(dispatchResult.meta.requestStatus === 'fulfilled'){
                if(dispatchResult.payload.name && dispatchResult.payload.address.length>0){
                  props.navigation.navigate('TabNavigator', {screen: 'Home'});
                }else{
                  props.navigation.navigate('UpdateProfile');
                }
              }else{
                props.navigation.navigate('UpdateProfile');
              }
          }catch(e){
              console.log(e.message);
              setErrorText(e.message);
          }finally{
              setLoading(false)
          }

    }

  return (

    <View tyle={[styles.mainWrapper, {backgroundColor: theme.primary}]}> 
      <View style={styles.contentWrapper}>
        <View style={styles.largeHeadingComponentWrapper}>
          <LargeHeading
            headingText="ลงทะเบียน"
            headingColor={theme.textHighContrast}
          />
        </View>

        {/* Info */}
        <Text style={[styles.info, {color: theme.textLowContrast}]}>
          ยินดีต้อนรับสู่ All Demand วัตถุดิบอาหาร สะอาด ปลอดภัย ได้มาตรฐาน
        </Text>

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

        <View style={styles.textInputComponentWrapper}>
          <TextInput
            label="Confirm Password"
            labelColor={theme.textHighContrast}
            placeholder="Enter your password again"
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
            onTextChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
            errorText={errors.confirmPassword}
            value={values.confirmPassword}
            touched={touched.confirmPassword}
            handleBlur={handleBlur('confirmPassword')}
            hiddenText={hiddenText}
            onRightIconPress={() => setHiddenText(!hiddenText)}
          />
        </View>

        {errorText.length>0 && (<Text style={{color: 'red'}}>{firebaseSignUpErrorTextToLocalString(errorText)}</Text>)}

        <Button 
        label="Sign Up"
        labelColor={theme.textHighContrast}
        backgroundColor={theme.accent}
        onPress={handleSubmit}
        disabled={errors.email || errors.password || errors.confirmPassword}
        />

        <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: theme.textHighContrast}}
        />
    
    </View>
  </View>  
  )
}

export default SignUp

const styles = StyleSheet.create({
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
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
contentWrapper: {
  marginHorizontal: STANDARD_SPACING * 6,
  marginVertical: STANDARD_SPACING * 9 ,
  paddingHorizontal: STANDARD_SPACING * 6,
  paddingVertical: STANDARD_SPACING * 3,
  borderRadius: STANDARD_BORDER_RADIUS * 3,
  backgroundColor: theme.primary,
  },
})