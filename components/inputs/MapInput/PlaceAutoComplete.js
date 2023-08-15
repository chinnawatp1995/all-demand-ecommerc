import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete,  } from 'react-native-google-places-autocomplete';
import { View, StyleSheet } from 'react-native';



const PlaceAutoComplete = (props) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

  function onSelectPlace(data, details) {
    console.log('Start AutoComplete onpress')
    console.log(data);
    console.log(JSON.stringify(details?.geometry?.location));
    const [description, coordinate] = [JSON.stringify(data.description), details?.geometry?.location]
    const newCoordinate = {latitude: JSON.stringify(coordinate.lat), longitude: coordinate.lng }
    props.onSelectPlace(newCoordinate,description);
    console.log('End select placeS')
  }

  return (
    <View style={styles.container}> 
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={(data, details = null) => onSelectPlace(data, details)}
        query={{key: GOOGLE_PLACE_API_KEY ,components: 'country:th',}}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        styles={{
          container: {
            flex: 0,
          },
          description: {
            color: '#000',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#3caf50',
          },
        }}
      /></View>
    
  );
};

export default PlaceAutoComplete;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    top: 10,
    
  },
})