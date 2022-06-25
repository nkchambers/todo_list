import React, {useState} from 'react'


const ToDo = () => {


    //creating state variable for each input way
    // let [task, setTask] = useState("")
    // let [dueDate, setDueDate] = useState("")
    // let [location, setLocation] = useState("")


    // 1 - creating an object to keep track of form info and give it keys that correlate to form inputs I want to collect info from
    // Make sure that these keys are also used as the names of the inputs in the form! No matching no working 
    let [taskObj, setTaskObj] = useState({
        task:"",
        dueDate: "",
        location: "",
        isComplete: false
    })


    // Create state variable array to store all the to-do task objects 
    let [listOftasks, setListOfTasks] = useState([])


    // 2 - create a function that we can attach to the onChange event listeners
    const changeHandler = (e) => {
        console.log("logging e-->", e.target.name)

        setTaskObj({
            ...taskObj, 
            [e.target.name]: e.target.value
        })
    }


    //3 - when the form submits, run this function below
    const addTask = (e) => {
        e.preventDefault(); //prevent the form submission from reloading the whole page

        console.log("submitting the task!!", taskObj)

        //add the taskObj containing the information collected from the form into an array of tasks
        setListOfTasks([...listOftasks, taskObj])

        // to clear out form
        // step 1: clear out the state variable that collects the form info
        setTaskObj({
            task:"",
            dueDate: "",
            location: "",
            isComplete: false
        })

        // step 2: give each input a value that is connected to this state variable
    }


    // toggle task isComplete property
    const toggleTaskComplete = (indexNum) => {
        console.log("toggling the task at index-->", indexNum)

        // to modify the arry of tasks we will make a copy of the array first
        let [...copyOfList] = listOftasks;

        // modify the copy at specific index number
        copyOfList[indexNum].isComplete = !copyOfList[indexNum].isComplete;

        // update our state variable with this modified copy
        setListOfTasks(copyOfList);
    }


    // deleting a task
    const deleteTask = (indexNum)=>{
        console.log("deleting the task at index-->", indexNum)

        // use filter to delete. filter through the array of tasks and only return the ones whose index number does not match the indexNum of the task we want to delete
        let newList = listOftasks.filter((taskObj, i)=>{
            return i !== indexNum
        })

        // update the state variable with this new filtered list that contains one less task
        setListOfTasks(newList);

    }



    return (
        <div>
            <h2 style={{marginTop: "50px", textDecoration:"underline"}}>Add Task Below</h2>
            
            <form onSubmit={addTask}>
                <div className="form-group mt-4 mb-3">
                    <label htmlFor="" style={{fontSize: "24px", marginRight: "50px"}}>Task:</label>
                    <input onChange = {changeHandler} type="text" name="task" id="" className="form-control-lg" value={taskObj.task} style={{marginLeft: "10px"}}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" style={{fontSize: "24px", marginRight: "50px"}}>Due Date:</label>
                    <input onChange = {changeHandler} type="date" name="dueDate" id="" className="form-control-lg" value={taskObj.dueDate} style={{marginLeft: "10px"}}/>
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="" style={{fontSize: "24px"}}>Location:</label>
                    <input onChange = {changeHandler} type="text" name="location" id="" className="form-control-lg" value={taskObj.location} style={{marginLeft: "10px"}}/>
                </div>
                <input type="submit" value="Add Task" className="btn btn-success btn-lg mb-5" style={{marginLeft: "250px"}}/>
            </form>


            <hr />
            <hr style={{marginBottom: "100px", marginTop: "50px"}}/>

            <h2 style={{marginTop: "50px", marginBottom: "20px", textDecoration:"underline"}}>Task Items</h2>
            <hr />

            {
                listOftasks.map((taskItem, i)=>{
                    return (
                        <div key={i} style={{textDecoration: taskItem.isComplete? "line-through": ""}}>
                            <h4>{taskItem.task}</h4>
                            <p>Due Date: {taskItem.dueDate}</p>
                            <p>Location: {taskItem.location}</p>
                            <p><input onClick = {()=>toggleTaskComplete(i)} type="checkbox" name="" id=""/></p>
                            <p>{taskItem.isComplete===true? "Completed! Great work": "Not yet"}</p>
                            <p><button onClick = {()=>deleteTask(i)} className="btn btn-danger mb-3">Delete Task</button></p>
                            <hr />
                        </div>
                    )
                })
            }

        </div>
    );
};

export default ToDo;