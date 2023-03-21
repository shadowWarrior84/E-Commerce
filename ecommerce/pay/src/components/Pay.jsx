import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useStripe } from '@stripe/react-stripe-js';

const KEY = "pk_test_51Kd6ukSGpbDHZfb0SaQ9Di0LqofPVUYT4RzM7plZy53WjLF2WDRpeJaDFlcszj2jnTT0BfBA3r4LIlReT3cVDYN800RaMkmtUe"

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const stripe = useStripe();

    const onToken = (token)=>{
        console.log(token);
        setStripeToken(token);
    }

    useEffect(()=>{
        const makeRequest = async ()=>{
            try {
                const {clientSecret} = await axios.post("http://localhost:8000/api/checkout/payment", {
                    // tokenId: stripeToken.id,
                    amount: 2000,
                });
                // console.log(res.data)
                const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {payment_method: {
                    card: "card"
                }})
                console.log(paymentIntent);
            } catch (err) {
                console.log(err)
            }
        }
        stripeToken && makeRequest();
    },[stripeToken]);
  return (
    <div 
        style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <StripeCheckout
            name="Lama Shop"
            image="logo192.png"
            billingAddress
            shippingAddress
            description = "Your total is $20"
            amount={2000}
            token={onToken}
            stripeKey={KEY}
        >
            <button
                style={{
                    border: "none",
                    width: 120,
                    borderRadius: 5,
                    padding: "20px",
                    backgroundColor: "black",
                    fontWeight: "600",
                    cursor: "pointer",
                    color: "white"
                }}
            >
                Pay Now
            </button>
        </StripeCheckout> 
        
    </div>
  )
}

export default Pay