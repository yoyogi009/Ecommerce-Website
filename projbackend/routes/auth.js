var express = require('express')

var router = express.Router()
const {check , validationResult} = require("express-validator")

//importing signout method from auth.js of controller
const {signup,signout} = require("../controllers/auth")

router.post("/signup",
[
    check("name", "name should be at least 3char").isLength({ min : 3}),
    check("email", "email is required").isEmail(),
    check("password", "pss should be at least 3char").isLength({ min : 3})
] ,signup)

router.get("/signout", signout)

module.exports = router;