import { ChangeEvent, useState } from 'react';
import './App.css'
import 'primeicons/primeicons.css';
import TodoItem from '../TodoItem.tsx';
import { useEffect } from "react";
import Timer from '../Timer.tsx';
import ButtonDeleteStore from '../ButtonDelete.tsx';

export interface ToDo {
  id: number;
  message: string;
  isCompleted: boolean;
}

  function App() {
    const [todos, setTodos] = useState<ToDo[]>([])
    const [message, setMessage] = useState('')


    useEffect(() => { 
      const todoList = localStorage.getItem('todos')
      if (todoList) {
        const todoListObj = JSON.parse(todoList)
        setTodos(todoListObj)
        console.log(todoListObj)
      }
    }, [])

    useEffect(() => {
      const todoList = JSON.stringify(todos)
      if (todos.length !== 0) {
        localStorage.setItem('todos', todoList)
      }
    }, [todos])

    function handleMessageChange(event: ChangeEvent<HTMLInputElement>) {
      // То что в инпуте - event.target.value
      setMessage(event.target.value)
    }
  
    function handleFormSubmit() {
      const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0
      const newId = maxId + 1
      const newTodo: ToDo = {
        id: newId,
        message: message,
        isCompleted: false
      }
      setTodos([...todos, newTodo])
      setMessage('')
    }
  
    function handleChange(id: number) {
      setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
    }
  
    function handleDelete(id: number) {
      setTodos(todos.filter(todo => todo.id !== id))
    }

    function handleClick() {
      localStorage.clear()
      setTodos([])
    }
  
    return (
      <>
        <h1>ToDo</h1>
        <Timer/>
        <ButtonDeleteStore className="clear-store" onDelete={handleClick}/>
        <TodoItem todos={todos} onChange={handleChange} onDelete={handleDelete} />
        <form className='form'>
          <input onChange={handleMessageChange} value={message}></input>
          <button onClick={handleFormSubmit}>Добавить</button>
        </form>
      </>
    )
  }
  
  export default App