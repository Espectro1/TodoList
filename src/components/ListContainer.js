import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from '../hooks/useForm';
import listReducer, { initializer } from '../todos/TodoListReducer';
import { ADD_Task, DELETE_ALL_Task, DELETE_Task, UPDATE_Task } from '../types/taskList';
import { ListComponent } from './ListComponent'

export const ListContainer = () => {

    
    const [state, dispatch] = useReducer(listReducer, [], initializer);


    const [formValues, handleInputChange, reset] = useForm({
        taskInput: ''
    });

    const [msg, setMsg] = useState('');

    const [msgError, setMsgError] = useState(false);

    const {taskInput} = formValues;
    

    useEffect(() => {
        window.localStorage.setItem("todoList", JSON.stringify(state));
        verifyCompletedActivities();
    }, [state])


    const verifyCompletedActivities = ()=>{
        let taskCompleted = 0;
        state.forEach(function(task) {
            if ( task.checked ){
                taskCompleted++;
                if(taskCompleted === state.length){
                    setMsg('Has cumplido todas tus actividades!');
                    setMsgError(false);
                }
               
            }else{
                    setMsg('');
                    setMsgError(true);
            }
        });
        if( taskCompleted === 0){
            setMsg('');
        }
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        if(isValid()){
            const newTask = {
                name:taskInput,
                checked: false
            }
           dispatch({
               type: ADD_Task,
               payload: newTask
           });
   
           reset();
        }

    }

    const handleDelete = (taskName) => {
        dispatch({
            type: DELETE_Task,
            payload: taskName

        });
        
    }

    const handleDeleteAll = ()=>{
        dispatch({
            type: DELETE_ALL_Task
        });
    }

    const handleChecked = (taskName, checked) =>{
        console.log('taskName', taskName, "checked", checked)
          const updateTask = {
            name: taskName,
            checked
          }
          dispatch({
              type: UPDATE_Task,
              payload: updateTask
          });
    }

    const isValid = () =>{

          if(!taskInput){
              setMsg('Escriba una tarea');
              setMsgError(true);
              setTimeout(() => setMsg('') , 2000);
              return false;
          }else{
              return true;
          }
    }

    
    return (
        <>
        <div className="menu"/>
        <div className="container">
                <div className='container-title'>
                    <p className="title-activities">Lista de actividades</p>
                    <button className='btn-delete'
                            onClick={handleDeleteAll}>Eliminar actividades</button>
                </div>
                
                <p className="activities">Actividades: { state.length }</p>
                {
                    state.map( (task, i) => (
                      <ListComponent taskName={ task.name } key={ i } 
                            handleDelete = { handleDelete }
                            handleChecked = { handleChecked }
                            checked={ task.checked }
                      />
                    ))
                }
                
            
            <form onSubmit={ handleOnSubmit } className="container-input">
                <label className="container-label-input"> 
                    <input type="checkbox" disabled/>
                    <span className="checkmark"></span>
                </label>
                <input type="text" className="form__input"
                       name="taskInput"
                       value = { taskInput } 
                       onChange={ handleInputChange } 
                       placeholder="Nueva tarea"/> 
                <button type="submit" className="btn">Guardar</button>
            </form>

            {
                    msg && 
                    (
                        <div className={ msgError ? "alert-error" : "alert-complete" }> 
                            {msg}
                        </div> 
                    )
                    
                }
        </div>
        </>
    )
}
