const express = require('express'); 
const nodemailer = require('nodemailer'); 
const app = express(); 
const port = 3000; 

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle GET request to render the contact form
app.get('/contact', (req, res) => {
  // Send the contact form HTML file
  res.sendFile(__dirname + '/public/contact.html');
});

// Handle POST request to process form submissions
app.post('/contact', (req, res) => {
  // Extract form data from the request body
  const { name, email, message } = req.body;

  // Create a nodemailer transporter using your email service provider's settings
  const transporter = nodemailer.createTransport({
    service: 'YourEmailService', 
    auth: {
      user: 'youremail@example.com', 
      pass: 'yourpassword', 
    },
  });

  // Email configuration
  const mailOptions = {
    from: 'youremail@example.com', 
    to: 'recipient@example.com', 
    subject: 'Contact Form Submission', 
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Handle errors when sending email
      console.log('Error sending email: ' + error);
      res.status(500).send('Error sending email');
    } else {
      // Email sent successfully
      console.log('Email sent: ' + info.response);
      res.send('Thank you for contacting us! Your message has been sent.');
    }
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
