import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch("http://localhost:3000/api/task");
        const data = await response.json();

        setTask(data);
      } catch (error) {
        console.error(error);
      }
    }
    getTasks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const request = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          desc: formData.get("description"),
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function edit(event, id,closeEditing) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const req = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          desc: formData.get("description"),
          completed: formData.get("completed"),
        }),
      });

      const res = await req.json();
      closeEditing();
    } catch (error) {}
  }

  function Card({ task }) {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDesc] = useState(task.description);
    const [completed, setComp] = useState(task.completed);
    if (!isEditing) {
      return (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.completed ? "Completed" : "Not completed"}</p>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      );
    } else {
      return (
        <>
          <form
            onSubmit={(event) => edit(event, task.id, () => setEditing(false))}
          >
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
            <label>
              <input
                type="checkbox"
                name="completed"
                value={completed}
                onChange={(event) => {
                  setComp(event.target.checked);
                }}
              />
              {completed ? "Completed" : "Not Completed"}
            </label>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </form>
        </>
      );
    }
  }

  return (
    <div>
      <div className="card">
        <h3>Add Task</h3>
        <p>add task </p>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" />
          <label>Description</label>
          <textarea name="description" />

          <button type="submit">submit</button>
        </form>
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <Card task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
