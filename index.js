const express = require('express');
const app = express();
const fs = require('fs');


app.get('/', (req, res)=>{
   res.json({message:" this is the base page"})
});

app.get('/class/add', (req,res)=>{
    const {query} = req
 let name = req.query.name;
 let age = req.query.age;
 let subject = req.query.class;
 let grade = req.query.grade;
 let city = req.query.city;


fs.readFile(`./classes/${subject}.json`, 'utf8', (err, data)=>{
    console.log(data)
   if (err) {
    const student = {
        students: [{
            name,
            age,
            city,
            grade
        }]
    }
    fs.writeFile(`./classes/${subject}.json`, JSON.stringify(student), err => {});
 } else {
     let newStud = JSON.parse(data)
     console.log("list of stude", newStud)
     for(let i = 0; i < newStud.students.length; i++){
         console.log(newStud.students[i])
         //newStud.students
     }

 }
});

  res.json({added: {name: query.name, age: query.age, subject: query.class, grade: query.grade, city: query.city},
                   class: query.class})
});

app.get('/class/list', (req, res)=>{
    let subject = req.query.class; 
    fs.readFile(`./classes/${subject}.json`, 'utf8',(err,data)=>{
        if(err){
            res.json({error: `Class ${subject} does not exist`})
        } else {
            res.json(JSON.parse(data))
        
        }
    });
});


app.listen(process.env.port || 3000)
console.log("listening");