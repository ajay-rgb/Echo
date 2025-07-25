
import Calendar from './Calendar';
import Notes from './Notes';

export default function RightSidebar(){

    return(
        <div
        className="bg-[#f8f8fc] w-2/4 h-full flex flex-col gap-4 p-4 rounded-tr-lg rounded-br-lg">
            <Calendar/>
            <Notes/>
        </div>
    );
}