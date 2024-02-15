import {useEffect} from 'react'
import { useSelector } from 'react-redux';

import { getUser } from "../api/Api";
import { selectToken } from '../store/slices/tokenSlice';

const Dashboard = () => {
  const token = useSelector(selectToken)

  const getUserData = async () => {
    try {
      const {data} = await getUser(token)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    getUserData()
  },[])

  return (
    <div className="mt-20">
      <h1>User Proile</h1>
      <h4 className="mt-6">Email:</h4>
    </div>
  );
};

export default Dashboard;
