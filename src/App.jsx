import React, {Fragment, useState, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.css';
import { FaFileSignature } from "react-icons/fa";
import {Header} from './layouts/Header';
import {Footer} from './layouts/Footer';
import {TodoTable} from './components/TodoTable';
import {TodoForm} from './components/TodoForm';

const taskCollection = 'tasks';

export function App(){
  const [todos, setTodos] = useState([]);
  const [styleButtom, setStyleButtom] = useState({
    "btnAdd":{styleB: "btn-primary", textB: "Agregar"},
    "btnCancel": {view: "d-none"}
  });

  const idRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const addEditRef = useRef();
  const el_title = document.getElementById("txt-title");
  const el_description = document.getElementById("txt-description");
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(taskCollection));
    if(storedTodos){
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(taskCollection, JSON.stringify(todos));
  }, [todos]);

  /*****************
   FUNCTION FORM
   ******************/
  const createTask = () => {
    if(addEditRef.current.getAttribute("data-action") !== "create") return;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if(title === "" || description === '') return;
 
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), title, description, completed: false}];
    });
 
    idRef.current.value="";
    titleRef.current.value="";
    descriptionRef.current.value="";
  }
 
  const destroyAllTask = () =>{
    if(window.confirm("Usted esta apunto de eliminar varios registros, recuerde que no podra revertir esta accion.")){
      const newTodos = todos.filter(todo => !todo.completed);
      setTodos(newTodos);
    }
  }
 
  const updateTask = () => {
    if(addEditRef.current.getAttribute("data-action") !== "edit") return;
    const id = idRef.current.value;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    
    const getAllTodos = [...todos];
    const todo = getAllTodos.find(todo => todo.id === id);
    const exceptTodos = getAllTodos.filter(todo => todo.id !== id);
    
    setTodos([...exceptTodos, {id: todo.id, title, description, completed: todo.completed}]);
 
    addEditRef.current.setAttribute("data-action", "create");
    idRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    setStyleButtom({
      "btnAdd":{styleB: "btn-primary", textB: "Agregar"},
      "btnCancel": {view: "d-none"}
    });
  }
 
  const maxValue = {
    title: 50,
    description: 200
  }
  
  const countValueTitle = () => {
    el_title.innerHTML = `${titleRef.current.value.length} /  ${maxValue.title}`;
  }
 
  const countValueDescription = () => {
    el_description.innerHTML = `${descriptionRef.current.value.length} /  ${maxValue.description}`;
  }
 
  const handleActionCancel = () => {
    setStyleButtom({
      "btnAdd":{styleB: "btn-primary", textB: "Agregar"},
      "btnCancel": {view: "d-none"}
    });
 
    addEditRef.current.setAttribute("data-action", "create");
    idRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    el_title.innerHTML = `0 /  ${maxValue.title}`;
    el_description.innerHTML = `0 /  ${maxValue.description}`;
  }
  
  /*****************
  FUNCTION TABLE 
  ******************/
  const updateTaskStatus = id => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const deleteTask = id => {
    if(window.confirm("Usted esta apunto de eliminar este registro, recuerde que no podra revertir esta accion.")){
      const newTodos = [...todos];
      const todo = newTodos.filter(todo => todo.id !== id);
      setTodos(todo);
    }
  }

  const editTask = id => {
    setStyleButtom({
      "btnAdd":{styleB: "btn-success", textB: "Actualizar"},
      "btnCancel": {view: "d-inline"}
    });
    addEditRef.current.setAttribute("data-action", "edit");
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    
    idRef.current.value = todo.id;
    titleRef.current.value = todo.title;
    descriptionRef.current.value = todo.description;

    el_title.innerHTML = `${titleRef.current.value.length} /  ${maxValue.title}`;
    el_description.innerHTML = `${descriptionRef.current.value.length} /  ${maxValue.description}`;
  }

  
  /*******************
  STRUCTURING METHODS AND VARIABLES
  **********************/
  const referensForm = {
    idRef,
    titleRef,
    descriptionRef,
    addEditRef
  }

  const variables = {
    styleButtom,
    maxValue
  }

  const methodForm = {
    createTask,
    updateTask,
    destroyAllTask,
    handleActionCancel,
    countValueTitle,
    countValueDescription
  }

  const methodTable = {
    updateTaskStatus,
    deleteTask,
    editTask
  }

  return (
    <Fragment>
      <Header/>
      <div className="container-xl"> 
        <h2 className="mt-4 mb-4 text-center"><FaFileSignature/> Gesti&oacute;n de tareas </h2>
        <div className="row">
        <TodoForm todos={todos} references={referensForm} methods={methodForm} variables={variables} />

        <TodoTable todos={todos} methods={methodTable}/>

        <Footer/>
        </div>
      </div>
    </Fragment>
  );
}