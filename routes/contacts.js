const express = require('express');
const ObjectId = require('mongodb').ObjectId; // MongoDB ObjectId
const router = express.Router();

// Create routes for contacts
module.exports = (db) => {
  // GET: Fetch all contacts
  router.get('/', async (req, res) => {
    try {
      const contacts = db.collection('contacts');
      const contactList = await contacts.find().toArray();  // Fetch all contacts
      res.json(contactList);
    } catch (err) {
      res.status(500).send('Error fetching contacts: ' + err);
    }
  });

  // GET: Fetch a single contact by ID (using query parameter)
  router.get('/:id', async (req, res) => {
    const { id } = req.params;  // Get the ID from the URL parameter

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }

    try {
      const contacts = db.collection('contacts');
      const contact = await contacts.findOne({ _id: new ObjectId(id) });  // Find contact by ID
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

  return router;
};