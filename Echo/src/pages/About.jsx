
import Header from '../components/Header';

export default function About() {
    

    return(
        <div className='bg-blue-500 h-screen w-screen flex flex-col items-center justify-center text-white p-4'>
            <Header />
            <h1 className='text-3xl font-bold text-white'>About Page</h1>
            <p className='mt-4'>This is the about page of our application.</p>
        </div>
    );
}