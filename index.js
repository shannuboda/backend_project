const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection for the first database
const db1 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SV_Student_Users?retryWrites=true&w=majority", 
  { useNewUrlParser: true, useUnifiedTopology: true }
);

db1.on("open", () => console.log("Connected to Database 1"));
db1.on("error", (err) => console.error("Error connecting to Database 1:", err));

// MongoDB connection for the second database
const db2 = mongoose.createConnection(
    "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/Students_File?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  db2.on("open", () => console.log("Connected to Database 2"));
  db2.on("error", (err) => console.error("Error connecting to Database 2:", err));
  

// Example route for interacting with the second database
app.get('/db1/students', async (req, res) => {
    try {
      const students = await db1.db.collection('Students').find().toArray();
      res.json(students);
    } catch (err) {
      console.error('Error fetching data from SvPortalusers database:', err);
      res.status(500).json({ message: 'Error fetching data', error: err });
    }
  });
  app.get('/getdata/:id/:id2', async (req, res) => {
    const rno = req.params.id
    const year = req.params.id2
    console.log(rno,year);
    
    try {
      const students = await db2.db.collection(year).find({"rollnu":rno}).toArray();
      res.json(students);
    } catch (err) {
      console.error('Error fetching data from SvPortalusers database:', err);
      res.status(500).json({ message: 'Error fetching data', error: err });
    }
  });



  app.post("/login",async(req,res)=>{
   
    const {username,password} = req.body
    try {
        const students = await db1.db.collection('Students').findOne({username});
        if(!students)
        {
            res.status(404).json({"message":"User Not Found"})
        }
        else if(students.password===password)
        {
            res.status(200).json({"message":"Success",students})
        }
        else{
            res.status(401).json({"message":"Wrong Password"})
        }
      } catch (err) {
        console.error('Error fetching data from SvPortalusers database:', err);
        res.status(500).json({ message: 'Error fetching data', error: err });
      }
    
    
  })

  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
