import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
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
import Button from '../components/buttons/Button'
import FeatherIcons from 'react-native-vector-icons/Feather'
import Spinner from 'react-native-loading-spinner-overlay'

const EditAddress = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const onThrashPress = (index) => {
    dispatch(removeAddress(user.address[index].uid));
  }

  return (
  <ScrollView keyboardShouldPersistTaps={true}>
<View style={styles.contentWrapper}>
            <MapInput/>

            
            {(user.address.length>0) &&
              (user.address.map((item, index) => (
                <View key={index} id={item.uid} style={[styles.cardComponentWrapper]}>
                  <TouchableOpacity style={styles.thrashButton}
                    onPressOut={() => onThrashPress(index)}  
                  >
                    <FeatherIcons 
                      name="trash-2" 
                      size={STANDARD_VECTOR_ICON_SIZE} 
                      color = 'red'
                    />
                  </TouchableOpacity>
                  <AddressCard
                    cardBorderColor={theme.accent}
                    cardBackgroundColor={theme.primary}
                    addressTypeIconBackgroundColor={theme.secondary}
                    addressTypeIconName='home'
                    addressTypeIconColor={theme.accent}
                    addressTypeColor={theme.textHighContrast}
                    checkCircleColor={theme.accent}
                    addresseeName={item.name}
                    addresseeNameColor={theme.textHighContrast}
                    address={item.description}
                    addressColor={theme.textLowContrast}
                    
                  />
                </View>
              )))
            }
            </View>
            </ScrollView>
  )
}

export default EditAddress

const styles = StyleSheet.create({
  
  contentWrapper: {
    paddingTop: STANDARD_SPACING ,
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