import { Navigate, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, BookOpenCheck, House, Bell, Columns3, Waves, SquareDashedKanban, PanelsTopLeft, LogOut, User, UserPlus } from "lucide-react";


export default function Header() {
    const [ins, setins] = useState([]);
    const { isloggedin, logoutuser, user, authorizationtoken } = useAuth();
    // const [user, setuser] = useState({});
    const navigate = useNavigate();
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isnotifydialog, setnotifydialog] = useState(false);

    const [invites, setinvites] = useState({
        inviteId: "",
        senderUsername: userData.userName,
        receiverUsername: "",
        //status: "Pending"
    });

    function toggleDropdown() {
        const dropdown = document.getElementById("dropdownMenu");
        dropdown.classList.toggle("hidden");
    }
    useEffect(() => {
        if (userData.userName) {
            fetchInvites();
        }
    }, [userData.userName]);
    // const menuButton = document.getElementById('mobile-menu-button');
    //     const mobileMenu = document.getElementById('mobile-menu');
    //     const icons = menuButton.querySelectorAll('svg');

    //     menuButton.addEventListener('click', () => {
    //         const isExpanded = mobileMenu.classList.toggle('hidden');
    //         menuButton.setAttribute('aria-expanded', !isExpanded);

    //         // Toggle icons
    //         icons.forEach(icon => icon.classList.toggle('hidden'));
    //     });

    const fetchInvites = async () => {
        try {
            const response = await fetch(
                `https://localhost:44302/api/Invites/GetByReceiverName/${userData.userName}`
            );
            const receiverinvitedata = await response.json();
            setins(receiverinvitedata);
            console.log(receiverinvitedata);
        } catch (error) {
            console.error("Error fetching invites:", error);
        }
    };

    const handleSendInvite = async () => {
        try {
            const { inviteId, ...ins } = invites;
            const response = await fetch("https://localhost:44302/api/Invites/SendInvite", {
                method: "POST",
                body: JSON.stringify(ins),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationtoken,
                },
            });

            if (response.ok) {
                toast.success("Invite Sent");
                setIsDialogOpen(false);
                setinvites({
                    inviteId: "",
                    senderUsername: userData.userName,
                    receiverUsername: "",
                    //status: "Pending"
                });
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };



    const handlechange = (e) => {
        const { name, value } = e.target;
        setinvites((prev) => ({ ...prev, [name]: value }));
    };

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
                                <a href="#" class="text-sm/6 font-semibold text-black cursor-pointer"><Bell size={20} onClick={() => setnotifydialog(true)} />
                                    {ins.length > 0 && (
                                        <span className="relative -top-8 -right-2 bg-red-700 text-white text-xs font-bold px-1.5 py-0.2 rounded-full">
                                            {ins.length}
                                        </span>)}
                                </a>
                                <a href="#" class="text-sm/6 font-semibold text-black cursor-pointer"><UserPlus size={20} onClick={() => setIsDialogOpen(true)} /></a>

                            </div>
                            {isnotifydialog && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h2 className="text-xl font-semibold mb-4">Invitations</h2>
                                        <div className="space-y-3">
                                            {ins.length > 0 ? (
                                                ins.map((i) => (

                                                    <ul role="list" className="divide-y divide-gray-100" key={i.inviteId}>
                                                        <li className="flex justify-between gap-x-6 ">
                                                            <div className="flex min-w-0 gap-x-4">
                                                                <div className="min-w-0 flex-auto">
                                                                    <p className="text-sm font-semibold text-gray-900">{i.senderUsername}</p>
                                                                </div>
                                                            </div>
                                                            {/* Buttons to accept/reject invite */}
                                                            <div className="flex gap-4">
                                                                <button >
                                                                    <CheckCircle size={24} className="text-green-500 hover:text-green-700 cursor-pointer" />
                                                                </button>
                                                                <button >
                                                                    <XCircle size={24} className="text-red-500 hover:text-red-700 cursor-pointer" />
                                                                </button>
                                                            </div>
                                                        </li>
                                                    </ul>

                                                ))
                                            ) : (
                                                <div>
                                                    <h1>Not Invitations Yet</h1>
                                                </div>
                                            )}

                                        </div>
                                        <div className="flex justify-end mt-4 space-x-2">
                                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setnotifydialog(false) }}>
                                                Close
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {isDialogOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h2 className="text-xl font-semibold mb-4">Invite</h2>
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                name="receiverUsername"
                                                placeholder="Enter User Name"
                                                className="w-full border p-2 rounded"
                                                onChange={handlechange}
                                                value={invites.receiverUsername}
                                            />
                                        </div>
                                        <div className="flex justify-end mt-4 space-x-2">
                                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setIsDialogOpen(false) }}>
                                                Cancel
                                            </button>
                                            <button className="bg-black text-white px-4 py-2 rounded" onClick={handleSendInvite}>Send Invite</button>
                                        </div>
                                    </div>
                                </div>
                            )}




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