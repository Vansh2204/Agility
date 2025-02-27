import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { iconName } from "@fortawesome/free-solid-svg-icons/fa0";
import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";
import Header from "../components/Header";
import HomePage from "./HomePage";
import MyWork from "./MyWork";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { BookOpenCheck, House, Bell, Columns3, Waves, SquareDashedKanban, PanelsTopLeft, LogOut, User, UserPlus, Home } from "lucide-react";
import Sprints from "./Sprints";
import { toast } from "react-toastify";
import Project from "./Project";


export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState();
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const { logoutuser } = useAuth();
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handlelogout = () => {
        if (window.confirm("Are you sure want to logout ?")) {
            logoutuser();
            navigate('/login');
            toast.info("Please re-login to Continue");
        }

    };

    return (
        <>
            <Header />
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 shadow-sm rounded-tr-lg text-black p-5" >
                    <ul>
                        <li
                            className={`p-2 cursor-pointer text-black flex items-cente font-semibold tracking-wide font-sans text-lg hover:bg-white px-2 py-1 rounded  `}
                            onClick={() => navigate("/dashboard")}

                        ><Home size={20} className="m-2" /> Home
                        </li>
                        <li
                            className={`p-2 cursor-pointer text-black flex items-center text-lg tracking-wide font-semibold font-sans hover:bg-white px-2 py-1 rounded  `}
                            onClick={() => navigate("/dashboard/mywork")}
                        ><BookOpenCheck size={20} className="m-2" />  My Work
                        </li>
                        <li
                            className={`p-2 cursor-pointer text-black flex items-center text-lg tracking-wide font-semibold font-sans hover:bg-white px-2 py-1 rounded  `}
                            onClick={() => navigate("/dashboard/project")}

                        ><SquareDashedKanban size={20} className="m-2" /> Project
                        </li>

                        <li
                            className={`p-2 cursor-pointer text-black flex items-center text-lg tracking-wide font-semibold font-sans  hover:bg-white px-2 py-1 rounded`}
                            onClick={() => setActiveMenu("")}
                        ><Columns3 size={20} className="m-2" /> Bugs Queue
                        </li>
                        <li
                            className={`p-2 cursor-pointer text-black flex items-center text-lg tracking-wide font-semibold font-sans hover:bg-white px-2 py-1 rounded`}
                            onClick={() => navigate("/dashboard/profile")}
                        ><User size={20} className="m-2" /> Profile
                        </li>

                        
                        {/* <div class=" flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                            <div class="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <svg class="size-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>
                            </div>
                            <div>
                                <a href="#" class="font-semibold text-gray-900">
                                    Analytics
                                    <span class="absolute inset-0"></span>
                                </a>
                                <p class="mt-1 text-gray-600">Get a better understanding of your traffic</p>
                            </div>
                        </div> */}


                    </ul>
                    <ul className="mt-5 ms-2">
                        <li className="p-2 cursor-pointer text-black flex items-center text-lg tracking-wide font-semibold font-sans hover:bg-white py-1 rounded" onClick={handlelogout}><LogOut size={20} className="m-1" />Logout</li>
                    </ul>

                </div>

                {/* Content Area */}
                <div className="flex-1 p-1 content">
                    <Outlet />
                </div>

            </div>
        </>
    );

}