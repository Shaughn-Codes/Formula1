
import "/src/app/globals.css";
const Navbar = () =>{

    return(
<div className="navbar bg-base-100 font-racing">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a>Drivers</a>
                            <ul className="p-2">
                            <li><a>M. Verstappen</a></li>
                                <li><a>L. Norris</a></li>
                                <li><a>C. Leclare</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-primary">Quali</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>News</a></li>
                    <li>
                        <details>
                            <summary>Drivers</summary>
                            <ul className="p-2">
                                <li><a>M. Verstappen</a></li>
                                <li><a>L. Norris</a></li>
                                <li><a>C. Leclare</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
        </div>
)};

export default Navbar;