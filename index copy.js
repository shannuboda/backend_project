const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const axios = require('axios')
// const _ = require('lodash');
app.use(bodyParser.json());
app.use(cors());
let marklist = ""; // For GPA CALCULATION




// CGPA RElated Variables




//  CGPA Related Variables End
// GPA CALCULATION LOGIC

const calculateGPA = (marklist, credits) => {
  let final_Gpa = 0;
  // console.log("New",credits);
  mark_credit_array = [];
  marklist.map((key, index) => {
    mark_credit_array.push([key.credits, key.grade]);
  });
  // console.log(mark_credit_array);
  mark_credit_array.map((key, index) => {
    console.log(key);
    final_Gpa = final_Gpa + key[0] * key[1];
  });
  return +(final_Gpa / credits).toFixed(2);
};

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
db2.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Connection for Semester1 database

const sem1 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER1?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem1.on("open", () => console.log("Connected to Database for Semester 1"));
sem1.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Connection for Semester2 database

const sem2 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER2?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem2.on("open", () => console.log("Connected to Database for Semester 2"));
sem2.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Connection for Semester3 database

const sem3 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER3?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem3.on("open", () => console.log("Connected to Database for Semester 3"));
sem3.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);


// Connection for Semester4 database

const sem4 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER4?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem4.on("open", () => console.log("Connected to Database for Semester 4"));
sem4.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);


// Connection for Semester5 database

const sem5 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER5?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem5.on("open", () => console.log("Connected to Database for Semester 5"));
sem5.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Connection for Semester6 database

const sem6 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER6?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem6.on("open", () => console.log("Connected to Database for Semester 6"));
sem6.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Connection for Semester7 database

const sem7 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER7?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem7.on("open", () => console.log("Connected to Database for Semester 7"));
sem7.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Connection for Semester2 database

const sem8 = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/SEMESTER8?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

sem8.on("open", () => console.log("Connected to Database for Semester 8"));
sem8.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);



// Connection for Credits database

const db_credits = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/ACADEMIC_CREDITS?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

db_credits.on("open", () =>
  console.log("Connected to Database for Semester CREDITS")
);
db_credits.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

