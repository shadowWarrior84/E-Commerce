import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Pay1 from "./Pay1"
import axios from 'axios';

const KEY = "pk_test_51Kd6ukSGpbDHZfb0SaQ9Di0LqofPVUYT4RzM7plZy53WjLF2WDRpeJaDFlcszj2jnTT0BfBA3r4LIlReT3cVDYN800RaMkmtUe"


const Checkout = () => {
const stripeTestPromise = loadStripe(KEY);
const [clientSecret, setClientSecret] = useState("");
var secret1
let c=1

const appearance = {
    theme: "night",
    labels: "floating"
}



// useEffect( ()=>{
//     const function1 = async ()=>{
        
//         const client = await axios.post("http://localhost:8000/api/checkout/payment", {
//                         amount: 2000,
//                         paymentMethodType: "card"
//                     })
//                     console.log(client)
//                     secret1= await client.data.clientSecret
                    
                
//                     setClientSecret(await client.data.clientSecret);
                    
//                     console.log(clientSecret)
                    
                    
//     }
    
//     function1();
// },[])

useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const function1 = async()=>{

    const response = await fetch("http://localhost:8000/api/checkout/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount:2000, paymentMethodType: 'card' }),
    })
      .then((res) => res.json())
      .catch((err)=>{
          console.log(err)
      });
      setClientSecret(response.data.clientSecret)
}
  }, []);

    // const handleSubmit = async ()=>{
        
    //     const client = await axios.post("http://localhost:8000/api/checkout/payment", {
    //                     amount: 2000,
    //                     paymentMethodType: "card"
    //                 })
    //                 console.log(client)
    //                 secret1= await client.data.clientSecret
                    
                
    //                 setClientSecret(await client.data.clientSecret);
                    
    //                 console.log(clientSecret)
                    
                    
    // }

console.log(clientSecret)

const options = {
    clientSecret,
    appearance
}

console.log(options)
  return ( 
    <Elements options={options} stripe={stripeTestPromise}>
        <Pay1/>
    </Elements>

  )
}

export default Checkout