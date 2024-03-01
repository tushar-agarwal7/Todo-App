const express=require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const port=8080;
const app=express();
app.use(express.json())

app.post("/todo",async(req,res)=>{
   const createPayLoad=req.body;
   const parsePayLoad=createTodo.safeParse(createPayLoad);
   if(!parsePayLoad.success){
    res.status(400).json({
        msg:"you sent the wrong inputs"
    })
    return;
   }
  await todo.create({
   title: createPayLoad.title,
   description:createPayLoad.description,
  })
  res.json({
    msg:"todo created"
  })
})

app.get("/todos",async(req,res)=>{
   const allTodo=await todo.find({});
   res.json({
    allTodo
   })
})

app.put("/completed",async(req,res)=>{
  
    const updatePayLoad=req.body;
    const parseUpdateLoad=updateTodo.safeParse(updatePayLoad);
    if(!parseUpdateLoad.success){
        res.status.json({
            msg:"Ypu sent the wrong inputs"
        })
        return;
    }
    await todo.update({
       _id:req.body.id
    },{
        completed:true,
    })
    res.json({
        msg:"Todo marked as completed"
    })
})

app.listen(`App is lisstning on port${port}`)