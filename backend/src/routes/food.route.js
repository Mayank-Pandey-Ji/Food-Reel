const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const uplaod = multer({
    storage : multer.memoryStorage(),
})

// this API should be protected as we are adding food item 
router.post('/' , authMiddleware.authfoodPartnerMiddleware , uplaod.single('video') ,  foodController.createFood); 
router.get('/' , authMiddleware.authUserMiddleware , foodController.getAllFoodItems);

router.post('/like' , authMiddleware.authUserMiddleware , foodController.likeFoodItem);
router.post('/save' , authMiddleware.authUserMiddleware , foodController.saveFoodItem);

router.get('/save' , authMiddleware.authUserMiddleware , foodController.getSavedFoodItems);


module.exports = router;