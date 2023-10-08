const express = require('express'); 
const app = express(); 
const port = 3000; 
const db = require('./db/index')
const Catalog = db.catalog
const bodyParser = require('body-parser')
const cors = require("cors")

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


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
    await db.Feedback.create({ firstName, lastName, email, phone, message });
    res.status(201).json({ message: 'Feedback berhasil disimpan.' });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});


// Handle GET Request for Catalog Items
app.post('/api/catalog', async(req, res) => {
  // Extract form data from the request body
  // const { name, price, rebate, photo } = req.body;
  const item = req.body
  console.log(item)
  try {
    const catalogcreate = await Catalog.create(item)
    res.status(201).json({
      success:true,
      message:"Successful",
      data:catalogcreate
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Usuccessful"
    })
  }
})


app.get('/api/catalog', async(req, res) => {
  try {
    const catalogs = await Catalog.findAll()
    res.status(201).json({
      success:true,
      message:"Successful",
      data:catalogs
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Usuccessful"
    })
  }
})

// Database Synchronization
async function startdb(){
  try {
    await db.sequelize.sync({alter:true})
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

