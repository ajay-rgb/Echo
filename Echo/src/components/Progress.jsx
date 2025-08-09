
import Heatmap from './Heatmap'

export default function Progress() {
  return (
    <div className=' w-full h-full rounded-lg   p-2  transition-transform hover:scale-101'>
      
      <div className=''>
      <Heatmap />
      </div>
   
    </div>
  );
}