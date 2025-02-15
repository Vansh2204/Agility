import React, { useState } from 'react';
import { ChevronDown ,MoveRight} from "lucide-react";


export default function Sprints() {

    const [openMenu, setOpenMenu] = useState(null);



    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };
    
    const toggleMenu2 = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        
        <>
        <div className="p-2 cursor-pointer border-1 border-solid rounded-lg m-4">
            <div className="flex items-center justify-between rounded"
                onClick={() => toggleMenu("Sprint1")}
            >
                <div className="flex items-center gap-2">
                <MoveRight size={18}/>
                    Sprint 1
                </div>
                <ChevronDown size={18} className={`${openMenu === "Sprint1" ? "rotate-180" : ""} transition-transform`} />
            </div>
            {openMenu === "Sprint1" && (
                <table class="w-full border-collapse mt-4">
                    <thead>
                        <tr class="bg-gray-200 text-gray-700 text-left">
                            <th class="p-2 border">Task</th>
                            <th class="p-2 border">Assigned to</th>
                            <th class="p-2 border">Status</th>
                            <th class="p-2 border">Priority</th>
                            <th class="p-2 border">Project</th>
                            <th class="p-2 border">Sprint</th>

                        </tr>
                    </thead>
                </table>
            )}
        </div>
        <div className="p-2 cursor-pointer border-1 border-solid rounded-lg m-4">
        <div
            className="flex items-center justify-between rounded"
            onClick={() => toggleMenu2("Sprint2")}
        >
            <div className="flex items-center gap-2">
            <MoveRight size={18}/>
                Sprint 2
            </div>
            <ChevronDown size={18} className={`${openMenu === "Sprint2" ? "rotate-180" : ""} transition-transform`} />
        </div>
        {openMenu === "Sprint2" && (
            <table class="w-full border-collapse mt-4">
                <thead>
                    <tr class="bg-gray-200 text-gray-700 text-left">
                        <th class="p-2 border">Task</th>
                        <th class="p-2 border">Assigned to</th>
                        <th class="p-2 border">Status</th>
                        <th class="p-2 border">Priority</th>
                        <th class="p-2 border">Project</th>
                        <th class="p-2 border">Sprint</th>

                    </tr>
                </thead>
            </table>
        )}
    </div>
    </>
    );
};

