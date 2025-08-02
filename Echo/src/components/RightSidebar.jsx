import Calendar from './Calendar';
import Notes from './Notes';

export default function RightSidebar() {
  return (
    <div className=" bg-[var(--dark-bg)] w-5/12 h-full flex flex-col gap-4 p-2 rounded-tr-lg rounded-br-lg">
      
      <div className="h-1/2 bg-[var(--dark-bg)]">
        <Calendar />
      </div>

      <div className="flex-grow min-h-0 ">
        <Notes />
      </div>
    </div>
  );
}