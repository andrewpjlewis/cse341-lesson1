const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

// Create routes for contacts
module.exports = (db) => {
  // GET: Fetch all contacts
  router.get('/', async (req, res) => {
    try {
      const contacts = db.collection('contacts');
      const contactList = await contacts.find().toArray();
      res.json(contactList);
    } catch (err) {
      res.status(500).send('Error fetching contacts: ' + err);
    }
  });

  // GET: Fetch a single contact by ID (using query parameter)
  router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }

    try {
      const contacts = db.collection('contacts');
      const contact = await contacts.findOne({ _id: new ObjectId(id) });
      if (!contact) {
        return res.status(404).send('Contact not found');
      }
      res.json(contact);
    } catch (err) {
      res.status(500).send('Error fetching contact by ID: ' + err);
    }
  });

  // POST: Add a new contact
  router.post('/', async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    try {
      const contacts = db.collection('contacts');
      const result = await contacts.insertOne({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
      });
      res.status(201).send(`Contact added with ID: ${result.insertedId}`);
    } catch (err) {
      res.status(500).send('Error adding contact: ' + err);
    }
  });

// PUT: Update a contact by ID
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }
  
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  
  
    try {
      const contacts = db.collection('contacts');
      const result = await contacts.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
          }
        }
      );
    
      // If no document was found with that ID
      if (result.matchedCount === 0) {
        return res.status(404).send('Contact not found');
      }
    
      // Success: 204 No Content
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send('Error updating contact: ' + err);
    }
  });

  // DELETE Route to remove a contact by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }

    try {
      const contacts = db.collection('contacts');
      const result = await contacts.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).send('Contact not found');
      }
  
      res.status(200).send('Contact deleted successfully');
    } catch (err) {
      res.status(500).send('Error deleting contact: ' + err);
    }
  });

  return router;
};