const {handleAdminLogin} = require("../controllers/auth.controller");
const express = require('express');

const router = express.Router()


router
    .route("/login")
    .post(handleAdminLogin);


module.exports = router;