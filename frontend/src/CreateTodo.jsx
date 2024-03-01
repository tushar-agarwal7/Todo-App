import { useState } from "react"

export default function CreateTodo(props){
  
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")



    return (
        <div>
            <input type="text" id="title"  onChange={function(e){
                const value=e.target.value;
                setTitle(value)
            }} 
             placeholder="title"  style={{padding:10,margin:10}} /><br />
            <input type="text" id="description" onChange={function(e){
                const value=e.target.value;
                setDescription(value)
            }} placeholder="description" style={{padding:10,margin:10}} /><br />
            <button onClick={()=>{
                fetch("http://localhost:8080/todo",{method:"POST",body:JSON.stringify({
                    title:title,
                    description:description
                }),
                headers:{
                    "ContentType":"application/json"
                }
            })
            .then(async(res)=>{
                const json=await res.json();
                alert("Todo Created")
            })
            props.setTodos([...todos,{title,description}])
            }} >Add a Todo</button>
        </div>
    )
}