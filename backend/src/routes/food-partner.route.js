const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const foodPartnerController = require('../controllers/food-partner.controller');

// api/food-partner/:id
router.get('/:id' , authMiddleware.authUserMiddleware , foodPartnerController.getFoodPartnerById);

module.exports = router;