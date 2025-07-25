
import {Link, NavLink} from 'react-router-dom';
import {useTheme} from '../context/ThemeContext';
export default function Header(){

    const {theme, toggleTheme} = useTheme();

    return(
        <header className="bg-[var(--secondary)] w-full h-[50px] flex flex-row items-center justify-between px-4 py-4 text-black rounded-tl-lg">
            
        <h3 className='text-1xl w-fit text-[var(--primary)] font-bold'>Hi There!</h3>

        <nav className='flex flex-row items-center '>
            <button onClick={toggleTheme}
            className='bg-[var(--primary)] text-white px-2 py-1 rounded-lg hover:bg-pink-600 mr-4'>
                {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <ul className='flex flex-row gap-4'>
                <li>
                <NavLink 
                    to='/'
                    className={({ isActive }) => isActive ? "font-bold text-[var(--primary)]" : ""}
                >
                    Home
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to='/about'
                    className={({ isActive }) => isActive ? "font-bold text-[var(--primary)]" : ""}
                >
                    About
                </NavLink>
                </li>
            </ul>
        </nav>


        </header>
    );
}