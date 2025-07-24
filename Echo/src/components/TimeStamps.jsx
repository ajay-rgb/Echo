
import TimeCard from "./TimeCard";
export default function TimeStamps({savedStamp, onDelete}){


    return(
        <div className="bg-blue500">
            
            <div 
            className="bg-[#c6353e] flex flex-col items-center justify-end h-[300px] w-[500px] border-2 border-black rounded-[20px] p-4">
                {
                    savedStamp.map((time, index)=>{
                        return(
                            <TimeCard
                            key={index}
                            time={time}
                            onDelete={()=>onDelete(index)}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}