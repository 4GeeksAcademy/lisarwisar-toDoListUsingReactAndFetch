import React, { useState, useEffect} from 'react';

function ToDoList () {
    const [taskList, setTaskList] = useState([]);
    const [inputPlaceholder, setInputPlaceholder] = useState("No tasks, add a task");
    
    CreateUser();
    
    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Lisarwisar')
        .then((response) => response.json())
        .then(data => setTaskList(data))
      }, []);


    return(
        <div>
            <div className="card rounded-0">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item px-5">
                        <input
                            type="text" className="toDoListInput w-100" placeholder={inputPlaceholder}
                            onKeyUp={(e) =>{
                            if (e.key === "Enter" && e.target.value != ""){
                                let auxTaskList = taskList.concat({ label: e.target.value, done: false});
                                setTaskList(auxTaskList);
                                UpdateList(auxTaskList);
                                setInputPlaceholder("What needs to be done?");
                            }
                            }}
                        />
                    </li>
                    {
                        taskList.map(t => (
                        <li className="list-group-item px-5 d-flex">
                            <div className="w-100">
                                {t.label}
                            </div>
                            <span className="img-show-on-hover" onClick={(e)=>{
                                let auxTaskList = DeleteTask(t, taskList);
                                setTaskList(auxTaskList);
                                UpdateList(auxTaskList);
                                if(taskList.length == 1){
                                    setInputPlaceholder("No tasks, add a task");
                                };
                            }}>&times;</span>
                        </li>))
                    }
                    <li className="list-group-item list-item-counter"><small>{taskList.length} item left</small></li>
                </ul>
            </div>
            <div className="rounded-0 card list-bottom-deco-1 m-auto"></div>
            <div className="rounded-0 card list-bottom-deco-2 m-auto"></div>
            <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-danger my-3" onClick={() => {
                setTaskList([]);
                UpdateList([{label: "example", done: false}]); // API does not accept empty list
            }}>Delete all tasks</button>
            </div>
        </div>
    );
}

function DeleteTask (task, listTasks) {
    let newListTasks = [];
        for (let item of listTasks){
            if (item != task){
                newListTasks.push(item);
            }
        }
        return newListTasks;

}

async function UpdateList (todos) {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Lisarwisar', {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
          console.log(resp.status); // el código de estado = 200 o código = 400 etc.
          console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
          return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
          //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
          //manejo de errores
          console.log(error);
      });
};

async function CreateUser () {
    await fetch('https://playground.4geeks.com/apis/fake/todos/user/Lisarwisar', {
        method: "POST",
        body: JSON.stringify([]),
        headers: new Headers({
          "Content-Type": "application/json"
        })
    })
    .then (response => {
        console.log(response.ok);
        console.log(response.status);
        console.log(response.text);
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })

};

export default ToDoList;