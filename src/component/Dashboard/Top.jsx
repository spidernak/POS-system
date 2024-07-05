import Revenue from '../../assets/costs.png'
import Costs from '../../assets/revenue.png'
import Profit from '../../assets/profit.png'
const 
Top = ()=>{
    return (
        <div className="w-full flex gap-5">
            <div className="flex justify-between items-center hover:scale-105 bg-white shadow-testShadow  border rounded px-5 w-full">
                <div className=" font-inria-sans flex flex-col gap-4 pt-2">
                    <h1 className="text-3xl">Revenue</h1>
                    <span className="text-green-500 text-2xl pb-3">$2000</span>
                </div>
                <img src={Revenue} alt="blank" className=" object-cover w-[70px] h-[70px]" />
            </div>
            <div className="flex justify-between items-center hover:scale-105 bg-white shadow-testShadow  border rounded px-5 w-full">
                <div className=" font-inria-sans flex flex-col gap-4 pt-2">
                    <h1 className="text-3xl">Costs</h1>
                    <span className="text-green-500 text-2xl pb-3">$2000</span>
                </div>
                <img src={Costs} alt="blank" className=" object-cover w-[70px] h-[70px]" />
            </div>
            <div className="flex justify-between items-center hover:scale-105 bg-white shadow-testShadow  border rounded px-5 w-full">
                <div className=" font-inria-sans flex flex-col gap-4 pt-2">
                    <h1 className="text-3xl">Profit</h1>
                    <span className="text-green-500 text-2xl pb-3">$4000</span>
                </div>
                <img src={Profit} alt="blank" className=" object-cover w-[70px] h-[70px]" />
            </div>
            
            
            
        </div>
    );
}; export default Top;