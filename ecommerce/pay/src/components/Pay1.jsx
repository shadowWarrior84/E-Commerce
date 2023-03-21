import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CardElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import './checkout.css';

const KEY = "pk_test_51Kd6ukSGpbDHZfb0SaQ9Di0LqofPVUYT4RzM7plZy53WjLF2WDRpeJaDFlcszj2jnTT0BfBA3r4LIlReT3cVDYN800RaMkmtUe"

const stripeTestPromise = loadStripe(KEY);

const Pay = () => {

    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements  = useElements();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        console.log(elements.getElement(CardElement));

        if(!error) {
            try {
                // const {paymentMethodType} = paymentMethod;
                const client = await axios.post("http://localhost:8000/api/checkout/payment", {
                    amount: 2000,
                    paymentMethodType: "card"
                })
                // const response = await axios.post("http://localhost:8000/api/checkout/payment", {
                //     amount: 2000,
                //     id
                // })

                // if(response.data.success) {
                //     console.log("Successfull Payment")
                //     setSuccess(true);
                // }

                console.log(client)
                const secret = client.data.clientSecret;

                const paymentIntent = await stripe.confirmCardPayment(secret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                })

                // console.log(paymentIntent.id + " " + paymentIntent.status);
                console.log(paymentIntent);
                history.push("/success")
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log(error)
        }
    }
    
  return (
      <form onSubmit={handleSubmit} id="payment-form">
          <label htmlFor="card-element">Card</label> 
          <PaymentElement/>
          {/* <CardElement />       */}
    <div 
        style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
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
        
    </div>
    </form> 
  )
}

export default Pay