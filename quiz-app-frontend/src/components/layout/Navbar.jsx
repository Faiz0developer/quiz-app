import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <header className="bg-[#fff] h-20">
        <nav>
            <ul className="flex gap-4 ml-20">
                <li className="text-[#475569] pt-4 text-lg">
                <Link to="/">Register</Link>
                </li>
                <li className="text-[#475569] pt-4 text-lg">
                <Link to="/login">Login</Link>
                </li>
                <li className="text-[#475569] pt-4 text-lg">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar