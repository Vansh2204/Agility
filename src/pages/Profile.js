import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState ,useEffect} from "react";


export default function Profile() {

    const { isLoggedIn ,authoauthorizationtoken} = useAuth();
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('userData')));
    const [Data,SetData]=useState({});
    const navigate = useNavigate();
 

      function submits(e){
        e.preventDefault()
        

        console.log(Data)
        fetch(`https://localhost:44302/api/Users/UpdateUser/`,{
          method:"PUT",
          headers:{ 'Content-Type': 'application/json',Authorization : authoauthorizationtoken},
          body:JSON.stringify({ ...Data, id: userData.userID })
        }).then(()=>{
            sessionStorage.clear()
            
        }).then(()=>{
        sessionStorage.setItem("userName",Data.userName)
          sessionStorage.setItem("userEmail",Data.userEmail)
          sessionStorage.setItem("userRole",Data.userRole)
          console.log('record updated')
        
        })
    
    }
    const handleChange = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value });
      };
    return (
        <>
              <div className="flex flex-row md:flex-row gap-6 p-6">
                {/* Update Profile Card */}
                <div className=" md:w-1/2 bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={(e)=>submits(e)} className="space-y-4">
                        <div>
                            <label className="block text-gray-600">Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={userData.userName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={userData.userEmail}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Role</label>
                            <input
                                type="text"
                                name="role"
                                defaultValue={userData.userRole}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                       
                       
                        <button type="submit" className="w-full bg-black hover:bg-gray-700 text-white py-2 rounded-lg">
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Profile Details Card */}
                <div className=" md:w-1/2 bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Name: </span> {userData.userName}
                        </p>
                        <p>
                            <span className="font-semibold">Email: </span> {userData.userEmail}
                        </p>
                        <p>
                            <span className="font-semibold">Role: </span> {userData.userRole}
                        </p>
                        <p>
                            <span className="font-semibold">Status: </span> {isLoggedIn ? (<span className="font-semibold">Offline</span>):(<span className="font-semibold text-success">Online</span>)}
                        </p>
                        
                    </div>
                </div>
            </div>


        </>
    )
}