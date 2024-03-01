const express=require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const app=express();
const cors=require("cors")

app.use(express.json())
app.use(cors())


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
    allTodo:allTodo
   })
})
app.put("/todos/:id/completed", async (req, res) => {
    const todoId = req.params.id;
    const updatePayload = req.body;
    try {
      await todo.update({ _id: todoId }, { completed: true });
  
      res.json({
        msg: "Todo marked as completed"
      });
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      res.status(500).json({
        msg: "Internal server error"
      });
    }
  });
  
app.listen(8080)