import { StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Pin from '../../../assets/icons/svg/Pin.svg';
import PlaceAutoComplete from './PlaceAutoComplete';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../../states/reducers/userSlice';
import FeatherIcons from 'react-native-vector-icons/Feather';
import ButtonDashOutlined  from '../../buttons/ButtonDashOutlined';
import {
    STANDARD_FLEX,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    STANDARD_SPACING,
    STANDARD_VECTOR_ICON_SIZE,
    FONT_SIZE_SM,
    STANDARD_BORDER_RADIUS,
  } from '../../../config/Constants'
import { LightThemeColors as theme } from '../../../config/Colors';
import { scale } from 'react-native-size-matters';
import TextInput from '../TextInput';
import Button from '../../buttons/Button';
import Spinner from 'react-native-loading-spinner-overlay';
import ButtonCircled from '../../buttons/ButtonCircled';



const MapInput = (props) => {
    const dispatch = useDispatch();
    const [modalVisible,setModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({latitude: 1,longitude: 1})
    const [addressName, setAddressName] = useState('');
    const [address, setAddress] = useState({name:'',
                                            description:'',
                                            coordinate: {latitude: currentLocation.latitude,
                                                        longitude: currentLocation.longitude
                                                }
                                            })
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function getCurrentLocation(){

            let { status }= await Location.requestForegroundPermissionsAsync();

            if(status !== 'granted'){
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let {latitude, longitude} = location.coords;

            setCurrentLocation({latitude, longitude});
        
        }
        getCurrentLocation();
    })

    function getAddressFromCoordinates({latitude, longitude}) {
        return new Promise((resolve, reject) => {
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
              latitude +',' + longitude +'&key=' +
              GOOGLE_PLACE_API_KEY,
            )
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.status === 'OK') {
                resolve(responseJson?.results?.[0]?.formatted_address);
              } else {
                reject('not found');
              }
            })
            .catch(error => {
              reject(error);
            });
        });
    }


    async function onSetAddress(coordinate,addressDescription=undefined){
        const {latitude, longitude}  = coordinate;
        if(!addressDescription){
            addressDescription = await getAddressFromCoordinates({latitude, longitude})
        }
        setAddress({...address,
                            description: addressDescription,
                            coordinate: {
                                latitude:latitude,
                                longitude: longitude
                            } 
                         })
        //console.log(addressName + " " + addressDescription + " " + latitude + " " + longitude);
    }

    async function onCloseModal(){
        try{
            console.log(address);
            if(!address.description){
                let addressDescription = await getAddressFromCoordinates({latitude: address.coordinate.latitude, longitude: address.coordinate.longitude})
                dispatch(addAddress({...address, description: addressDescription}));
            }else{
                dispatch(addAddress(address));
            }
            setAddressName('');
            setAddress({name:'',
            description:'',
            coordinate: {latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude
                }
            });
            setModalVisible(false)
        }catch(e){
            console.log(e.message)
        }
    }

  return (
    <>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                    <View style={styles.modalContentWrapper}>
                

                    {!address.name?
                        <View style={styles.mapNameComponentWrapper}>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                label="ชื่อที่อยู่"
                                labelColor={theme.textHighContrast}
                                placeholder='บ้าน , ที่ทำงาน , อื่นๆ '
                                placeholderTextColor={theme.textLowContrast}
                                leftIcon={
                                    <Pin
                                        width={STANDARD_VECTOR_ICON_SIZE}
                                        height={STANDARD_VECTOR_ICON_SIZE}
                                    />
                                }
                                backgroundColor={theme.secondary}
                                textInputValueColor={theme.textHighContrast}
                                onTextChange={setAddressName}
                                />
                                <TouchableOpacity style={{position: 'absolute', right: 0, top: 0}} onPress={()=> setModalVisible(false)}>
                                    <FeatherIcons
                                        name="x-circle"
                                        size={STANDARD_VECTOR_ICON_SIZE}
                                        color='red'
                                    />

                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button label='บันทึก' 
                                    labelColor={theme.primary} 
                                    backgroundColor={theme.accent}
                                    onPress={()=> setAddress({...address, name:addressName})} 
                                />
                            </View>
                        </View>:
                        
                    
                    <View style={styles.mapComponentWrapper}>
                        <MapView
                         style={styles.map}
                         initialRegion={{
                         latitude: currentLocation.latitude,
                         longitude: currentLocation.longitude,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                         }}
                        >
                            <Marker draggable 
                                coordinate={{latitude: currentLocation.latitude, longitude: currentLocation.longitude}}
                                onDragEnd={(e) => onSetAddress(e.nativeEvent.coordinate)}
                            />

                        </MapView>

                        <PlaceAutoComplete onSelectPlace={onSetAddress}/>

                        <View style={styles.mapButtonOverlay}>

                            <View style={[styles.buttonWrapper, {borderRadius:100, backgroundColor: theme.accent,padding: 10}]}>
                                <TouchableOpacity>
                                    <FeatherIcons
                                        name="map-pin"
                                        size={STANDARD_VECTOR_ICON_SIZE * 1.5}
                                        color={theme.primary}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonWrapper}>
                                <Button 
                                    label='บันทึก' 
                                    labelColor={theme.primary} 
                                    backgroundColor='green'
                                    onPress={onCloseModal} 
                                />
                            </View>
                            <View style={[styles.buttonWrapper, {borderRadius:100, backgroundColor: 'red',padding: 10}]}>
                                <TouchableOpacity
                                    onPress={()=> setModalVisible(false)}
                                >
                                    <FeatherIcons
                                        name="x"
                                        size={STANDARD_VECTOR_ICON_SIZE * 1.5}
                                        color={theme.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                  
                    </View>
                }
                </View>
               
                
            </Modal>

                {/* Button */}
                
                <View style={styles.addButtonComponentWrapper}>
               
                  <ButtonDashOutlined
                    onPress={() => {setModalVisible(true)}}
                    icon={
                      <FeatherIcons
                        name="plus"
                        size={scale(20)}
                        color={theme.accent}
                      />
                    }
                    iconWrapperBackgroundColor={theme.secondary}
                    label="Add New Address"
                    borderColor={theme.accent}
                    labelColor={theme.textHighContrast}
                  />
                 
                </View>
                
    </>
  )
}

export default MapInput

const styles = StyleSheet.create({
    map: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    modalContentWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapComponentWrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonWrapper: {  
        alignItems: 'center',
        marginVertical: STANDARD_SPACING ,
    },
    mapNameComponentWrapper: {
        backgroundColor: theme.primary,
        borderColor: theme.accent,
        borderWidth: 1,
        borderRadius: STANDARD_BORDER_RADIUS * 3,
        paddingHorizontal: STANDARD_SPACING * 3,
        paddingVertical: STANDARD_SPACING * 3,
    },
    addButtonComponentWrapper: {
        marginVertical: STANDARD_SPACING * 6,
        width: SCREEN_WIDTH - STANDARD_SPACING * 15,
    },
      sectionTitle: {
        marginVertical: STANDARD_SPACING * 3,
        fontSize: FONT_SIZE_SM,
    },
    textInputWrapper: {
        marginBottom: STANDARD_SPACING * 3,
        width: SCREEN_WIDTH - STANDARD_SPACING * 27,
    },
    mapButtonOverlay: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: SCREEN_WIDTH - STANDARD_SPACING * 15,
    },
})


