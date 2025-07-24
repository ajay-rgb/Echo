

export default function TimeCard(props){
    

    return(
        <div 
        className="flex flex-row items-center justify-between h-2/12 w-full p-2 border-b-1 border-black bg-[#eae4da] rounded-[5px]">
            <h3 className='text-[#1d1d1b] font-bold'>{props.time}</h3>
            <button
            className="bg-[#c63f3e] w-3/12 h-full text-white px-4 py-2 rounded-[5px] hover:bg-[#b12d2c] flex items-center justify-center transition duration-300"
            onClick={props.onDelete}
            >Delete</button>
        </div>
    );
}