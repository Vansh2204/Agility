import { Navigate, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BookOpenCheck, House, Bell, Columns3, Waves, SquareDashedKanban, PanelsTopLeft, LogOut, User, UserPlus } from "lucide-react";


export default function Header() {

    const { isloggedin, logoutuser, user } = useAuth();
    // const [user, setuser] = useState({});
    const navigate = useNavigate();
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddItem = () => {
        setIsDialogOpen(true);
    };




    function toggleDropdown() {
        const dropdown = document.getElementById("dropdownMenu");
        dropdown.classList.toggle("hidden");
    }
    // const menuButton = document.getElementById('mobile-menu-button');
    //     const mobileMenu = document.getElementById('mobile-menu');
    //     const icons = menuButton.querySelectorAll('svg');

    //     menuButton.addEventListener('click', () => {
    //         const isExpanded = mobileMenu.classList.toggle('hidden');
    //         menuButton.setAttribute('aria-expanded', !isExpanded);

    //         // Toggle icons
    //         icons.forEach(icon => icon.classList.toggle('hidden'));
    //     });
    

    return (
        <>
            {isloggedin ? (
                <div>

                    <header class="bg-white h-12" >
                        <nav class="mx-auto flex max-w-7xl items-center justify-between py-2 px-6" aria-label="Global">
                            <a href="#" class="-m-1.5 p-1.5 left-0">
                                <FontAwesomeIcon icon={faListCheck} className="h-4 text-black" />
                                <span class="font-semibold ml-2 text-xl text-black">Agility</span>
                            </a>
                            <div class="flex lg:hidden">
                                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                                    <span class="sr-only">Open main menu</span>
                                    <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                            </div>
                            <div class="hidden lg:flex lg-flex-1 lg:gap-x-12 lg:justify-end">
                                <a href="#" class="text-sm/6 font-semibold text-black cursor-pointer"><Bell size={20} /></a>
                                <a href="#" class="text-sm/6 font-semibold text-black cursor-pointer"><UserPlus size={20} /></a>
                               
                            </div>
                            



                            {/* <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" class="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
                    </div> */}
                        </nav>

                    </header>

                </div>

            ) : (
                <nav class="bg-black bg-opacity-100 backdrop-blur-lg">
                    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div class="relative flex h-16 items-center justify-between">
                            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <div class="flex shrink-0 items-center">
                                    <FontAwesomeIcon icon={faListCheck} className="h-4 text-white" />
                                    <span class="font-bold ml-2 text-xl text-white">APM</span>
                                </div>
                            </div>
                            <div class="flex flex-1 rounded-full sm:items-stretch sm:justify-end">
                                <div class="space-x-4 mr-2 justify-evenly col-end-12">
                                    <a href="/register" class="bg-indigo-900 px-6 py-2 rounded-full text-white hover:bg-indigo-600 transition-all">
                                        Get Started
                                    </a>

                                </div>
                                <div class="space-x-4 justify-evenly col-end-12">
                                    <a href="/login" class="bg-black px-6 py-2 rounded-full text-white hover:drop-shadow-xl transition-all">
                                        Sign In
                                    </a>

                                </div>

                            </div>

                        </div>
                    </div>


                </nav>
            )}
        </>
    )
}