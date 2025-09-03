import { useEffect, useState, ChangeEvent } from "react";
import "./App.css";

// Define a Task type
interface Task {
  text: string;
  done: boolean;
}

function App() {
  const [taskinput, setTaskinput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [greeting, setGreeting] = useState<string>("");

  const inputText = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskinput(e.target.value);
  };

  const addTask = () => {
    if (taskinput.trim() === "") return;
    setTasks([...tasks, { text: taskinput.trim(), done: false }]);
    setTaskinput("");
  };

  const toggleDone = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index: number) => {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newTask.trim();
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="world">
      <div className="headerBox">
        <h1>{greeting}, User</h1>
        <p>{formattedDate}</p>
      </div>

      <div className="inputContainer">
        <input
          type="text"
          id="taskInput"
          className="inputValue"
          placeholder="Write Task"
          onChange={inputText}
          value={taskinput}
        />
        <button className="addInput" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="bodyContainer">
        <div id="task">
          {tasks.map((task, index) => (
            <div
              className="taskbox"
              key={index}
              style={{
                backgroundColor: task.done ? "green" : "rgba(225,225,225,0.2)",
              }}
              onClick={() => toggleDone(index)}
            >
              <p
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                }}
              >
                {task.text}
              </p>
              <div className="subtaskBox">
                <button className="doneBut">
                  {task.done ? "Done" : "Incomplete"}
                </button>
                <button onClick={() => editTask(index)} className="doneBut">
                  <ion-icon name="create-outline"></ion-icon>
                </button>
                <button onClick={() => deleteTask(index)} className="doneBut">
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
