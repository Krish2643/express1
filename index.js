
const express = require('express');
const app = express();
const port = 3000;
const students = require('./student');

app.use(express.json());
app.use(express.static('./public'));
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
      res.send("hello world !");
})

app.get('/about', (req, res)=>{
    res.render("about", {
        msg : " This is about page"
    });
})

app.get('/api/students', (req, res)=>{
     res.json(students);
})

app.post('/api/students', (req, res)=>{
    const user = {
        id : students.length +1 ,
        first_name : req.body.fname,
        last_name : req.body.lname,
    }

     students.push(user);
     res.json(user);
})

app.put('/api/students/:id', (req, res)=>{
    let id = req.params.id;
    let fname = req.body.fname;
    let lname = req.body.lname;

     let index = students.findIndex(student =>{
        return student.id == Number.parseInt(id);
     })
     
     if(index >= 0){
        let std = students[index];
        std.first_name = fname;
        std.last_name = lname;
        res.json(std);
     }else{
        res.status(404);
        res.end();
     }       
})

app.delete('/api/students/:id', (req, res)=>{
    let id = req.params.id;
    let index = students.findIndex(student =>{
        return student.id == Number.parseInt(id);
     })

     if(index >=0){
          let std = students[index];
          res.json(std);
          students.splice(index, 1);
     }else{
        res.status(404);
        res.end();
     }
})

app.listen(port, ()=>{
    console.log(`example to listening on port ${port}`);
})