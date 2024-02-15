import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'

import { loginUser } from "../api/Api";
import { setToken } from "../store/slices/tokenSlice";

const LoginUser = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate= useNavigate()

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const loginDetals = {
      email,
      password,
    };
    try {
      const {data} = await loginUser(loginDetals)
      console.log(data)
      if(data.status==='success'){
        dispatch(setToken(data.data.token))
        // navigate("/dashboard")
      }

    } catch (error) {
      console.log(error)
    }
    // fetch("http://localhost:3000/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(loginDetals),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="w-[350px] mt-12 bg-[#fff] py-8 px-10 h-[300px] rounded-lg">
      <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-6">
        <div className="flex flex-col gap-1 text-[#0F172A]">
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="text"
            id="email"
            ref={emailRef}
            placeholder="Enter your email"
            className="py-2 text-black bg-transparent border-b-2 border-[#0F172A] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 text-[#0F172A]">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="text"
            id="password"
            ref={passwordRef}
            placeholder="Enter password"
            className="py-2 text-black bg-transparent border-b-2 border-[#0F172A] focus:outline-none"
          />
        </div>
        <button className="bg-[#2563EB] border-[#78350F] rounded-lg py-1.5">
          Login
        </button>
          <h3 className="text-center">OR</h3>
        <div >
          <button className="text-center" onClick={() => navigate("/")}>Create account</button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
