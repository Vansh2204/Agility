import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Maximize2 } from "lucide-react";

export default function MyWork() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      // fetchUsers();
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

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch("https://localhost:44302/api/Users/GetAllUsers");
  //     const usersData = await response.json();
  //     setUsers(usersData);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const handleAddTask = async () => {
    try {
      const { userTaskID, ...taskData } = userTasks;
      const response = await fetch("https://localhost:44302/api/UserTasks/InsertUserTask", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserTasks((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <div className="w-5xl mx-auto rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700">My Work</h2>
      <button
        className="mt-2 btn text-white bg-indigo-700 hover:bg-indigo-500"
        onClick={() => setIsDialogOpen(true)}
      >
        Add Item
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
                <span className="text-gray-400" 
                >
                  <Maximize2 size={16} />
                </span>
              </td>
              <td className="p-2 border">{task.dueDate}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${task.status === "Done"
                    ? "bg-green-100 text-green-800"
                    : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="p-2 border">{task.priority}</td>

            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <div className="flex flex-col space-y-4 w-96">
              <input
                type="text"
                name="userTaskName"
                placeholder="Task Name"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                value={userTasks.userTaskName}
              />
              <div className=" ">
                <input type="date" name="dueDate" className="w-full border p-2 rounded" onChange={handleChange}
                  value={userTasks.dueDate} />
              </div>


              <select
                name="status"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                value={userTasks.status}
              >
                <option value="">Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <select
                name="priority"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleChange}
                value={userTasks.priority}
              >
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={handleAddTask}
                >
Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
