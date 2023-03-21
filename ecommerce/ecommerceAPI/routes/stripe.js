require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")("sk_test_51Kd6ukSGpbDHZfb0s0Iy8C3LFXnjbmiK2aCBeqw5rAgscAwj4qqEeYhDKefW7EybFw42zJGwgXNBvti9nmfQwvuG00DMe1ZAQF");

router.post("/payment", async (req, res)=>{
    // console.log(req.body.tokenId);
    // console.log(process.env.STRIPE_KEY)

    const {paymentMethodType, amount} = req.body


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            // source: req.body.tokenId,
            amount: amount,
            currency: "INR",
            payment_method_types: [paymentMethodType],
        })
        // console.log(paymentIntent.client_secret)
        return res.status(200).json({clientSecret: paymentIntent.client_secret})
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
})

// router.post("/payment", (req, res)=>{
//     // console.log(req.body.tokenId);
//     // console.log(process.env.STRIPE_KEY)
    
//     stripe.paymentIntents.create({
//         // source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "USD",
//         payment_method_types: ['card'],
//         confirm: true
//     }, (stripeErr)=>{
//         if(stripeErr){
//             console.log(stripeErr);
//             return res.status(500).json(stripeErr);
//         } else {
//             // return res.status(200).json({clientSecret: paymentIntents.clientSecret});
//             return res.status(200).json("Success");
//         }
//     })
// })

module.exports = router;