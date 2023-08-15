import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { auth } from '../firebase';
import Camera from '../assets/icons/svg/Camera.svg';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../states/reducers/userSlice';
import NavigationLink from '../components/links/NavigationLink';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_SPACING,
  STANDARD_FLEX,
  STANDARD_MY_PROFILE_HEADER_HEIGHT,
  STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE,
  STANDARD_VECTOR_ICON_SIZE
} from '../config/Constants';
import { scale } from 'react-native-size-matters';
import { LightThemeColors as theme } from '../config/Colors';
import { signOut } from 'firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';

const Profile = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user);
  async function fetchUser() {   
    const user = auth.currentUser;
    if (user) {
      dispatch(fetchUserProfile(user.uid));
    } else {
      console.log('no user');
    }
  }

  const logOut = () => {
    setLoading(true);
    signOut(auth).then(() => {
      setLoading(false);
      props.navigation.navigate('Home');
    }).catch((error) => {
      console.log(error);
    });
  }



  // return (
  //   <View>
  //     <Text>Profile</Text>
  //     <Button title='Log In' onPress={()=>{props.navigation.navigate('logInWithEmail')}} />
  //     <Button title='Create User Profile' onPress={()=> {props.navigation.navigate('createProfile')}}/>
  //     {/* <Button title='LogOut' onPress={()=> props.navigation.navigate()}/> */}
  //     <Button title='fetch user again' onPress={fetchUser}/>
  //   </View>
  // )

  return (
    <View style={[styles.mainWrapper, {backgroundColor: theme.primary}]}>
      {/* Profile details */}
      {user.uid&&(<Animatable.View
        delay={100}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
        <ImageBackground
          source={require('../assets/images/backgrounds/liquid-cheese-background.png')}
          style={styles.headerImageBackground}>
          {/* Profile photo */}
          <View>
            <View
              style={[
                styles.profilePhotoWrapper,
                {
                  backgroundColor: theme.primary,
                },
              ]}>
              <Image
                style={[styles.profileImage]}
                source={require('../assets/illustrations/person.png')}
              />
            </View>

            {/* Camera icon */}
            <View
              style={[
                styles.cameraIconWrapper,
                {
                  backgroundColor: theme.primary,
                },
              ]}>
              <Camera
                width={STANDARD_VECTOR_ICON_SIZE}
                height={STANDARD_VECTOR_ICON_SIZE}
              />
            </View>
          </View>

          {/* Profile name & email */}
          <View style={styles.profileNameAndEmailWrapper}>
            <Text style={[styles.profileName, {color: theme.textHighContrast}]}>
              {user.name}
            </Text>
            <Text
              style={[styles.profileEmail, {color: theme.textHighContrast}]}>
              {user.email}
            </Text>
          </View>
        </ImageBackground>
      </Animatable.View>)}

      {/* Navigation links */}
      <Animatable.View
        style={styles.navigationLinksScrollviewWrapper}
        delay={600}
        animation="fadeInUp"
        easing="ease-in-out-back"
        useNativeDriver={true}>
        {/* Scrollview */}
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {/* Mapping data */}
          
            {user.uid&&(<View
              style={[
                styles.navigationLinkWrapper,
                
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName='edit-3'
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label='แก้ไขข้อมูลส่วนตัว'
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                onPress={() => props.navigation.navigate('UpdateProfile')}
              />
            </View>)}

            {user.uid&&(<View
              style={[
                styles.navigationLinkWrapper,
                
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName='map-pin'
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label='แก้ไขที่อยู่'
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                onPress={() => props.navigation.navigate('EditAddress')}
              />
            </View>)}

            {user.uid&&(<View
              style={[
                styles.navigationLinkWrapper,
                
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName='user'
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label='บัญชีผู้ใช้งาน'
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                
              />
            </View>)}

            <View
              style={[
                styles.navigationLinkWrapper,
                
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName='book-open'
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label='วิธีการใช้งาน'
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                
              />
            </View>

            {user.uid&&(<View
              style={[
                styles.navigationLinkWrapper,
                
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName='log-out'
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label='ออกจากระบบ'
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                onPress={logOut}
              />
            </View>)}

            {!user.uid&&(<View
              style={[
                styles.navigationLinkWrapper,
                
              ]}>
              <NavigationLink
                linkBackgroundColor={theme.secondary}
                leftIconName='log-in'
                leftIconColor={theme.textHighContrast}
                leftIconWrapperBackgroundColor={theme.primary}
                iconSize={STANDARD_VECTOR_ICON_SIZE}
                label='เข้าสู่ระบบ'
                labelColor={theme.textLowContrast}
                chevronColor={theme.textHighContrast}
                onPress={() => props.navigation.navigate('LoginS')}
              />
            </View>)}

            <TouchableOpacity onPress={()=>dispatch(fetchUserProfile(auth.currentUser.uid))}><Text>Fetch user</Text></TouchableOpacity>
            
            <Spinner
              visible={loading}
              textContent={'Loading...'}
              textStyle={{color: theme.textHighContrast}}
            />
          
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

export default Profile

const styles = StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingTop: STANDARD_SPACING * 3,
  },
  headerImageBackground: {
    borderRadius: scale(20),
    height: STANDARD_MY_PROFILE_HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profilePhotoWrapper: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.2,
    marginLeft: STANDARD_SPACING * 3,
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: -(STANDARD_SPACING * 2),
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.4,
    aspectRatio: 1,
    borderRadius: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.4 * 0.5,
  },
  profileNameAndEmailWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 4,
  },
  profileName: {
    fontSize: FONT_SIZE_SM,
  },
  profileEmail: {
    marginTop: STANDARD_SPACING,
    fontSize: FONT_SIZE_XS,
  },
  profileImage: {
    width: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.9,
    height: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.9,
  },
  navigationLinksScrollviewWrapper: {
    flex: STANDARD_FLEX,
  },
  navigationLinkWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
})