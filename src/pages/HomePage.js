import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));
    const [recenttasks, setrecenttasks] = useState([]);
    const hour = new Date().getHours();


    let msgs;
    if (hour < 12) {
        msgs = "Good morning";
    } else if (hour < 18) {
        msgs = "Good Afternoon";
    } else {
        msgs = "Good evening";
    }
    useEffect(() => {
        if (userData.userID) {
            fetchRecentTasks();
        }


    }, [userData.userID]);

    const fetchRecentTasks = async () => {
        try {
            const response = await fetch(
                `https://localhost:44302/api/UserTasks/GetRecentTasksByUserId/recenttasks/${userData.userID}`
            );
            const projectData = await response.json();
            console.log(projectData);
            setrecenttasks(projectData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // useEffect(async ()=>{
    //     try {
    //         const response = await fetch(
    //           `https://localhost:44302/api/UserTasks/GetUserTaskByUserId/user/${userData.userID}`
    //         );
    //         const tasksData = await response.json();
    //         setrecenttasks(tasksData);
    //       } catch (error) {
    //         console.error("Error fetching tasks:", error);
    //       }
    // })


    return (
        <>
            <div className="container mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">{msgs}, {userData.userName}</h2>
                    <p className="text-muted-foreground">Here's an overview of your recent activity</p>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6 m-3 mb-6">
                <h2 class="text-lg font-semibold mb-2">Tasks Overview</h2>
                <p class="text-gray-600 mb-4">Key metrics and progress</p>
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-blue-100 rounded-lg p-4">
                        <p class="text-gray-600">Recent Tasks</p>
                        {recenttasks.length === 0 ? (
                            <p className="text-gray-500 text-xl text-center">No Recent Tasks</p>
                        ) : (
                            <table className="w-full">
                                <tbody>
                                    {recenttasks.map((ut) => (
                                        <tr key={ut.id}>
                                            <td className="py-2"><span>- </span>{ut.userTaskName}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div class="bg-green-100 rounded-lg p-4">
                        <p class="text-gray-600">Completed</p>
                        <p class="text-xl font-bold">18</p>
                    </div>
                    <div class="bg-yellow-100 rounded-lg p-4">
                        <p class="text-gray-600">In Progress</p>
                        <p class="text-xl font-bold">6</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 m-3 mb-6">
                <h2 class="text-lg font-semibold mb-2">Project Overview</h2>
                <p class="text-gray-600 mb-4">Key metrics and progress</p>
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-blue-100 rounded-lg p-4">
                        <p class="text-gray-600">Total Sprints</p>
                        <p class="text-xl font-bold">24</p>
                    </div>
                    <div class="bg-green-100 rounded-lg p-4">
                        <p class="text-gray-600">Completed</p>
                        <p class="text-xl font-bold">18</p>
                    </div>
                    <div class="bg-yellow-100 rounded-lg p-4">
                        <p class="text-gray-600">In Progress</p>
                        <p class="text-xl font-bold">6</p>
                    </div>
                </div>
            </div>




        </>
    )
}