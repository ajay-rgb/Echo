import { useTheme } from "../context/ThemeContext";
import {Link, NavLink} from 'react-router-dom';
import Quote from './Quote';

export default function Sidebar() {
  const { theme } = useTheme();
  const mainBgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[var(--primary)] text-white';
  
  return (
    <div className={`${mainBgClass} w-3/12 h-full p-4 flex flex-col`}>
      <h1 className='text-3xl font-bold text-left text-white mb-4'>Echo</h1>
      
      <div className="flex-grow w-full my-2">
        <ul className="flex flex-col gap-2 w-full text-left">
            <NavLink
            to="/"
            className={({ isActive }) =>
                `w-full ${isActive ? 'font-bold text-white' : 'text-violet-200'}`
            }
            >
            <li className="p-2 rounded">Home</li>
            </NavLink>

            <NavLink
            to="/about"
            className={({ isActive }) =>
                `w-full ${isActive ? 'font-bold text-white' : 'text-violet-200'}`
            }
            >
            <li className="p-2 rounded">About</li>
            </NavLink>

            <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                `w-full ${isActive ? 'font-bold text-white' : 'text-violet-200'}`
            }
            >
            <li className="p-2 rounded">Dashboard</li>
            </NavLink>

            <NavLink
            to="/login"
            className={({ isActive }) =>
                `w-full ${isActive ? 'font-bold text-white' : 'text-violet-200'}`
            }
            >
            <li className="p-2 rounded">Login</li>
            </NavLink>

            <NavLink
            to="/community"
            className={({ isActive }) =>
                `w-full ${isActive ? 'font-bold text-white' : 'text-violet-200'}`
            }
            >
            <li className="p-2 rounded">Community</li>
            </NavLink>
        </ul>
      </div>
      
      <Quote />
    </div>
  );
}