import { useState } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";


export default function Login() {

    const { storetokencreds, storeusercreds, isloggedin } = useAuth();
    const [log, setlog] = useState({});
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    const [formData, setFormData] = useState({
        UserName: '',
        PasswordHash: '',
    });
    const [touched, setTouched] = useState({
        UserName: false,
        PasswordHash: false,
    });
    const [errors, setErrors] = useState({
        UserName: '',
        PasswordHash: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'UserName':
                return value.trim() ? '' : 'UserName is required';
            case 'PasswordHash':
                return value ? (value.length >= 6 ? '' : 'Password must be at least 6 characters long') : 'Password is required';
            default:
                return '';
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (touched[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: validateField(name, value)
            }));
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));
        // setErrors(prevErrors => ({
        //     ...prevErrors,
        //     [name]: validateField(name, value)
        // }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const touchedAll = Object.fromEntries(
            Object.keys(touched).map(key => [key, true])
        );
        setTouched(touchedAll);

        const newErrors = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, validateField(key, value)])
        );
        setErrors(newErrors);

        if (Object.values(newErrors).every(error => error === '')) {

            const response = await fetch("https://localhost:44302/api/Users/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success("Logged in");
                storeusercreds(responseData.user);
                storetokencreds(responseData.token);
                setFormData({ UserName: '', PasswordHash: '' });
                setTouched({ UserName: false, PasswordHash: false });
                setErrors({ UserName: '', PasswordHash: '' });
                navigate("/dashboard")
            }
            else {
                toast.error(responseData.message)
            }

        }
    };


    return (
        <>
            <div class="flex h-screen  flex-col justify-center">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-20 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label for="email" class="block text-sm/6 font-medium text-black">User Name</label>
                            <div class="mt-2">
                                <input type="text" name="UserName" id="UserName" autocomplete="text" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={formData.UserName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />
                                {errors.UserName && <span className="text-red-500 text-sm mt-1">{errors.UserName}</span>}

                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="password" class="block text-sm/6 font-medium text-black">Password</label>
                                <div class="text-sm">
                                    <a href="#" class="font-semibold text-white hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div class="mt-2">

                                <input type={showPassword ? 'text' : 'password'} name="PasswordHash" id="PasswordHash" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    value={formData.PasswordHash}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.PasswordHash && <span className="text-red-500 text-sm mt-1">{errors.PasswordHash}</span>}

                            </div>
                        </div>

                        <div>
                            <button type="submit" class="flex w-full justify-center bg-gray-800 hover:bg-emerald-800 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm  ocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p class="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account ?
                        <a href="#" class="font-semibold text-gray-600 ml-1 hover:text-indigo-500"><Link to='/register'>Register</Link></a>
                    </p>
                </div>
            </div>
        </>
    )

}