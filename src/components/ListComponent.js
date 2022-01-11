

export const ListComponent = ({taskName, handleDelete, handleChecked, checked}) => {

    return (
        <>
         <div className="list-container">
                    <div className="list-item">
                        <label className={checked ? "container-label text-decoration": "container-label"}> {taskName}                     
                            <input type="checkbox"
                            onChange={e => { handleChecked(taskName, !checked);  }}
                            checked={checked}
                            /> 
                            <span className="checkmark"></span>
                        </label>
                        <button type ="button" className="btn-delete"
                        onClick={ () =>{
                            
                            handleDelete(taskName)
                        }
                           }>Eliminar</button>
                    </div>
         </div>
        </>
    )
}
