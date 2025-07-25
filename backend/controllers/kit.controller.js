const KitItems = require("../models/kitItem.model");
const cloudinary = require('../config/cloudinary.config');


// GET /api/v1/kit
async function getAllKitItems(req, res) {
    try {
        const kitItems = await KitItems.find().sort({ createdAt: -1 });
        return res.status(200).json(kitItems);
    }
    catch {
        return res.status(500).json({ "error": "Server Error at getAllKitItems" });
    }
}



// POST /api/v1/kit
async function createKitItem(req, res) {
    try {
        const { title, description, link } = req.body;
        const newKitItem = new KitItems({
            title,
            imageUrl: req.file.path,
            imageId: req.file.filename,
            description,
            link
        });
        
     
        await newKitItem.save();
        return res.status(201).json(newKitItem);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: "Server Error at createKitItem" });

    }

}




// DELETE /api/v1/kit/:id
async function deleteKitItem(req, res) {
    try {
        const kitItem = await KitItems.findById(req.params.id);
        if (!kitItem) return res.status(404).json({ error: "KitItem not found" });
        
        if(kitItem.imageId){
            await cloudinary.uploader.destroy(kitItem.imageId);

        }
        await kitItem.deleteOne();
        return res.status(200).json({ message: "Kit Item deleted successfully" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error at deleteKitItem" });
    }
}

module.exports = {
    getAllKitItems,
    createKitItem,
    deleteKitItem,
};