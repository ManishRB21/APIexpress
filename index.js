const express = require ('express')
const bodyParser = require('body-parser')
const students = require('./students')
const app = express()

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json({message:"api working"})
})

app.get('/student',(req,res)=>{
    res.json(students)
})

app.post('/student',(req,res)=>{
    //console.log(req.body)

    if(!req.body.email){
        res.status(400)
        return res.json({error:"email required"})
    }

    const user= { 
        id: students.length+1,
        first_name : req.body.first_name,
        email: req.body.email
    }
    students.push(user);
    res.json(user);
})

app.put('/student/:id',(req,res)=>{
    let id = req.params.id
    let first_name = req.body.first_name
    let email= req.body.email
    
    let index=students.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })

    if(index>=0){
        let std = students[index]
        std.first_name=first_name
        std.email=email
        res.json(std)
    }else{
        res.status(404)
    }

    // console.log(id)
    // res.json(id)
})


app.delete('/student/:id',(req,res)=>{
    let id = req.params.id
    let index=students.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })

    if(index>=0){
        let std = students[index]
        students.splice(index,1)
        res.json(std)
    }else{
        res.status(404)
        res.end()
    }
    
})


app.listen('3000',(req,res)=>{
    console.log("connected")
})