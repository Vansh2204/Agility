import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { EllipsisVertical, Edit2, Bug, Delete, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function SprintDetail() {
    const params = useParams();
    const { authorizationtoken } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userData] = useState(JSON.parse(sessionStorage.getItem("userData")));

    const [userTasks, setUserTasks] = useState({
        taskID: "",
        taskName: "",
        taskDescription: "",
        taskPriority: "",
        taskStatus: "",
        assignedTo: "",
        projectID: params.projectID,
        sprintID: params.sprintID,
        userId: userData.userID,
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://localhost:44302/api/Tasks/GetTaskBySprintProjectID/${params.projectID}/${params.sprintID}`,
                {
                    method: "GET",
                    headers: { Authorization: authorizationtoken },
                }
            );
            const taskData = await response.json();
            console.log(taskData);
            setTasks(taskData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            toast.error("Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async () => {
        console.log(userTasks);
        try {
            const { taskID, ...taskData } = userTasks;
            const response = await fetch("https://localhost:44302/api/Tasks/InsertTask", {
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
                    taskID: "",
                    taskName: "",
                    taskDescription: "",
                    taskPriority: "",
                    taskStatus: "",
                    assignedTo: "",
                    projectID: params.projectID,
                    sprintID: params.sprintID,
                    userId: userData.userID,
                });
                fetchTasks();
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };


    const handletaskdelete = async (taskID) => {
        try {
            const response = await fetch(`https://localhost:44302/api/Tasks/DeleteTask/${taskID}`,
                {
                    method: "DELETE",
                    headers: { Authorization: authorizationtoken },

                });
            //console.log("Tasks Deleted")
            toast.success("Tasks Deleted")
            setTasks(tasks.filter(task => task.taskID !== taskID));


        } catch {
            toast.error("Failed to delete")
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserTasks((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const toggleMenu = (taskID) => {
        setActiveMenu((prev) => (prev === taskID ? null : taskID));
    };

    return (
        <>
            <div>
                <div className="p-6 m-3 bg-white shadow-md rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">Tasks</h2>
                            <p className="text-sm text-gray-500">A list of all the tasks for the sprint.</p>
                        </div>
                        <div
                            className="btn bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                            onClick={() => { setIsDialogOpen(true) }}
                        >
                            Add Task
                        </div>
                    </div>

                    {isDialogOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        name="taskName"
                                        placeholder="Task Name"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userTasks.taskName}
                                    />
                                    <input
                                        type="textarea"
                                        name="taskDescription"
                                        placeholder="Task Description"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userTasks.taskDescription}
                                    />
                                    <select
                                        name="taskStatus"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                        onChange={handleChange}
                                        value={userTasks.taskStatus}
                                    >
                                        <option value="">Status</option>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                    <select
                                        name="taskPriority"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                        onChange={handleChange}
                                        value={userTasks.taskPriority}
                                    >
                                        <option value="">Priority</option>
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="assignedTo"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userTasks.assignedTo}
                                    />
                                    <input
                                        type="text"
                                        name="projectID"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userTasks.projectID}
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="sprintID"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userTasks.sprintID}
                                        disabled
                                    />
                                </div>
                                <div className="flex justify-end mt-4 space-x-2">
                                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setIsDialogOpen(false) }}>
                                        Cancel
                                    </button>
                                    <button className="bg-black text-white px-4 py-2 rounded" onClick={handleAddTask}>Add</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-loader-circle"
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                </svg>
                            </div>
                        ) : (
                            tasks.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-3 px-4 text-sm font-medium text-gray-600">Task Name</th>
                                            <th className="py-3 px-4 text-sm font-medium text-gray-600">Priority</th>
                                            <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                            <th className="py-3 px-4 text-sm font-medium text-gray-600">Assigned To</th>
                                            <th className="py-3 px-4 text-sm font-medium text-gray-600"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((t, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-100">
                                                <td className="py-3 px-4">{t.taskName}</td>
                                                <td className="py-3 px-4 text-gray-500">{t.taskPriority}</td>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.taskStatus === "Done"
                                                    ? "bg-green-100 text-green-800"
                                                    : t.taskStatus === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {t.taskStatus}</span>
                                                <td className="py-3 px-4 text-gray-500">{t.assignedTo}</td>
                                                <td className="py-3 px-4 text-black text-sm cursor-pointer">
                                                    <EllipsisVertical size={14} onClick={() => { toggleMenu(t.taskID) }} />
                                                    {activeMenu === t.taskID && (
                                                        <div className="absolute bg-white border rounded-lg shadow-lg z-20 w-32">
                                                            <ul className="text-gray-700 ">
                                                                <li
                                                                    className="px-2 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    <Edit2 size={16} /> Edit Task
                                                                </li>
                                                                <li
                                                                    className="px-2 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                                                                    onClick={() => handletaskdelete(t.taskID)}>
                                                                    <Trash2 size={16} />Delete Task
                                                                </li>
                                                                <li className="px-2 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                                                                    <Bug size={16} /> Bug Queue
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 text-center py-5">No tasks available.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
