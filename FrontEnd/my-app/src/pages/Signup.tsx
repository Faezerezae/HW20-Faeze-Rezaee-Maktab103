import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IAuthResponse, ISignupBody, signUpApi } from "../apis/auth.apis";
import { Session } from "../utils/session";



export const SignupPage: React.FC = ()=> {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [textError, settextError] = useState("");
    const navigate = useNavigate();
    const [notifElement, setNotifElement] = useState<React.ReactNode | null>(null);
console.log(password,username)
    const togglePasswordVisibilitySignin = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleSignup = async () => {
        const body: ISignupBody = {
            username,
            password,
        };

        try {
            const response: IAuthResponse = await signUpApi(body);
            const sesssion = new Session();
            sesssion.setAccessToken(response.token);
            navigate('/tasks');
        }catch (error:any) {
            settextError(`*${error.response.data.message}`)
          }
    };


    return (
        <div className="w-[430px] h-[920px] m-0 p-4 mx-auto">
            {notifElement} 
            <div className="w-5 p-4">
                <Link to={"/login"} className="text-6xl font-black">
                 ←
                </Link>
            </div>
            <div className="flex items-center justify-center p-24"></div>
            <div className="w-full space-y-6 p-4 bg-white text-center relative">
                <h5 className="font-semibold text-3xl text-gray-900 text-center">
                    Signup to Your Account
                </h5>
                <div className="relative mb-6 mx-2 text-gray-500 hover:border-black hover:text-black">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <i className="bi bi-person-bounding-box"></i>
                    </div>
                    <input
                        type="text"
                        name="username"
                        id="login-form-username"
                        className="bg-gray-50 border border-transparent text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="relative mb-4 mx-2 text-gray-500 hover:border-black hover:text-black flex justify-center items-center">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <i className="bi bi-lock-fill"></i>
                    </div>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        id="login-form-password"
                        placeholder="Password"
                        required
                        className="bg-gray-50 border border-transparent text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="show-password absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer z-40"
                        onClick={togglePasswordVisibilitySignin}
                    >
                        <i className={`bi ${passwordVisible ? "bi-eye" : "bi-eye-slash"}`} id="eye"></i>
                    </button>
                </div>
                <p className="text-start text-red-600 px-4">{textError}</p>
                <div className="p-4">
                    <Link to="/login" className=" p-8 font-bold text-xl text-gray-900 text-center active:underline">login</Link>
                </div>
                
                <button
                    type="submit"
                    onClick={handleSignup}
                    className="w-full h-12 rounded-full bg-slate-600 hover:bg-black text-white whitespace-nowrap font-bold text-center absolute  top-[500px] right-0"
                >
                    Signup
                </button>
            </div>
        </div>
    );
}
