import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Navbar from "./components/layout/Navbar";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <main className="flex justify-center bg-[#0284C7] h-[100vh]">
            <Routes>
              <Route path="/" element={<RegisterUser/>} />
              <Route path="/login" element={<LoginUser/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>    
      </main>
    </BrowserRouter>
  );
}

export default App;
