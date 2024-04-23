const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors")
app.use(cors());

const userRoutes = require("./routes/userRoutes")

app.use(express.json());

mongoose.connect(process.env.URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(process.env.PORT || 5000, (error) => {
      if (error) console.log(error);
      console.log(`Server is Running On Port ${process.env.PORT || 5000}`);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });





app.use(userRoutes);