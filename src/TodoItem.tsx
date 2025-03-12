interface ToDo {
  id: number;
  message: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: ToDo[];
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
}


function TodoItem({todos, onChange, onDelete}: TodoListProps)  {

  return (
    <>
      <ul>
        {
          todos.map(el => <div className='list-child' key={el.id}>
                            <input type='checkbox' onChange={() => onChange(el.id)} />
                            <li className={el.isCompleted ? 'li-done' : 'li-todo'}>{el.id} {el.message} {`${el.isCompleted}`}</li>
                            <button className='delete-btn' onClick={() => onDelete(el.id)}>
                              <i className='pi pi-times' style={{ color: 'red', fontSize: '1rem' }}></i>
                            </button>
                          </div>)
        }
      </ul>
    </>
  )
}

export default TodoItem
