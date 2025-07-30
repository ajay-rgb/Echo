
import Header from '../components/Header';
import RightSidebar from '../components/RightSidebar.jsx';
import Sidebar from '../components/Sidebar.jsx';


export default function About() {

  return (
    // This top-level container should fill its parent (the Layout)
    <div className='flex flex-row h-full w-full'>
      <Sidebar />
      
      {/* Main Content Column */}
      <div className='flex flex-col w-full h-full'>
        <Header />
        <div
        className='bg-[var(--secondary)] flex flex-col flex-grow p-4 gap-4 min-h-0 rounded-bl-lg'>

            <h1 className='text-black'>Welcome to Echo</h1>


        </div>
      </div>

      
      
      <RightSidebar />
    </div>
  );
}