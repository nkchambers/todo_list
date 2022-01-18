import './App.css';
import React, { useState } from 'react';

function App() {

  /*
    Below array destructure snytax is equivalent to:
    const NewToDoStateArr = useState("");
    const NewToDo = NewToDoStateArr[0];
    const setNewToDo = NewToDoStateArr[1];

    This violates DRY rule by repeating NewToDoStateArr 3 times!
    Use concise method below!
  */

  // --------------STATE VARIABLES----------------

  // 1st State var - New To-Do Task which can change/update
  const [NewToDo, setNewToDo] = useState("");
  
  // 2nd State var - list of To-Do's that will be updated
  const [ToDos, setToDos] = useState([]);



  // Create Handle Submit TO-DO Event
  const handleNewToDoSubmit = (event) => {
    //using react is faster so no need to refresh page (prevent default behavior)
    event.preventDefault();


    if(NewToDo.length === 0) {
      return;
    }
    
    //Use dictionary to provide names when storing To-Do Items and whether or not completed is true 
    const ToDoItem = {
      text: NewToDo,
      complete: false
    };


    // Set ToDos and pass in a new array/list containing all current ToDos plus 1 more
    setToDos([...ToDos, ToDoItem]);


    //Reset NewToDo State back to empty input
    setNewToDo("");
    

    // Log To-Do to console to test if input is working on submit
    console.log(NewToDo);
  };


  
  // Create Handle Delete TO-DO Event
  const handleToDoDelete = (delIdx) => {
    const filteredToDos = ToDos.filter((ToDo, i) => {
      return i !== delIdx;
    });

    setToDos(filteredToDos);
  };


  // Create Handle Task Complete TO-DO Event
  const handleTaskComplete = (idx) => {
    const updatedToDos = ToDos.map ((ToDo, i) => {
      if (idx === i) {
        ToDo.complete = !ToDo.complete;
        
        // To avoid mutating the ToDo directly by using spread operator to copy all item key value pairs and/or arrays
          // const updatedToDo = { ...ToDo, complete: !ToDo.complete }
          // return updated ToDo;
      }

      return ToDo;
    });

    setToDos(updatedToDos);
  }




  return (
    <div style={{ textAlign: "center" }}>
      
      <fieldset>
        <legend>Form</legend>

          <h1>TO-DO FORM</h1>

          <form 
            onSubmit={(event) => {
              handleNewToDoSubmit(event)
            }}
          >
            <input 
              onChange={(event) => {
                setNewToDo(event.target.value);
              }} 
              type="text" 
              value={NewToDo} 
            />
            <div>
              <button>Add TO-DO</button>
            </div>
          </form> 
      </fieldset>
      

      <br/><br/>
      <hr /><hr />
      <br/><br/>

              
      <fieldset>
        <legend>List</legend>

          <h1>TO-DO LIST</h1>

          {
            ToDos.map( (ToDo, i) => {
              const ToDoClasses = ['bold', 'italic'];

              if(ToDo.complete) {
                ToDoClasses.push('line-through');
              }
              return (
                
                // Each New ToDo is child of ToDos List and needs its own index key/div to display 
                <div key={i}> 

                  <input onChange={(event) => {
                      handleTaskComplete(i);
                    }} 
                    checked={ToDo.complete} 
                    type="checkbox" 
                  />

                  <span className={ToDoClasses.join(" ")}>{ToDo.text}</span>
                  
                  
                  <button style={{ marginLeft: "10px" }} 
                    onClick={(event) => {
                      handleToDoDelete(i);
                    }}
                  >
                    Delete
                  </button>

                </div>
              ); 
            })
          }
      </fieldset>

    </div>
  );
}

export default App;
