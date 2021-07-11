import React from 'react';
import {IconContext} from 'react-icons';
import {FaPenSquare, FaTrash} from 'react-icons/fa';

export function TodoTableItem({todo, methods, num}){
  const {id, title, description, completed} = todo;
  const {updateTaskStatus, deleteTask, editTask} = methods;

  const handleTaskStatus = () => {
    updateTaskStatus(id);
  }

  const handleDeleteTask = () => {
    deleteTask(id);
  } 

  const handleEditTask = () => {
    editTask(id)
  }

  return (
    <tr>
      <td>{num+1}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td><label htmlFor={'task_'+id} className={completed ? 'text-white btn bg-success' : 'text-white btn bg-dark'}>{completed ? 'Completo' : 'Incompleto'}</label> <input type="checkbox" id={'task_'+id} checked={completed} onChange={handleTaskStatus} className="d-none" /></td>
      <td>
      <IconContext.Provider value={{ size: "1.4em" }}>
        <button className="btn bg-white text-warning border m-1" onClick={handleEditTask}><FaPenSquare/></button>
        <button className="btn bg-white text-danger border m-1" onClick={handleDeleteTask}><FaTrash/></button>
      </IconContext.Provider>
      </td>
    </tr>
  );  
}