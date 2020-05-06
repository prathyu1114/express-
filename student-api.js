const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let students = [{

     "studentID":1001,
     "studentName": "prathyusha",
     "studentPhn": 9347443492,
     "studentGrade" : "A",
     "courseDet":"Angular"
     

},{
    "studentID":1002,
    "studentName": "akhila",
    "studentPhn": 93474541492,
    "studentGrade" : "O",
    "courseDet":"Javascript"
},{
    "studentID":1003,
    "studentName": "mounika",
    "studentPhn": 949015292,
    "studentGrade" : "A",
    "courseDet":"Node JS"
}]
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post('/student',(req,res)=>
{
    const student = req.body;
    console.log(student);
    students.push(student);
    res.send("Student details has been added to the database!");
});

app.get('/student',(req,res)=>{
    res.json(students);
});
app.get('/student/:studentID',(req,res)=>{
    const studentID = req.params.studentID;

    for(let student of students)
    {
        if(student.studentID == studentID)
        {
            res.json(student);
            return;
        }
    }
    res.status(404).send("Student details not Found!");
});
app.post('/student/:studentID',(req,res)=>{
    const studentID = req.params.studentID;
    const newstudent = req.body;

    for(let i=0;i < students.length; i++)
    {
        let student = students[i];
        if(student.studentID === studentID)
        {
            students[i] = newstudent;
        }
    }
    res.send("Student details are edited!");
});
app.delete('/student/:studentID',(req,res)=>
{
    const studentID = req.params.studentID;
    students = students.filter(i=>{
        if(i.studentID!= studentID)
        {
            return true;
        }
        return false;
    });
    res.send("Student details are deleted!");

});
app.put('/student/:studentID',(req,res)=>{
    const studentID = req.params.studentID;
    const newstudent = req.body;

    for(let i=0;i < students.length; i++)
    {
        let student = students[i];
        if(student.studentID === studentID)
        {
            student[i] = newstudent;
        }
    }
    res.send("Student details are edited!");
});

app.listen(port,()=>
console.log(`Hello world,Listening to port ${port}!`));