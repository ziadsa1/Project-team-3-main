import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import styles from "./pages.module.css";
import { FaDeleteLeft } from "react-icons/fa6";
import taskimg from "../Assets/work-order.png";
function Tasks() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }
    getTasks();
  }, []);
  async function getTasks() {
    const res = await axios.get("http://localhost:5001/tasks", {
      params: { username },
    });
    setTasks(res.data);
  }
  async function addTasks() {
    if (!newTask.trim()) return;
    await axios.post("http://localhost:5001/tasks", {
      username,
      task: newTask.trim(),
    });
    setNewTask("");
    getTasks();
  }
  async function check(taskId, checkmark) {
    setTasks((prevTasks) =>
      prevTasks.map((t) => t._id === taskId ? { ...t, completed: !checkmark } : t)
    );
    await axios.patch("http://localhost:5001/tasks", {
      username,
      taskId,
      completed: !checkmark,
    });
  }
  async function deleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
    await axios.delete("http://localhost:5001/tasks", {
      data: {
        username,
        taskId: taskId,
      },
    });
  }

  return (
    <div className={styles.page}>
      <div>
        <NavBar />
      </div>
      <div className={styles.content}>
        <div className={styles.inputtask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
          />
          <button onClick={addTasks}>Add</button>
        </div>

        {tasks.length === 0 ? (
          <div>
            <img
              src={taskimg}
              className={styles.taskimg}
              alt="ImageTask"
              width="250"
              height="250"
            />
            <h2 className={styles.notask}>No Tasks yet.</h2>
          </div>
        ) : (
          <ul className={styles.list}>
            {tasks.map((task) => (
              <li key={task._id}>
                <span>{task.task}</span>
                <div className={styles.actions}>
                  <input
                    type="checkbox"
                    className={styles.checkbtn}
                    checked={task.completed}
                    onChange={() => check(task._id, task.completed)}
                  />
                  <button
                    className={styles.iconbtn}
                    onClick={() => deleteTask(task._id)}
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tasks;
