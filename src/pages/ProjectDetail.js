import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { ChevronUp, ChevronDown, EllipsisVertical, Maximize2, Edit2, Bug, Plus,ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

export default function ProjectDetail() {
  const params = useParams();
  const { authorizationToken } = useAuth();
  const [proj, setProj] = useState({});
  const [sprints, setSprints] = useState([]);
  const [tasks, setTasks] = useState({});
  const [openSprint, setOpenSprint] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [istaskdialog, setistaskdialog] = useState(false);


  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));
  const [userTasks, setUserTasks] = useState({
    sprintID: "",
    sprintName: "",
    startDate: "",
    endDate: "",
    projectID: params.projectID,
  });
  const [formdata, setformdata] = useState({
    taskID: "",
    taskName: "",
    taskDescription: "",
    taskStatus: "",
    assignedTo: "",
    projectID: params.projectID,
    sprintID: userTasks.sprintID,
    userId: userData.userID
  });

  const handletaskpopup = () => {
    setIsDialogOpen(true);
  };
  const handleclosepopup = () => {
    setIsDialogOpen(false);
  };

  const handletaskdialog = () => {
    setistaskdialog(true);
  };
  const handleclosetaskdialog = () => {
    setistaskdialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserTasks((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const projectResponse = await fetch(
        `https://localhost:44302/api/Projects/GetByProjectID/project/${params.projectID}`,
        {
          method: "GET",
          headers: { Authorization: authorizationToken },
        }
      );
      const projectData = await projectResponse.json();
      setProj(projectData);

      const sprintResponse = await fetch(
        `https://localhost:44302/api/Sprints/GetSprintByProjectID/${params.projectID}`,
        {
          method: "GET",
          headers: { Authorization: authorizationToken },
        }
      );
      const sprintsData = await sprintResponse.json();
      setSprints(sprintsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load project or sprints.");
    }
  };

  const fetchTasks = async (sprintID) => {
    try {
      const response = await fetch(
        `https://localhost:44302/api/Tasks/GetTaskBySprintProjectID/${params.projectID}/${sprintID}`,
        {
          method: "GET",
          headers: { Authorization: authorizationToken },
        }
      );
      const taskData = await response.json();
      setTasks((prevTasks) => ({ ...prevTasks, [sprintID]: taskData }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSprint = async () => {
    try {
      const { sprintID, ...sprintData } = userTasks;
      const response = await fetch("https://localhost:44302/api/Sprints/InsertSprint", {
        method: "POST",
        body: JSON.stringify(sprintData),
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        setIsDialogOpen(false);
        toast.success("Sprint Created");
        setUserTasks({
          sprintID: "",
          sprintName: "",
          startDate: "",
          endDate: "",
          projectID: params.projectID,
        });
        fetchData();
      } else {
        toast.error("Failed to create sprint.");
      }
    } catch (error) {
      console.error("Error adding sprint:", error);
      toast.error("An error occurred while creating the sprint.");
    }
  };

  const handleAddTask = async () => {
    try {
      const { taskID, ...taskData } = formdata;
      const response = await fetch("https://localhost:44302/api/Tasks/InsertTask", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      })
      if (response.ok) {
        setIsDialogOpen(false);
        setformdata({
          taskID: "",
          taskName: "",
          taskDescription: "",
          taskStatus: "",
          assignedTo: "",
          projectID: params.projectID,
          sprintID: userTasks.sprintID,
          userId: userData.userID
        })
        fetchTasks();
      }
    } catch {

    }
  }

  const handletaskchange = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleSprint = (index, sprintID) => {
    if (openSprint === index) {
      setOpenSprint(null);
    } else {
      setOpenSprint(index);
      if (!tasks[sprintID]) fetchTasks(sprintID);
    }
  };
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (taskID) => {
    setActiveMenu((prev) => (prev === taskID ? null : taskID));
  };

  return (
    <div className="container mx-auto p-8">
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-2">Project Overview</h2>
        <div class="container mx-auto flex gap-4">

          <div class="py-4 flex justify-between w-1/2 overflow-hidden">
            <dt class="text-sm font-medium text-gray-900">Project Name</dt>
            <dd class="text-sm text-gray-500">Margot Foster</dd>
          </div>
          <div class="py-4 flex justify-between w-1/2 overflow-hidden">
            <dt class="text-sm font-medium text-gray-900">Project Status</dt>
            <dd class="text-sm text-gray-500">Margot Foster</dd>
          </div>

        </div>
        <div class="container mx-auto flex gap-4">

          <div class="py-4 flex justify-between w-1/1 overflow-hidden">
            <dt class="text-sm font-medium text-gray-900">Project Description</dt>
            <dd class="text-sm text-gray-500 ml-5">Margot Foster</dd>
          </div>

        </div>
        <div class="container mx-auto flex gap-4 justify-between">

          <div class="py-4 flex justify-between w-1/1 overflow-hidden">
            <dt class="text-sm font-medium text-gray-900">Start Date</dt>
            <dd class="text-sm text-gray-500 ml-5">Margot Foster</dd>
          </div>
          <div class="py-4 flex justify-between w-1/1">
            <dt class="text-sm font-medium text-gray-900">End Date</dt>
            <dd class="text-sm text-gray-500 ml-5">Margot Foster</dd>
          </div>
          <div class="py-4 flex justify-between w-1/1 overflow-hidden ml-5">
            <dt class="text-sm font-medium text-gray-900">Team Lead</dt>
            <dd class="text-sm text-gray-500 ml-5">Margot Foster</dd>
          </div>

        </div>
      </div>


      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Sprint</h2>
        <div className="mb-4">
          <label htmlFor="sprintName" className="font-bold text-gray-700">
            Sprint Name
          </label>
          <input
            type="text"
            id="sprintName"
            name="sprintName"
            className="border rounded w-full p-2"
            placeholder="Enter sprint name"
            onChange={handleChange}
            value={userTasks.sprintName}
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="font-bold text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="border rounded w-full p-2"
              onChange={handleChange}
              value={userTasks.startDate}
            />
          </div>
          <div className="w-1/2">
            <label className="font-bold text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              className="border rounded w-full p-2"
              onChange={handleChange}
              value={userTasks.endDate}
            />
          </div>
        </div>
        <button className="bg-black text-white py-2 px-4 rounded mt-4" onClick={handleAddSprint}>
          Create Sprint
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Sprints</h2>
        {sprints.map((sprint, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
            <Link to={'sprint/' + sprint.sprintID }>
            <div
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{sprint.sprintName}</h3>
              <ChevronRight size={20} />
            </div>
            </Link> 
            {/* {openSprint === index && (
              <div className="mt-4">
                <p>
                  <span className="font-medium">Start Date:</span> {sprint.startDate}
                </p>
                <p>
                  <span className="font-medium">End Date:</span> {sprint.endDate}
                </p>
                <div className="row justify-between">
                  <h4 className="mt-4 font-semibold col-6">Tasks</h4>
                  <button className="bg-black rounded px-4 py-1 text-white flex w-32" onClick={handletaskdialog}>Add task</button>

                </div>
                <table className="table">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 text-left">
                      <th className="p-2 col">Task</th>
                      <th className="p-2 col">Task Description</th>
                      <th className="p-2 col">Task Priority</th>
                      <th className="p-2 col">Task Status</th>
                    </tr>
                  </thead>

                  {tasks[sprint.sprintID]?.length > 0 ? (
                    <tbody>

                      {tasks[sprint.sprintID].map((task, taskIndex) => (
                        <tr key={task.taskID} className="">
                          <td className="p-2  relative overflow-visible">
                            <div className="flex justify-between items-center">
                              {task.taskName}
                              <div className="relative">
                                <EllipsisVertical
                                  size={16}
                                  className="cursor-pointer"
                                  onClick={() => toggleMenu(task.taskID)}
                                />
                                {activeMenu === task.taskID && (
                                  <div className="absolute right-0 top-6 bg-white border rounded-lg shadow-lg z-20 w-48">
                                    <ul className="text-gray-700">
                                      <li
                                        className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                                      >
                                        <Edit2 size={16} /> Edit Task
                                      </li>
                                      <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                                        <Bug size={16} /> Bug Queue
                                      </li>
                                    </ul>

                                    {isDialogOpen && (
                                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                          <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                                          <div className="space-y-3">
                                            <input
                                              type="text"
                                              name="projectName"
                                              onChange={(e) => setformdata({ ...formdata, taskName: e.target.value })}
                                              value={formdata.taskName}
                                              placeholder="Task Name"
                                              className="w-full border p-2 rounded"
                                            />
                                            <textarea
                                              name="projectDescription"
                                              placeholder="Task Description"
                                              className="w-full border p-2 rounded"
                                              onChange={(e) => setformdata({ ...formdata, taskName: e.target.value })}
                                              value={formdata.taskDescription}

                                            />

                                          </div>

                                          <div className="flex justify-end mt-4 space-x-2">
                                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleclosepopup}>
                                              Cancel
                                            </button>
                                            <button className="bg-indigo-900 text-white px-4 py-2 rounded">Save Changes</button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                              </div>
                            </div>
                          </td>

                          <td className="p-2 ">{task.taskDescription}</td>
                          <td className="p-2 ">{task.taskPriority}</td>
                          <td className="p-2 ">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${task.taskStatus === "Done"
                                ? "bg-green-100 text-green-800"
                                : task.taskStatus === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {task.taskStatus}
                            </span>
                          </td>

                        </tr>
                        // <li key={taskIndex}>{task.taskName}</li>
                      ))}
                    </tbody>
                  ) : (
                    <p className="text-gray-500">No tasks for this sprint yet.</p>
                  )}
                </table>

              </div>

            )} */}

          </div>
        ))}
      </div>
    </div>
  );
}
