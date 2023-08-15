import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ref, getDownloadURL } from 'firebase/storage';

const TestStorage = (props) => {
    const [imageUrl, setImageUrl] = React.useState(undefined);

    React.useEffect(() => {
        let storageRef = ref(props.storage);
        let imageRef = ref(storageRef, 'เนื้อปลา.jpg')
        getDownloadURL(imageRef)
            .then((url)=>{
                setImageUrl(url)
            })
    }, []);

  return (
    <View>
      <Text>TestStorage</Text>
      <Image style={{height: 200, width: 200}} source={{uri: imageUrl}} />
    </View>
  )
}

export default TestStorage

const styles = StyleSheet.create({})