
import Home from './pages/Home'

function Layout(){
    return(
        <div 
            className='bg-[#c6353e] h-screen w-full flex items-center justify-center'
        >
            <div className='bg-[#EAE4DA] w-11/12 h-11/12 rounded-[50px] p-6 border-2 border-black flex justify-center'>
                <Home/>    
            </div>
            
        </div>
    );
}

export default Layout;