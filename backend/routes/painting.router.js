const express = require('express');
const paintingController = require('../controllers/painting.controller');
const upload = require('../middlewares/imageUpload.middleware');
const authMiddleware = require('../middlewares/adminAuth.middleware');



const router = express.Router();

// /api/v1/paintings/
router
    .route('/')
    .get(paintingController.getAllPaintings)
    .post(authMiddleware, upload.single("image"), paintingController.createPainting)

// /api/v1/paintings/:id
router
    .route('/:id')
    .get(paintingController.getPaintingById)
    .patch(authMiddleware, upload.single("image"), paintingController.updatePainting)
    .delete(authMiddleware, paintingController.deletePainting)


module.exports = router;