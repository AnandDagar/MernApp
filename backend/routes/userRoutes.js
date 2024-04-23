const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/UserModel')
const router = express.Router();




//ceate
//Why post method => because we put data into database
router.post('/', async (req,res)=>{
    const {name, email,age} = req.body
    //data we put into database
  
  try{
    const userAdded = await User.create({
      name,
      email,
      age,
    });
    res.status(201).json(userAdded)
  }catch(error){
    console.log(error);
    res.status(400).json({error:error.message});
  }
  
  })
  
  // Define a route to handle GET requests for fetching user data
  router.get('/', async (req, res) => {
    try {
      // Fetch all users from the database
      const showAll = await User.find();
      
      // Send the users as a response
      res.status(200).json(showAll);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



    // get Single User
    router.get('/:id', async (req, res) => {

      const {id} = req.params;
      try {
       
        const SingleUser = await User.findById({_id : id});
        
        // Send the users as a response
        res.status(200).json(SingleUser);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


    //delete

    router.delete('/:id', async (req, res) => {

      const {id} = req.params;
      try {
       
        const SingleUser = await User.findByIdAndDelete({_id : id});
        
        // Send the users as a response
        res.status(200).json(SingleUser);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


        //put/patch
        //patch means edit
        //because of pathc method we put also (body prperty because user edit the detail)
        router.patch('/:id', async (req, res) => {
          const { id } = req.params;
          const { name, email, age } = req.body;
      
          try {
              // Check if any fields are being updated
              if (!name && !email && !age) {
                  return res.status(400).json({ error: "At least one field (name, email, age) must be provided for update." });
              }
      
              // Check if ID is valid
              if (!mongoose.Types.ObjectId.isValid(id)) {
                  return res.status(400).json({ error: "Invalid user ID." });
              }
      
              // Check if user exists
              const existingUser = await User.findById(id);
              if (!existingUser) {
                  return res.status(404).json({ error: "User not found." });
              }
      
              // Update user
              if (name) existingUser.name = name;
              if (email) existingUser.email = email;
              if (age) existingUser.age = age;
      
              const updatedUser = await existingUser.save();
      
              // Send the updated user as a response
              res.status(200).json(updatedUser);
          } catch (error) {
              console.error(error);
              res.status(500).json({ error: "Internal Server Error" });
          }
      });
      



  module.exports = router;