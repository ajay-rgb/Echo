
import {Link, NavLink} from 'react-router-dom';
import {useTheme} from '../context/ThemeContext';
export default function Header(){

    const {theme, toggleTheme} = useTheme();

    return(
        <header className=" w-full h-[50px] flex flex-row items-center justify-between px-4 py-4 text-black rounded-tl-lg">
            
        <h3 className='text-1xl w-fit text-[#09bc8a] font-bold'></h3>

        <nav className='flex flex-row items-center '>
            {/* <button onClick={toggleTheme}
            className='bg-[var(--primary)] text-[12px] text-white px-2 py-1 rounded-md hover:bg-pink-600 mr-4'>
                {theme === 'light' ? 'Dark' : 'Light'}
            </button> */}
            
        </nav>


        </header>
    );
}