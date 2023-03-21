const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")


// CREATE 

router.post("/", verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UDPATE
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

        return res.status(200).json(updatedCart);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted...")
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        const cart = await Cart.findOne({userId: req.params.id});
        return res.status(200).json(cart);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL 
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const carts = Cart.find();
        return res.status(200).json(carts);
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;