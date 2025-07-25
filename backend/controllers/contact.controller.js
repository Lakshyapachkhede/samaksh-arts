const Contact = require("../models/contact.model");


// GET /api/v1/contact
async function getAllContact(req, res) {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return res.status(200).json(contacts);
    }
    catch {
        return res.status(500).json({ "error": "Server Error at getAllContacts" });
    }
}



// POST /api/v1/contact
async function createContact(req, res) {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        return res.status(201).json(newContact);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: "Server Error at createContact" });

    }

}




// DELETE /api/v1/contact/:id
async function deleteContact(req, res) {
    try {

        const deleted = await Contact.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Contact not found" });
        }
        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error at deleteContact" });
    }
}

module.exports = {
    getAllContact,
    createContact,
    deleteContact,
};