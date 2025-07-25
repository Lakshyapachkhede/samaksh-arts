const express = require('express');
const authMiddleware = require('../middlewares/adminAuth.middleware');
const contactController = require('../controllers/contact.controller');



const router = express.Router();

// /api/v1/contact/
router
    .route('/')
    .get(authMiddleware, contactController.getAllContact)
    .post(contactController.createContact);

// /api/v1/delete/:id
router
    .route('/:id')
    .delete(authMiddleware, contactController.deleteContact);


module.exports = router;