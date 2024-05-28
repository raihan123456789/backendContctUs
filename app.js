const express = require('express'); 
const app = express(); 
const port = 3000; 
const db = require('./db/index')
const Feedback = db.feedback
const bodyParser = require('body-parser')
const cors = require("cors")

// Middleware 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for contact form input validation
function validateFeedback(req, res, next) {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Semua kolom harus diisi.' });
  }
  next();
}

// Endpoint to store feedback (POST request)
app.post("/proses_feedback", validateFeedback, async (req, res) => {
  try {
    const { firstName, lastName , email, phone, message } = req.body;
    // Save feedback to database using Sequelize model
    await Feedback.create({ firstName, lastName, email, phone, message });
    res.status(201).json({ message: 'Message berhasil dikirim.' });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

app.get('/proses_feedback', async (req, res) => {
  try {
    const feedback = await Feedback.findAll()
    res.status(201).json({
      success: true,
      message: "Successful",
      data: feedback
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unsuccessful"
    })
  }
});

// Database Synchronization
async function startdb(){
  try {
    await db.sequelize.sync({ alter: true })
    console.log("database connected")
  } catch (error) {
    console.log("database not connected")
  }
}

startdb()

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
