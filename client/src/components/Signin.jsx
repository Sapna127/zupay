import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const  onClick = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error("Signin failed");
        }
  
        const data = await response.json();
  
        localStorage.setItem("token", data.token);
          navigate("/");
      } catch (err) {
        setError("Invalid email or password");
      }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <div className="font-bold text-4xl pt-6">Sign in</div>
          <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your credentials to access your account
          </div>
          <div>
            <div className="text-sm font-medium text-left py-2">Email</div>
            <input
              className="w-full px-2 py-1 border rounded border-slate-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-left py-2">Password</div>
            <input
              type="password"
              className="w-full px-2 py-1 border rounded border-slate-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button
              onClick={onClick}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Sign in
            </button>
          </div>
          <div className="py-2 text-sm flex justify-center">
            <div>Don't have an account?</div>
            <Link className="pointer underline pl-1 cursor-pointer" to={"/sign-up"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
