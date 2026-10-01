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

  const handleComplete = (id) => {
    fetch(`http://localhost:8080/tasks/${id}/complete`, {
      method: 'PUT',
      headers: { Authorization: authHeader }
    })
      .then(() => fetchTasks())
      .catch(err => console.error(err))
  }

  const handleUndo = (id) => {
  fetch(`http://localhost:8080/tasks/${id}/undo`, {
    method: 'PUT',
    headers: { Authorization: authHeader }
  })
    .then(() => fetchTasks())
    .catch(err => console.error(err))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: authHeader }
    })
      .then(() => fetchTasks())
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
            {task.status !== 'DONE' ? (
              <button onClick={() => handleComplete(task.id)}>Complete</button>
            ) : (
              <button onClick={() => handleUndo(task.id)}>Undo</button>
            )}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App