// Route for interacting with the users database
app.get("/db1/students", async (req, res) => {
  try {
    const students = await db1.db.collection("Students").find().toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching data from SvPortalusers database:", err);
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});

app.get("/getdata/:id/:id2", async (req, res) => {
  const rno = req.params.id;
  const year = req.params.id2;
  console.log(rno, year);

  try {
    const students = await db2.db
      .collection(year)
      .find({ rollnu: rno })
      .toArray();
    res.json(students);
  } catch (err) {
    console.error("Error fetching data from SvPortalusers database:", err);
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});

//   sem data start API

app.get("/getsem1/:id/:id2/:id3/:id4/:id5", async (req, res) => {
  const rno = req.params.id;
  const year = req.params.id2;
  const semester = req.params.id3;
  const branch = req.params.id4;
  const regulation = req.params.id5;
  let credits = "";
  console.log(rno, year, semester, branch, regulation);

  const Gpa_Result = async (db_name, semester, regulation) => {
    try {
      let students = await db_name.db
        .collection(year)
        .find({ rollno: rno })
        .toArray();
      const total_credits = await db_credits.db
        .collection(regulation)
        .findOne({ branch: branch });
      if (!students.length > 0) {
        res.status(200).json({ message: "No Data Found" });
      } else {
        marklist = students[0].subjects;
        credits = total_credits[`${semester}`];
        // console.log(credits);
        let Student_GPA = calculateGPA(marklist, credits);
        // console.log(Student_GPA);
        students[0].gpa = Student_GPA;
        // console.log(students);
        res.json(students);
      }
    } catch (err) {
      console.error("Error fetching data from SvPortalusers database:", err);
      res.status(500).json({ message: "Error fetching data", error: err });
    }
  };


  
  // for sem1
  if (semester === "SEMESTER1") {
    Gpa_Result(sem1, semester, regulation);
  } else if (semester === "SEMESTER2") {
    Gpa_Result(sem2, semester, regulation);
  }
  else if (semester === "SEMESTER3") {
    Gpa_Result(sem3, semester, regulation);
  }
  else if (semester === "SEMESTER4") {
    Gpa_Result(sem4, semester, regulation);
  }
  else if (semester === "SEMESTER5") {
    Gpa_Result(sem5, semester, regulation);
  }
  else if (semester === "SEMESTER6") {
    Gpa_Result(sem6, semester, regulation);
  }
  else if (semester === "SEMESTER7") {
    Gpa_Result(sem7, semester, regulation);
  }
  else if (semester === "SEMESTER8") {
    Gpa_Result(sem8, semester, regulation);
  }
});

// supply Data Application
app.get("/getsupply/:id/:year/:semester/:branch/:regulation", async (req, res) => {
  const { id: rno, year, semester, branch, regulation } = req.params;
  console.log(rno, year, semester, branch, regulation);

  // Mapping semesters to their respective databases
  const semesterDbMap = {
    SEMESTER1: sem1,
    SEMESTER2: sem2,
    SEMESTER3: sem3,
    SEMESTER4: sem4,
    SEMESTER5: sem5,
    SEMESTER6: sem6,
    SEMESTER7: sem7,
    SEMESTER8: sem8,
  };

  // Validate semester
  const db_name = semesterDbMap[semester];
  if (!db_name) {
    return res.status(400).json({ message: "Invalid semester provided" });
  }

  try {
    let students = await db_name.db.collection(year).find({ rollno: rno }).toArray();
    
// console.log(students[0].subjects);

    if (!students.length) {
      return res.status(200).json({ message: "No Data Found" });
    }



    let failedSubjects = students[0].subjects.filter((subject) => subject.status === "F");
    if(!failedSubjects.length){
      return res.status(200).json({ message: "No Data Found" });
    }   
  let failedSubjectsCheck = failedSubjects.map((value, index) => ({
    ...value,
    checked: false,
    id: index + 1,
  }));
   
    
    res.json(failedSubjectsCheck);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});





// CGPA Calculator API

app.get("/getcgpa/:id/:id2/:id3/:id4",async (req, res) => {
  const rno = req.params.id;
  const year = req.params.id2;
  const branch = req.params.id3;
  const regulation = req.params.id4;
  let credits = "";

  let records_credits = []
  let records_gpa = []
let final_CGPA = []

  console.log(rno, year, branch, regulation);

  const Gpa_Result = async (db_name,semester, regulation) => {
   
    try {
      let students = await db_name.db
        .collection(year)
        .find({ rollno: rno })
        .toArray();
      const total_credits = await db_credits.db
        .collection(regulation)
        .findOne({ branch: branch });
      if (!students.length > 0) {
        // res.status(200).json({ message: "No Data Found" });
        return 0;
      } else {
        marklist = students[0].subjects;
        credits = total_credits[semester];
        records_credits.push(+credits)
        console.log("ssdsd",marklist);
        
        // console.log(credits);
        let Student_GPA = calculateGPA(marklist, credits);
        // console.log(Student_GPA);
        records_gpa.push(Student_GPA)

        // console.log(students);
      
      }
    } catch (err) {
      console.error("Error fetching data from SvPortalusers database:", err);
      
    }
  };

  // for sems

  for(i=1;i<=8;i++)
  {
    let dbs = [sem1,sem2,sem3,sem4,sem5,sem6,sem7,sem8]
    console.log(`SEMESTER${i}`);
    let sem = `SEMESTER${i}`
    await Gpa_Result(dbs[i-1],sem, regulation);
    
  }
  
  
// const doFinal_CGPA = ()=>{
//   records_gpa.map((key, index) => {
//     console.log(key);
//     final_CGPA = final_CGPA + records_gpa[index] * records_credits[index];
//     console.log(final_CGPA/_.sum(records_credits).toFixed(2));
    
//     return final_CGPA/_.sum(records_credits).toFixed(2)
//   });
// }

//   const data = doFinal_CGPA()
//   console.log("sum",_.sum(records_credits));
  
 res.json({records_credits,records_gpa})
 
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const students = await db1.db.collection("Students").findOne({ username });
    if (!students) {
      res.status(404).json({ message: "User Not Found" });
    } else if (students.password === password) {
      res.status(200).json({ message: "Success", students });
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  } catch (err) {
    console.error("Error fetching data from SvPortalusers database:", err);
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});


// ADMINS PROGRAMS

const ADMINS_LOGIN = mongoose.createConnection(
  "mongodb+srv://bssmani16:9z7gYDVx2XNAB3qG@cluster0.oeyyh.mongodb.net/ADMINS?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

ADMINS_LOGIN.on("open", () => console.log("Connected to Database for ADMINS"));
ADMINS_LOGIN.on("error", (err) =>
  console.error("Error connecting to Database Student File:", err)
);

app.post("/admin_login", async (req, res) => {
  const { mail, password } = req.body;
  try {
    const Admin = await ADMINS_LOGIN.db.collection("ACCESS_MEMBERS").findOne({ mail });
    if (!Admin) {
      res.status(404).json({ message: "Admin Not Found" });
    } else if (Admin.password === password) {
      res.status(200).json({ message: "Success", Admin });
    } else {
      res.status(401).json({ message: "Wrong Password" });
    }
  } catch (err) {
    console.error("Error fetching data from Admins database:", err);
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});


app.get('/get_all_student_data/:rollnumber/:year/:branch/:regulation',async (req,res)=>{
    const rollNumber = req.params.rollnumber
    const year = req.params.year
    const branch = req.params.branch;
    const regulation = req.params.regulation;
    let semestersData = {}
    try {
      const stu_data = await axios.get(`https://backend-project-1nk6.onrender.com/getdata/${rollNumber}/${year}`)
     
      for(i=1;i<=8;i++){
        let student_response= await axios.get(`https://backend-project-1nk6.onrender.com/getsem1/${rollNumber}/${year}/SEMESTER${i}/${branch}/${regulation}`)
        if(student_response.data['message']==='No Data Found')
        {
          continue
        }
        semestersData[`SEM${i}`]= student_response.data
        
      }

     res.json({studentData:stu_data.data,SEM_DATA:semestersData})
    } catch (error) {
      console.log(error);
      
    }
    
  
  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
