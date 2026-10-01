import { useEffect, useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const authHeader = 'Basic ' + btoa('admin:admin123')

  const fetchTasks = () => {
    fetch('http://localhost:8080/tasks', {
      headers: { Authorization: authHeader }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(() => {
        setTitle('')
        fetchTasks()
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App