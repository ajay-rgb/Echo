
import {Link, NavLink} from 'react-router-dom';
import {useTheme} from '../context/ThemeContext';
export default function Header(){

    const {theme, toggleTheme} = useTheme();

    return(
        <header className="bg-[var(--color-1)] w-full h-[50px] flex flex-row items-center justify-between px-4 py-4 right-10 text-black ">
            
        <h3 className='text-1xl w-fit text-black font-bold'>ECHO</h3>

        <nav className='flex flex-row items-center '>
            {/* <button onClick={toggleTheme}
            className='bg-[var(--primary)] text-[12px] text-white px-2 py-1 rounded-md hover:bg-pink-600 mr-4'>
                {theme === 'light' ? 'Dark' : 'Light'}
            </button> */}
            
        </nav>


        </header>
    );
}