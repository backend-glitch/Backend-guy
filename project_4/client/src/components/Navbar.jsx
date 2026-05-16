import { Link } from "react-router-dom";

function Navbar(){

    return (

        <nav className="flex items-center justify-between px-8 py-4 shadow">

            <h1 className="text-2x1 font-bold">
                BlogWorld
            </h1>

            <div className="flex gap-6">

                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

            </div>
        </nav>
    )
}

export default Navbar;
