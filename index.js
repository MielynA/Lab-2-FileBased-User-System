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
//for(let i =0; i < query.length; i++){
   
    if(name === "" || age === "" || subject === "" || grade === "" || city === ""){
        res.json({message: "Please fill out all the information for the student"})
        return;
     } //else if(name === Number){   // if they enter number 1. this is a string convert it first to num or how will read it 
    //     res.json({error: 'error'})
    // }
//}

fs.readFile(`./classes/${subject}.json`, 'utf8', (err, data)=>{
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
    console.log(student)
 } else {
     let addedStud = JSON.parse(data)
     console.log("list of stude", addedStud)
     let newStud = true
     //if the student exists dont add it to the file
     for(let i = 0; i < addedStud.students.length; i++){
         console.log("line 37", addedStud.students[i])
         if(addedStud.students[i].name === name ){
             addedStud.students.splice(i, 1, {
                 name, age, city, grade
             })
            newStud = false;
        }
     }
      // if the newStudent does not exist yet.. push it to the file
     if(newStud){
       addedStud.students.push({name,age,city,grade})
     }
     fs.writeFile(`./classes/${subject}.json`, JSON.stringify(addedStud), err => {});
 }
   
});

  res.json({added: {name: query.name, age: query.age, subject: query.class, grade: query.grade, city: query.city},
                   class: query.class})
});

app.get('/class/list', (req, res)=>{
    const subject = req.query.class; 
    fs.readFile(`./classes/${subject}.json`, 'utf8',(err,data)=>{
        if(err){
            res.json({error: `Class ${subject} does not exist`})
        } else {
            res.json(JSON.parse(data))
        
        }
    });
});

app.get('/class/listfailing', (req, res)=>{
   const subject = req.query.class; 
   fs.readFile(`./classes/${subject}.json`, 'utf8', (err, data)=>{
      if(err){
          res.json({error: `Class ${subject} does not exist`})
      } else {
          let studData = JSON.parse(data)
          console.log('line 85',studData)
          let newArr = [];
          for(let i = 0; i < studData.students.length; i++){
              console.log(studData.students[i].grade)
              if(studData.students[i].grade <= 50){
                  newArr.push(studData.students[i])
              }
          } 
          res.json({students: newArr})
      }
   });
});
app.get('./classes/listfromcity', (req, res)=>{
    const subject = req.query.class;
    const city = req.query.city; 
    
});

app.listen(process.env.port || 3000)
console.log("listening");