import { useTheme } from "../context/ThemeContext";
import { NavLink } from 'react-router-dom';
import Quote from './Quote';

export default function Sidebar() {
  const { theme } = useTheme();
  const mainBgClass = theme === 'dark' ? 'bg-[var(--dark-bg)] text-white' : 'bg-[var(--primary)] text-white';

  return (
    <div className={`bg-gray-100 w-3/12 h-full p-4  flex flex-col`}>
      <h1 className='text-3xl font-bold text-left text-black mb-4'>Echo</h1>

      <div className="flex-grow w-full my-2">
        <ul className="flex flex-col gap-2 text-black w-full text-left text-[12px]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold text-[var(--primary-txt)]' : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold' : ''}`
              }
            >
              About
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
                `block p-2 rounded ${isActive ? 'font-bold' : ''}`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'font-bold' : ''}`
              }
            >
              Community
            </NavLink>
          </li>
        </ul>
      </div>

      <Quote />
    </div>
  );
}