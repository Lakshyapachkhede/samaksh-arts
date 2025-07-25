const express = require('express');
const kitController = require('../controllers/kit.controller');
const upload = require('../middlewares/imageUpload.middleware');
const authMiddleware = require('../middlewares/adminAuth.middleware');



const router = express.Router();

// /api/v1/kit/
router
    .route('/')
    .get(kitController.getAllKitItems)
    .post(authMiddleware, upload.single("image"), kitController.createKitItem);

// /api/v1/kit/:id
router
    .route('/:id')
    .delete(authMiddleware, kitController.deleteKitItem)


module.exports = router;