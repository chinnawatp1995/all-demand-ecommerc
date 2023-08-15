import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const TestCheckout = (props) => {
    let [order, setOrder] = React.useState({uid:'',amount:'',status:''});

    React.useEffect(()=>{
       async function fetchFromFirestore(){
           const docRef = doc(db, 'Order', 'test01');
            const docSnap =  await getDoc(docRef);
            
            if(docSnap.exists) {
               setOrder({...docSnap.data(),uid:docSnap.id});
            }
        }

        fetchFromFirestore();
    },[])
    
    return (
    <View>
      <Text>TestCheckout {order.amount}{order.uid}</Text>
      <Text>{(order.status).toString()}</Text>
    </View>
  )
}

export default TestCheckout

const styles = StyleSheet.create({})