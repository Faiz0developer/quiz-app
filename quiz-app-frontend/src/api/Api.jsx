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
axios.post("http://localhost:3000/auth/",_user, {
    headers:{
        "Content-Type": "application/json",
    },
})

export const loginUser = (_user) =>
axios.post("http://localhost:3000/auth/login", _user, {
    headers:{
        "Content-Type": "application/json",
    }
})

export const getUser = (_token) =>
axios.get("http://localhost:3000/user",{
    headers:{
        Authorization: `Bearer ${_token}`,
        "Content-Type": "application/json",
    }
})