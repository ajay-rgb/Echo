
import {Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Community from './pages/Community'
import Login from './pages/Login'
import {useTheme} from './context/ThemeContext';

function Layout(){

    const {theme} = useTheme();
    const mainBgClass = theme === 'dark'? 'bg-gray-900 text-white' : 'bg-[var(--primary)] text-white';

    return(
        <div 
        className={`${mainBgClass} h-screen w-screen p-2  `}>

   

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/community' element={<Community/>}/>
            </Routes>

            {/* <div className='bg-[#EAE4DA] w-11/12 h-11/12 rounded-[50px] p-6 border-2 border-black flex justify-center'>
                <Home/>
            </div> */}
            
        </div>
    );
}

export default Layout;