import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Maximize2 } from "lucide-react";
import { toast } from "react-toastify";

export default function MyWork() {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialog, setisAddDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { authorizationtoken } = useAuth();
  const [userData] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const [userTasks, setUserTasks] = useState({
    userTaskID: "",
    userTaskName: "",
    priority: "",
    status: "",
    dueDate: "",
    userId: userData.userID,
  });

  useEffect(() => {
    if (userData.userID) {
      fetchTasks();
    }
  }, [userData.userID]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://localhost:44302/api/UserTasks/GetUserTaskByUserId/user/${userData.userID}`
      );
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };
  const handleAddTask = async () => {
    console.log(userTasks);
    try {
      console.log(userTasks)
      const { userTaskID, ...taskData } = userTasks;
      const response = await fetch("https://localhost:44302/api/Tasks/InsertTask", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
        toast.success("Task Added");
        setIsDialogOpen(false);
        setUserTasks({
          userTaskID: "",
          userTaskName: "",
          priority: "",
          status: "",
          dueDate: "",
          userId: userData.userID,
        });
        fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(
        `https://localhost:44302/api/UserTasks/UpdateUserTask/`,
        {
          method: "PUT",
          body: JSON.stringify(selectedTask),
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationtoken,
          },
        }
      );
      if (response.ok) {
        setIsDialogOpen(false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setUserTasks((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-5xl mx-auto rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700">My Work</h2>
      <button
        className="mt-2 px-3 py-1 text-xs font-medium text-white bg-black rounded-md hover:bg-indigo-800"
        onClick={() => setisAddDialog(true)}
      >
        Add Task
      </button>
      <table className="w-full overflow-hidden rounded-lg border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="p-2 border">Task</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskID} className="border">
              <td className="p-2 border flex justify-between items-center">
                {task.userTaskName}
                <span
                  className="text-gray-400 cursor-pointer"
                  onClick={() => handleEditTask(task)}
                >
                  <Maximize2 size={16} />
                </span>
              </td>
              <td className="p-2 border">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="p-2 border">{task.status}</td>
              <td className="p-2 border">{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {isAddDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Add Task</h2>
            <input
              type="text"
              name="userTaskName"
              placeholder="Task Name"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={userTasks.userTaskName}
              onChange={handleTaskChange}
            />
            <input
              type="date"
              name="dueDate"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={userTasks.dueDate }
              onChange={handleTaskChange}
            />
            <select
              name="status"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={userTasks.status}
              onChange={handleTaskChange}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              name="priority"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={userTasks.priority}
              onChange={handleTaskChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setisAddDialog(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {isDialogOpen && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Update Task</h2>
            <input
              type="text"
              name="userTaskName"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={selectedTask.userTaskName}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dueDate"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={selectedTask.dueDate ? new Date(selectedTask.dueDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
            />
            <select
              name="status"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={selectedTask.status}
              onChange={handleChange}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              name="priority"
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              value={selectedTask.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleUpdateTask}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
