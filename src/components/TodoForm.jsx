import React from 'react';
import { FaPlus, FaTrashAlt, FaExclamationCircle, FaWindowClose} from "react-icons/fa";

export function TodoForm({todos, references, methods, variables}){
  const {idRef, titleRef, descriptionRef, addEditRef} = references;
  const {createTask, updateTask, destroyAllTask, handleActionCancel, countValueTitle, countValueDescription} = methods;
  const {styleButtom, maxValue} = variables;
  
  const handleSelectAction = () => {
    if(addEditRef.current.getAttribute("data-action") === 'create'){
      createTask();
    }
    else{
      updateTask();
    }
  }

  const maxTA = {
    maxHeight: "150px",
    minHeight: "100px",
  }

  return (
    <div className="col-sm-4 border rounded pt-4 pb-3">
      <small className={`btn btn-secondary ${styleButtom.btnCancel.view}`} style={{fontSize:"8pt"}} onClick={handleActionCancel}><FaWindowClose/> Cancelar accion</small>
      <input type="hidden" ref={idRef} />
      <div className="form-group mt-4 mb-4">
        <input ref={titleRef} type="text" className="form-control" placeholder="Titulo | max:50" maxLength={maxValue.title} onKeyUp={countValueTitle} />
        <small className="d-block text-primary" id="txt-title">0 / {maxValue.title}</small>
      </div>
      <div className="form-group mt-4 mb-4">
        <textarea ref={descriptionRef} className="form-control" placeholder="Descripcion | max:200" maxLength={maxValue.description} style={maxTA} onKeyUp={countValueDescription}></textarea>
        <small className="text-primary" id="txt-description">0 / {maxValue.description}</small>
      </div>
      <button ref={addEditRef} className={`btn ${styleButtom.btnAdd.styleB} mb-3 text-center w-100`} onClick={handleSelectAction} data-action="create"><FaPlus /> {styleButtom.btnAdd.textB}</button>
      <small className="d-block"><FaExclamationCircle/> Esta opcion eliminara toda las tareas ya completadas.</small>
      <button className="btn btn-danger mt-2 text-center w-100" onClick={destroyAllTask}><FaTrashAlt /> Eliminar</button>
      <p className="text-justify mt-4"><strong>Estado actual:</strong> Te quedan {todos.filter(todo => !todo.completed).length} tareas por terminar</p>
    </div>
  );
}