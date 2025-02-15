import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { ChevronUp, ChevronDown, EllipsisVertical, Maximize2, Edit2, Bug, Plus,ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

export default function SprintDetail(){
    return(
        <>
        <div>
            Tasks for Sprints
        </div>
        </>
    )
}