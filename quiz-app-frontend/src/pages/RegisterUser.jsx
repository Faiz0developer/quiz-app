/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'

import UserRegister from "../components/UserRegister";
import { registerUser } from "../api/Api";
import Styles from "../../styles/RegisterUser.module.css";
import { registerUserAction } from "../store/slices/UserSlice";

const RegisterUser = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [regitrationsDetails, setRegitrationsDetails] = useState("");

  const navigate= useNavigate()

  const userData = {
    name: userName,
    email: userEmail,
    password: userPassword,
    confirm_password: userConfirmPassword,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await registerUser(userData)
      if(data.status==='success'){
        dispatch(registerUserAction(data.data.userId))
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
    // setIsRegistered(false);
    // const data = await fetch("http://localhost:3000/auth/", {
    //   method: "POST",
    //   body: JSON.stringify(userData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const result = await data.json();
    // setRegitrationsDetails(result);
    // console.log(result)
  };

  // if (isRegistered) {
  //   return (
  //     <div className="flex flex-col w-full items-center ">
  //       {regitrationsDetails.status === "success" ? (
  //         <p
  //           className={`${Styles.registerSuccesfull} text-[#4ADE80] px-12 py-3 text-2xl`}
  //         >
  //           {regitrationsDetails.message} ✔{" "}
  //         </p>
  //       ) : (
  //         ""
  //       )}
  //       <div className="w-1/3 mt-12 bg-[#365314] p-12 rounded-lg">
  //         {regitrationsDetails.status === "error" ? (
  //           <p
  //             className={`${Styles.registerSuccesfull} text-[#B91C1C] px-4 py-3 text-base font-bold`}
  //           >
  //             {`${regitrationsDetails.message} !`}{" "}
  //           </p>
  //         ) : (
  //           ""
  //         )}
  //         <form
  //           onSubmit={submitHandler}
  //           className="flex flex-col gap-12 text-white"
  //         >
  //           <UserRegister
  //             onSubmitData={submitHandler}
  //             userName={setUserName}
  //             userEmail={setUserEmail}
  //             userPassword={setUserPassword}
  //             userConfirmPassword={setUserConfirmPassword}
  //           />
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="w-[350px] h-2/3 mt-12 bg-[#fff] py-8 px-10 rounded-lg">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 text-white"
      >
        <UserRegister
          onSubmitData={submitHandler}
          userName={setUserName}
          userEmail={setUserEmail}
          userPassword={setUserPassword}
          userConfirmPassword={setUserConfirmPassword}
        />
      </form>
    </div>
  );
};

export default RegisterUser;
