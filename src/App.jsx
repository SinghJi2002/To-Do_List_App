import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const saveToLs=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    } 
  },[])

  useEffect(() => {
    saveToLs()
  }, [todos])

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
  }

  const handleDelete = (e, id) => {
    const confirmDelete = window.confirm("Do you want to delete the task?")
    if (confirmDelete) {
      let newTodos = todos.filter((item) => {
        return (item.id !== id)
      })
      setTodos(newTodos)
    }
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return (item.id == id)
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className='rounded-xl bg-violet-100 mx-auto w-[90%] py-3 px-4 mt-5'>
        <p className='text-xl font-bold mb-[20px]'>Add Todo</p>
        <div className='flex flex-row mx-auto justify-around mb-[20px]'>
          <input type="text" onChange={handleChange} value={todo} className='outline-none rounded-xl w-[85%] h-[32px] p-3' />
          <button onClick={handleAdd} className='bg-blue-400 py-1 px-3 rounded-xl'>Add</button>
        </div>
        <p className='todo-list font-bold text-xl'>Your Todos</p>
        <div className='bg-white flex flex-col py-2 gap-y-2'>
          {todos.length==0 && <div className='mx-auto font-bold'>No Tasks Added</div>}
          {todos.map(item => {
            return (
              <div key={item.id} className='flex flex-row mx-auto w-[82%] justify-between items-center bg-purple-100 rounded-xl p-2'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" />
                <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
                <div className='flex flex-row gap-x-2'>
                  <button onClick={(e) => (handleEdit(e,item.id))} className='bg-blue-400 rounded-xl py-1 px-2 hover:bg-blue-500 text-white'>Edit</button>
                  <button onClick={(e) => (handleDelete(e, item.id))} className='bg-blue-400 rounded-xl py-1 px-2 hover:bg-blue-500 text-white'>Delete</button>
                </div>
              </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default App
