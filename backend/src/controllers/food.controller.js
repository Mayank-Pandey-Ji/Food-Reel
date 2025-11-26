const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4 : uuid} = require('uuid');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');
async function createFood(req , res){
    
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    const foodItem = await foodModel.create({
        name : req.body.name,
        description : req.body.description,
        video : fileUploadResult.url,
        foodPartner : req.foodPartner._id
    });
    return res.status(201).json({
        message : "Food item created successfully",
        foodItem
    })

}

async function getAllFoodItems(req, res) {
    const foodItems =  await foodModel.find();
    res.status(200).json({
        message : "Food items fetched successfully",
        foodItems
    });
}

async function likeFoodItem(req, res) {
    const { foodId } = req.body;
    const user = req.user;
    const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });
    if( isAlreadyLiked ) 
    {
        await likeModel.deleteOne({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
        return res.status(200).json({
            message: "Food item unliked successfully"
        });
    }
    const newLike = await likeModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    return res.status(201).json({
        message: "Food item liked successfully",
        like: newLike
        
    });
}  


async function saveFoodItem(req, res) {
    // Implementation for saving a food item goes here
    const {foodId}  = req.body;
    const user = req.user;
    // Logic to save the food item for the user
    const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });
    if( isAlreadySaved ) 
    {
        await saveModel.deleteOne({ user: user._id, food: foodId });
        await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: -1 } });
        return res.status(200).json({
            message: "Food item unsaved successfully"
        });
    }
    const newSave = await saveModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: 1 } });
    return res.status(201).json({
        message: "Food item saved successfully",
        save: newSave
    });
}


async function getSavedFoodItems(req, res) {
    const user = req.user;
    const savedItems = await saveModel.find({ user: user._id }).populate('food');
    if(!savedItems || savedItems.length === 0) {
        return res.status(404).json({
            message: "No saved food items found"
        });
    }
    res.status(200).json({
        message: "Saved food items fetched successfully",
        savedItems
    });
}

module.exports = {
    createFood,
    getAllFoodItems,
    likeFoodItem,
    saveFoodItem ,
    getSavedFoodItems
};