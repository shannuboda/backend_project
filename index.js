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

db1.on("open", () => console.log("Connected to Database Users"));
db1.on("error", (err) => console.error("Error connecting to Database 1:", err));

// MongoDB connection for the second database
const db2 = mongoose.createConnection(
    "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/Students_File?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  db2.on("open", () => console.log("Connected to Database Student File"));
  db2.on("error", (err) => console.error("Error connecting to Database Student File:", err));
  

// Connection for Semester1 database

const db3 = mongoose.createConnection(
    "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER1?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  db3.on("open", () => console.log("Connected to Database for Semester 1"));
  db3.on("error", (err) => console.error("Error connecting to Database Student File:", err));
  

// Connection for Semester2 database

const db4 = mongoose.createConnection(
    "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER2?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  db4.on("open", () => console.log("Connected to Database for Semester 2"));
  db4.on("error", (err) => console.error("Error connecting to Database Student File:", err));
  

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



//   sem 1 data start API

app.get('/getsem1/:id/:id2/:id3', async (req, res) => {
    const rno = req.params.id
    const year = req.params.id2
    const semester = req.params.id3
    console.log(rno,year,semester);
    // for sem1
    if(semester==="SEMESTER1")
    {
        try {
            const students = await db3.db.collection(year).find({"rollno":rno}).toArray();
            if(!students.length>0)
            {
              res.status(200).json({ message: 'No Data Found' });
            }
            else{
              res.json(students);
            }
           
          } catch (err) {
            console.error('Error fetching data from SvPortalusers database:', err);
            res.status(500).json({ message: 'Error fetching data', error: err });
          }
    }
    else if(semester==="SEMESTER2"){
        try {
            const students = await db4.db.collection(year).find({"rollno":rno}).toArray();
            if(!students.length>0)
            {
              res.status(200).json({ message: 'No Data Found' });
            }
            else{
              res.json(students);
            }
           
          } catch (err) {
            console.error('Error fetching data from SvPortalusers database:', err);
            res.status(500).json({ message: 'Error fetching data', error: err });
          }
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
