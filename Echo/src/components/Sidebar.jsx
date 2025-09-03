import { useTheme } from "../context/ThemeContext";
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
  const { theme } = useTheme();
  const mainBgClass = theme === 'dark' ? 'bg-[var(--dark-bg)] text-white' : 'bg-[var(--primary)] text-white';

  return (
    <div className={`bg-[var(--color-1)]  h-full p-4  flex flex-col`}>
   

      <div className="w-[30px] my-2 ">
        <ul className="flex flex-col gap-2 text-black w-full text-left text-[12px]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold bg-[var(--primary-txt)] ' : ''}`
              }
            >
              <img className="w-[30px] hover:font-bold text-2xl" src="/home.png" alt="Home" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold bg-[var(--primary-txt)]' : ''}`
              }
            >
              <img className="w-[30px] hover:font-bold text-2xl" src="/info.png" alt="About" />
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold bg-[var(--primary-txt)]' : ''}`
              }
            >
              <img className="w-[30px] hover:font-bold text-2xl" src="/user.png" alt="login" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold bg-[var(--primary-txt)]' : ''}`
              }
            >
             <img className="w-[30px] hover:font-bold text-2xl" src="/peeps.png" alt="Community" />
            </NavLink>
          </li>
        </ul>
      </div>

    </div>
  );
}