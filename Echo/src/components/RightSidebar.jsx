import Calendar from './Calendar';
import Notes from './Notes';

export default function RightSidebar(){

    return(
        <div
        className="bg-[#f8f8fc] w-5/12 h-full flex flex-col gap-4 p-2 rounded-tr-lg rounded-br-lg">
            {/* Wrap the Calendar in a div and set its height to 50% */}
            <div className="h-1/2">
                <Calendar/>
            </div>
            <div className="min-h-0 min-w-0 w-full flex-grow flex flex-col h-full w-[100%] scrollbar-hide">
                <Notes/>
            </div>
        </div>
    );
}