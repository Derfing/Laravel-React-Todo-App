import Head from 'next/head'
import { API_URL } from '../store/static'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Todo {
  id: number
  title: string
  status: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    getTodos()
  }, [])

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTodo(e.target.value)
  }

  async function addTodo() {
    if (newTodo) {
      await axios.post(`${API_URL}/api`, {
        id: Date.now(),
        title: newTodo
      })
      
      setNewTodo('')
      getTodos()
    }
  }

  function getTodos() {
    axios.get(`${API_URL}`).then(({ data }) => setTodos(JSON.parse(data)))
  }

  function changeStatus(id: number) {
    const index = todos?.findIndex(todo => todo.id === id)
    
    if (typeof index !== 'undefined' && index > -1 && todos.length) {
      setTodos(todos.map(todo => {
        if (todo.id === id) {
          todo.status = !todo.status
        }
        return todo
      }))

      axios.put(`${API_URL}/change_status/${id}`, {
        status: todos[index].status
      })
    }
  }

  async function deleteTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id))
    axios.delete(`${API_URL}/delete/${id}`)
  }

  async function deleteAllTodos() {
    setTodos([])
    axios.delete(`${API_URL}/delete`)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <input type='text' value={newTodo} onChange={handleChangeInput} className='input-field' />
        <div className="btns-block">
          <button type='button' onClick={addTodo} className='btn submit__btn'>Добавить</button>
          <button type='button' onClick={deleteAllTodos} className='btn delete-all__btn'>Удалить</button>
        </div>
        <div className='todos'>
          {
            todos.map(({ id, title, status }) => (
              <div className='todo-item' key={id}>
                <input type='checkbox' className='todo-status' checked={status} onChange={() => changeStatus(id)} />
                <span className='todo-title'>{title}</span>
                <Image src='/assets/icons/delete-icon.png' alt='delete-icon' width={1000} height={1000} onClick={() => deleteTodo(id)} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}