const Email = require('../models/emailModal');


exports.createEmail = async (req, res, next) => {
    try {
      const { name, subject, desc, clientEmail } = req.body;
  
      const formData = new Email({
        name,
        subject,
        desc,
        clientEmail,
        date: new Date(), // Set the current date here
      });
  
      await formData.save();
      res.json('Form data saved successfully');
    } catch (err) {
      console.error('Error:', err.message);
      res.status(400).json('Error: ' + err.message);
    }
  };
  
  exports.getEmail = async (req, res, next) => {
    try {
      const emails = await Email.find();
      res.status(200).json(emails);
    } catch (err) {
      console.error('Error while fetching emails:', err);
      res.status(500).json({ message: 'Error while fetching emails' });
    }
  };