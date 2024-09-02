import "/src/app/globals.css";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    const handleDriverSelect = (id) => {
        router.push(`/driver/${id}`);
    };

    const handleNewsFetch = () => {
        router.push('/news')
    };

    return (
        <div className="navbar bg-base-200 font-racing z-50 relative">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                        <li>
                            <a onClick={() => handleNewsFetch()}>News</a>
                            <a>Drivers</a>
                            <ul className="p-2">
                                <li><a onClick={() => handleDriverSelect('4665')}>M. Verstappen</a></li>
                                <li><a onClick={() => handleDriverSelect('5579')}>L. Norris</a></li>
                                <li><a onClick={() => handleDriverSelect('5498')}>C. Leclerc</a></li>
                                <li><a onClick={() => handleDriverSelect('868')}>L. Hamilton</a></li>
                                <li><a onClick={() => handleDriverSelect('5752')}>O. Piastri</a></li>
                                <li><a onClick={() => handleDriverSelect('4686')}>C. Sainz</a></li>
                                <li><a onClick={() => handleDriverSelect('4472')}>S. Pérez</a></li>
                                <li><a onClick={() => handleDriverSelect('5503')}>G. Russell</a></li>
                                <li><a onClick={() => handleDriverSelect('348')}>F. Alonso</a></li>
                                <li><a onClick={() => handleDriverSelect('4775')}>L. Stroll</a></li>
                                <li><a onClick={() => handleDriverSelect('4396')}>N. Hülkenberg</a></li>
                                <li><a onClick={() => handleDriverSelect('5652')}>Y. Tsunoda</a></li>
                                <li><a onClick={() => handleDriverSelect('4510')}>D. Ricciardo</a></li>
                                <li><a onClick={() => handleDriverSelect('5501')}>P. Gasly</a></li>
                                <li><a onClick={() => handleDriverSelect('4623')}>K. Magnussen</a></li>
                                <li><a onClick={() => handleDriverSelect('4678')}>E. Ocon</a></li>
                                <li><a onClick={() => handleDriverSelect('5592')}>A. Albon</a></li>
                                <li><a onClick={() => handleDriverSelect('5682')}>Z. Guanyu</a></li>
                                <li><a onClick={() => handleDriverSelect('4520')}>V. Bottas</a></li>
                            </ul>
                        </li>
                        <li><a>Schedule</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-primary">Quali</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a onClick={() => handleNewsFetch()}>News</a></li>
                    <li>
                        <details>
                            <summary>Drivers</summary>
                            <ul className="p-2 max-h-40 overflow-y-auto">
                                <li><a onClick={() => handleDriverSelect('4665')}>M. Verstappen</a></li>
                                <li><a onClick={() => handleDriverSelect('5579')}>L. Norris</a></li>
                                <li><a onClick={() => handleDriverSelect('5498')}>C. Leclerc</a></li>
                                <li><a onClick={() => handleDriverSelect('868')}>L. Hamilton</a></li>
                                <li><a onClick={() => handleDriverSelect('5752')}>O. Piastri</a></li>
                                <li><a onClick={() => handleDriverSelect('4686')}>C. Sainz</a></li>
                                <li><a onClick={() => handleDriverSelect('4472')}>S. Pérez</a></li>
                                <li><a onClick={() => handleDriverSelect('5503')}>G. Russell</a></li>
                                <li><a onClick={() => handleDriverSelect('348')}>F. Alonso</a></li>
                                <li><a onClick={() => handleDriverSelect('4775')}>L. Stroll</a></li>
                                <li><a onClick={() => handleDriverSelect('4396')}>N. Hülkenberg</a></li>
                                <li><a onClick={() => handleDriverSelect('5652')}>Y. Tsunoda</a></li>
                                <li><a onClick={() => handleDriverSelect('4510')}>D. Ricciardo</a></li>
                                <li><a onClick={() => handleDriverSelect('5501')}>P. Gasly</a></li>
                                <li><a onClick={() => handleDriverSelect('4623')}>K. Magnussen</a></li>
                                <li><a onClick={() => handleDriverSelect('4678')}>E. Ocon</a></li>
                                <li><a onClick={() => handleDriverSelect('5592')}>A. Albon</a></li>
                                <li><a onClick={() => handleDriverSelect('5682')}>Z. Guanyu</a></li>
                                <li><a onClick={() => handleDriverSelect('4520')}>V. Bottas</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Schedule</a></li>
                </ul>
            </div>
        <div className="navbar-end">
            <label className="flex cursor-pointer gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
       <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
  <input type="checkbox" value="autumn" className="toggle theme-controller " />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
         <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
</label>
</div>
        </div>
    );
};

export default Navbar;
