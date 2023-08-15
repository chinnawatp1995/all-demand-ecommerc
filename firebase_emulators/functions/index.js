/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onSchedule } = require("firebase-functions/v2/scheduler");
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const endpointSecret = "YOUR_STRIPE_ENDPOINT_SECRET";
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
admin.initializeApp()

exports.paymentIntentinit = onRequest(async (req,res)=>{
    console.log(req.body.orderUid)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: 'thb',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            order_id: req.body.orderUid,
        },
    });

    res.json({
        paymentIntent:paymentIntent.client_secret,
        publishableKey: "YOUR_STRIPE_PUBLISHABLE_KEY",
    })
});

exports.stripeWebhook = onRequest(async (req,res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err.message)
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            try{
                
                await admin.firestore().collection('orders').doc('eR0fwtoE3vQD7IFnVC1I').update({status: 'paid'});
            }catch(e){
                break;   
            }  
        }     
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    
      // Return a 200 response to acknowledge receipt of the event
    res.send();
    
});

exports.createUserProfile = functions.auth.user().onCreate(async user=> {
    const userDoc = {
        name: '',
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
    try{
        await admin.firestore().collection('users').doc(user.uid).set(userDoc);
        return;
    }catch(e){
        console.log(e);
        return;
    }
    
});

exports.cancelOrder - onSchedule('every day 00:00', async () => {
    const orders = await admin.firestore().collection('orders').where('status', '==', 'pending').get();
    orders.forEach(order => {
        admin.firestore().collection('orders').doc(order.id).update({status: 'cancelled'});
    })
    return;
}
);

exports.testCancelOrder = onRequest(async (req,res) => {
    const orders = await admin.firestore().collection('orders').where('status', '==', 'pending').get();
    orders.forEach(order => {
        admin.firestore().collection('orders').doc(order.id).update({status: 'cancelled'});
    })
    return res.send('success');
}
);
