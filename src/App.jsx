import { useEffect, useState } from 'react'
  

function App() {
  const [tasks, setTasks] = useState([]) // useState — holds the tasks in memory so React re-renders the list when they arrive
  
  useEffect(() => { //useEffect — runs the fetch once, when the component first loads
    fetch('http://localhost:8080/tasks', {
      headers: {
        Authorization: 'Basic ' + btoa('admin:admin123') //btoa('admin:admin123') — encodes credentials for Basic Auth (browser's built-in base64 encoder)
      }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Task Manager</h1>
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