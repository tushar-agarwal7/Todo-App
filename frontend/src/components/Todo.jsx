export default function Todo({todos}){
    return(
        <div>
         {todos.map((todo,index)=>{
         return  <div key={index}>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={()=>{
                    fetch("http://localhost:8080/completed",{
                        method: "PUT",
                        body: JSON.stringify({
                        completed:true
                        }),
                        headers: {
                          "Content-Type": "application/json"
                        }
                })
                }} >{ todo.completed===true?"Completed":"Mark As Complete"}</button>
            </div>
})}
        </div>
    )
}