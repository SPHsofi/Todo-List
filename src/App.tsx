import { ChangeEvent, useState } from 'react';
import './App.css'
import 'primeicons/primeicons.css';
import TodoItem from './TodoItem';
import { useEffect } from "react";
import { json } from 'stream/consumers';

interface ToDo {
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
      if (todos) {
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
  
    return (
      <>
        <h1>ToDo</h1>
        <TodoItem todos={todos} onChange={handleChange} onDelete={handleDelete} />
        <div className='form'>
          <input onChange={handleMessageChange} value={message}></input>
          <button onClick={handleFormSubmit}>Добавить</button>
        </div>
      </>
    )
  }
  
  export default App