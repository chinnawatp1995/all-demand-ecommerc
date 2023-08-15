import { StyleSheet, Text, View, Screen, Button } from 'react-native';
import React from 'react';
import { useStripe } from '@stripe/stripe-react-native';

const TestStripe = (props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = React.useState(false);

  const fetchPaymentSheetParams = async () => {
    try{
    console.log("FetchPaymentIntent")
    const response = await fetch("http://192.168.168.96:5001/all-demand-chinnawat/us-central1/paymentIntentinit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Finish fetching");
    const { paymentIntent} = await response.json();

    return {
      paymentIntent,
      };
    }catch(e){
      console.log(e.message)
    } 
  };

  const initializePaymentSheet = async () => {
    console.log("initialize")
    const {
      paymentIntent,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "ALL DEMANMD",
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Test Test',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  React.useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    
  );
}

export default TestStripe

const styles = StyleSheet.create({})