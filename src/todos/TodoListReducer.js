
import { ADD_Task, DELETE_Task, DELETE_ALL_Task, UPDATE_Task } from "../types/taskList";

const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("todoList")) || initialValue;


const listReducer = (state = [], action) => {


    switch (action.type){
        case ADD_Task:
            console.log('Agregar ', [...state, action.payload])
            return [ ...state, action.payload];

        case DELETE_Task:

            return state.filter( task => task.name !== action.payload);
        
        case DELETE_ALL_Task:

            return [];
        case UPDATE_Task:

            const updateTask = action.payload;

            const updatedTasks = state.map( task => {
                if(task.name === updateTask.name){
                    console.log('entre', updateTask.name);
                  task.name = updateTask.name
                  task.checked = updateTask.checked
                }
                return task;
          });
             return updatedTasks;

        default:
            return state;
    }

}

export default listReducer;