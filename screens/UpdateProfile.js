import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { db } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapInput from '../components/inputs/MapInput/MapInput'
import TextInput from '../components/inputs/TextInput';
import Edit from '../assets/icons/svg/Edit.svg';
import Profile from '../assets/icons/svg/Profile.svg';
import Call from '../assets/icons/svg/Call.svg';
import Message from '../assets/icons/svg/Message.svg';
import { removeAddress, updateProfile } from '../states/reducers/userSlice'
import { LightThemeColors as theme } from '../config/Colors' 
import { scale } from 'react-native-size-matters'
import {
  STANDARD_FLEX,
  SCREEN_WIDTH,
  STANDARD_SPACING,
  STANDARD_VECTOR_ICON_SIZE,
} from '../config/Constants'
import AddressCard from '../components/cards/AddressCard'
import { ScrollView } from 'react-native'
import Button from '../components/buttons/Button'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { useFormik } from 'formik'
import { updateProfileFormValidation } from '../schemas/updateProfileFormValidation'
import Spinner from 'react-native-loading-spinner-overlay'




const UpdateProfile = (props) => {
  
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: user.name?user.name:'',
      email: user.email?user.email:'',
      phoneNumber: user.phoneNumber?user.phoneNumber:'',
    },
    validationSchema: updateProfileFormValidation
  })

  
  return (
      <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
        {/* Header */}
        
        
        <ScrollView keyboardShouldPersistTaps={"always"} >  
        
          <View style={styles.contentWrapper}>

          <View style={[styles.formWrapper]}>
              {/* Text input */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  label="ชื่อ-นามสกุล"
                  labelColor={theme.textHighContrast}
                  placeholder={user.name?user.name:'ชื่อ-นามสกุล'}
                  placeholderTextColor={theme.textLowContrast}
                  leftIcon={
                  <Profile
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                  }
                  rightIcon={
                  <Edit
                    width={STANDARD_VECTOR_ICON_SIZE}
                    height={STANDARD_VECTOR_ICON_SIZE}
                  />
                  }
                  editable={false}
                  // onRightIconPress={} 
                  backgroundColor={theme.secondary}
                  textInputValueColor={theme.textHighContrast}
                  defaultValue={user.name?user.name:''}
                  onRightIconPress={() => props.navigation.navigate({name: 'EditTextInput', params: {
                    label: 'ชื่อ-นามสกุล',
                    placeholder: 'ชื่อ-นามสกุล',
                    defaultValue: user.name?user.name:'',
                    onTextChange: handleChange('name'),
                    error: errors.name,
                    touched: touched.name,
                    errorText: errors.name,
                    handleBlur: handleBlur('name'),
                    handleSubmit: handleSubmit,
                    }
                  })}
                />
              </View>


              {/* Text input */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  label="เบอร์โทรศัพท์"
                  labelColor={theme.textHighContrast}
                  placeholder={user.phoneNumber?user.phoneNumber:'เบอร์โทรศัพท์'}
                  placeholderTextColor={theme.textLowContrast}
                  leftIcon={
                    <Call
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  rightIcon={
                    <Edit
                      width={STANDARD_VECTOR_ICON_SIZE}
                      height={STANDARD_VECTOR_ICON_SIZE}
                    />
                  }
                  editable={false}
                  // onRightIconPress={} 
                  backgroundColor={theme.secondary}
                  textInputValueColor={theme.textHighContrast}
                  defaultValue={user.phoneNumber?user.phoneNumber:''}
                  onRightIconPress={() => props.navigation.navigate({name: 'EditTextInput', params: {
                    label: 'เบอร์โทรศัพท์',
                    placeholder: 'เบอร์โทรศัพท์',
                    defaultValue: user.phoneNumber?user.phoneNumber:'',
                    onTextChange: handleChange('phoneNumber'),
                    error: errors.phoneNumber,
                    touched: touched.phoneNumber,
                    errorText: errors.phoneNumber,
                    handleBlur: handleBlur('phoneNumber'),
                    

                   }
                  })}
                />
              </View>


            </View>

            


            
          </View>
        </ScrollView>
      

        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />

      </View>


  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  container: {
    flex: STANDARD_FLEX,
  },
  mainWrapper: {
    flex: STANDARD_FLEX,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
    height: scale(75),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    paddingTop: STANDARD_SPACING * 15,
    flex: STANDARD_FLEX,
    justifyContent: 'center', 
    alignItems: 'center', 
    width: SCREEN_WIDTH,
    paddingBottom: STANDARD_SPACING * 15,
  },
  formWrapper: {
    marginHorizontal: STANDARD_SPACING * 10 ,
    width: SCREEN_WIDTH - (STANDARD_SPACING * 15),
  },
  textInputWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  cardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    width: SCREEN_WIDTH - (STANDARD_SPACING * 15) ,
  },
  buttonWrapper: {  
    position: 'absolute',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    bottom: STANDARD_SPACING * 3,
  },
  thrashButton: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },  
})