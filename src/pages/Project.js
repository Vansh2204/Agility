import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export default function Project() {
    const [proj, setproj] = useState([]);
    const { user, authorizationtoken } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [users, setuser] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));
    const [userproj, setuserproj] = useState({
        projectID: "",
        projectName: "",
        projectDescription: "",
        startDate: "",
        endDate: "",
        projectStatus: "",
        teamLeadID: "",
        userId: userData.userID,
    });

    const handleaddprojectpopup = () => {
        setIsDialogOpen(true);
    };
    const handleclosepopup = () => {
        setIsDialogOpen(false);
    };


    useEffect(() => {
        if (userData.userID) {
            fetchProjects();
            fetchUsers();
        }


    }, [userData.userID]);

    const fetchProjects = async () => {
        try {
            const response = await fetch(
                `https://localhost:44302/api/Projects/GetProjectByUserId/user/${userData.userID}`
            );
            const projectData = await response.json();
            setproj(projectData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://localhost:44302/api/Users/GetAllUsers");
            const usersData = await response.json();
            setuser(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddProject = async () => {
        try {
            console.log(userproj)
            const { projectID, ...projectData } = userproj;
            const response = await fetch("https://localhost:44302/api/Projects/InsertProject", {
                method: "POST",
                body: JSON.stringify(projectData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationtoken,
                },
            });

            if (response.ok) {
                setIsDialogOpen(false);
                setuserproj({
                    projectID: "",
                    projectName: "",
                    projectDescription: "",
                    startDate: "",
                    endDate: "",
                    projectStatus: "",
                    teamLeadID: "",
                    userId: userData.userID,
                });
                fetchProjects();
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserproj((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="border rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:shadow-md transition cursor-pointer" onClick={handleaddprojectpopup}>
                        <div className="text-4xl">+</div>
                        <p className="mt-2">Add New Project</p>
                    </div>
                    {proj.map((project) => (
                        <div
                            key={project.projectID}
                            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-lg font-semibold">{project.projectName}</h2>
                            <p className="text-black">{project.projectDescription}</p>
                            <Link to={"../project/" + project.projectID}>
                                <button className="mt-4 px-4 w-full py-2 border rounded-lg text-sm hover:bg-gray-100">
                                    View Project
                                </button>
                            </Link>
                        </div>
                    ))}

                    {isDialogOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

                                <div className="space-y-3">
                                    <input type="text" name="projectName" placeholder="Project Name" className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userproj.projectName} />
                                    <textarea name="projectDescription" placeholder="Project Description" className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userproj.projectDescription}></textarea>

                                    <div className="flex space-x-2">
                                        <input type="date" name="startDate" className="w-1/2 border p-2 rounded" onChange={handleChange}
                                            value={userproj.startDate} />
                                        <input type="date" name="endDate" className="w-1/2 border p-2 rounded" onChange={handleChange}
                                            value={userproj.endDate} />
                                    </div>

                                    <select name="projectStatus" className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                        value={userproj.projectStatus}>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    <div class="flex items-center space-x-2">
                                        <select name="teamLeadID" class="border border-gray-300 rounded-md p-2 w-32"
                                            onChange={handleChange}
                                            value={userproj.teamLeadID}>  {users.map((u) => (
                                                <option key={u.userID} value={u.userID}>
                                                    {u.userName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-4 space-x-2">
                                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleclosepopup}>Cancel</button>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddProject}>Add</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p className="text-gray-500">{project.description}</p>
            <button className="mt-4 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
              View Project
            </button>
          </div>
        ))} */}
                    {/* Add New Project Card */}

                </div>
            </div>
        </>
    )
}