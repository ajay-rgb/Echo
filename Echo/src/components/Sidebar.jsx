

import { useTheme } from "../context/ThemeContext";



export default function Sidebar(){
    const {theme} = useTheme();
    const mainBgClass = theme === 'dark'? 'bg-gray-900 text-white' : 'bg-[var(--primary)] text-white';
    return(
        <div
        className={`${mainBgClass} w-3/12 h-full p-4 flex flex-col items-center`} >
            <h1 className='text-3xl font-bold text-white mb-4'>Echo</h1>
            <div>

            </div>
        </div>
    );
}