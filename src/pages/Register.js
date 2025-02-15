import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link,Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export default function Register() {

  const {isloggedin,authorizationtoken} = useAuth();
  const [regs, setregs] = useState({});
  const navigate = useNavigate();

  

  const validateField = (name, value) => {
    switch (name) {
      case 'UserName':
        return value.trim() ? (/[a-zA-Z0-9_]{3,20}/.test(value) ? '' : 'Username must be 3-20 characters long and contain only alphanumeric characters or underscores.') : 'Username is required';
      case 'UserEmail':
        return value.trim() ? (/\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid') : 'Email is required';
      case 'Role':
        return value.trim() ? (['Developer', 'Team Manager'].includes(value) ? '' : 'Invalid role. Valid roles are: Devloper,Team Manager') : 'Role is required';
      case 'Password':
        return value ? (value.length >= 6 ? '' : 'Password must be at least 6 characters long') : 'Password is required';
      default:
        return '';
    }
  };

  function handleSubmit() {
    fetch("https://localhost:44302/api/Users/insertuser", { method: "POST", body: JSON.stringify(regs), headers: { "Content-Type": "application/json",Authorization:authorizationtoken } })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        toast.success("User registered , Please login");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  if(isloggedin){
    return <Navigate to="/"/>
  }else{

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="UserName"
                  name="UserName"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => { setregs({ ...regs, UserName: e.target.value }) }}
                  value={regs.UserName}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="UserEmail"
                  name="UserEmail"
                  type="text"
                  required
                  autoComplete="UserEmail"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => { setregs({ ...regs, UserEmail: e.target.value }) }} value={regs.UserEmail}

                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                User Role
              </label>
              <div className="mt-2">
                <input
                  id="UserRole"
                  name="UserRole"
                  type="text"
                  required
                  autoComplete="userrole"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => { setregs({ ...regs, UserRole: e.target.value }) }} value={regs.UserRole}

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-white hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="PasswordHash"
                  name="PasswordHash"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e) => { setregs({ ...regs, PasswordHash: e.target.value }) }} value={regs.PasswordHash}

                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center border border-white rounded-md bg-gray-800 hover:bg-emerald-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{' '}
            <Link to='/login' class="font-semibold text-gray-600 hover:text-indigo-500">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  )
}
}