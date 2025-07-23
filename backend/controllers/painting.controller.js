const Painting = require("../models/painting.model");

// GET /api/v1/paintings
async function getAllPaintings(req, res) {
    try {
        const allPaintings = await Painting.find().sort({ createdAt: -1 });
        return res.status(200).json(allPaintings);
    }
    catch {
        return res.status(500).json({ "error": "Server Error at getAllPaintings" });
    }
}

// GET /api/v1/paintings:id
async function getPaintingById(req, res) {
    try {
        const painting = await Painting.findById(req.params.id);
        if (!painting) return res.status(404).json({ "error": "painting not found" });
        return res.status(200).json(painting);
    } catch {
        return res.status(500).json({ "error": "Server Error at getPaintingById" });

    }

}

// POST /api/v1/paintings
async function createPainting(req, res) {
    try {
        const { title, height, width, unit, isForSale, price, isAvailable } = req.body;
        const newPainting = new Painting({
            title,
            imageUrl: req.file.path,
            height,
            width,
            unit,
            isForSale,
            price,
            isAvailable
        });

        await newPainting.save();
        return res.status(200).json(newPainting);
    } catch (err) {
        if (err.name = "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: "Server Error at createPainting" });

    }

}



// PUT /api/v1/paintings/:id
async function updatePainting(req, res) {
    try {
        const updatedData = {...req.body};

        if (req.file){
            updatedData.imageUrl = req.file.path;
        }
        const updatedPainting = await Painting.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );
        if (!updatedPainting) return res.status(404).json({ error: "Painting not found" });
        return res.status(200).json(updatedPainting);
    } catch {
        return res.status(500).json({ error: "Server Error at updatePainting" });
    }

}


// DELETE /api/v1/paintings/:id
async function deletePainting(req, res) {
    try {
        const deleted = await Painting.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Painting not found" });
        return res.status(200).json({ message: "Painting deleted successfully" });
    } catch {
        return res.status(500).json({ error: "Server Error at deletePainting" });
    }
}

module.exports = {
    getAllPaintings,
    getPaintingById,
    createPainting,
    updatePainting,
    deletePainting
};