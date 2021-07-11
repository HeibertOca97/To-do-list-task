import React from 'react';
import {TodoTableItem} from './TodoTableItem';

export function TodoTable({todos, methods}){
  const template = () => {
    if(todos.length > 0){
      return todos.map((todo, i) => (
        <TodoTableItem key={todo.id} num={i} todo={todo} methods={methods}/>
      ))
    }else{
      return (
      <tr>
      <td colSpan="5" className="text-center bg-light text-dark">Por el momento no hay ningun registro</td>
      </tr>
      );
    }
  }

  return (
    <div className="col-sm-8 pl-2 pr-2">
    <table className="table mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {template()}
      </tbody>
    </table>
    </div>
  );
}