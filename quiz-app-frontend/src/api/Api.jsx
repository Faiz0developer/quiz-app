import axios from 'axios'
// export const registerUser = async(userData) => {
//         fetch("http://localhost:3000/auth/", {
//             method: "POST",
//             body: JSON.stringify(userData),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
// }

export const registerUser = (_user) =>
axios.post("https://quiz-app-backend-seven.vercel.app/auth",_user, {
    headers:{
        "Content-Type": "application/json",
    },
})

export const loginUser = (_user) =>
axios.post("https://quiz-app-backend-seven.vercel.app/auth/login", _user, {
    headers:{
        "Content-Type": "application/json",
    }
})

export const getUser = (_token) =>
axios.get("https://quiz-app-backend-seven.vercel.app/user",{
    headers:{
        Authorization: `Bearer ${_token}`,
        "Content-Type": "application/json",
    }
})