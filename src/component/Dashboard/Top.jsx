const Top = ()=>{
    return (
        <div className="w-full flex gap-5">
            <div className="flex justify-between bg-white shadow-testShadow  border rounded px-5 w-full items-center">
                <div className=" font-inria-sans flex flex-col gap-4 pt-2">
                    <h1 className="text-3xl">Revenue</h1>
                    <span className="text-green-500 text-2xl">$2</span>
                </div>
                <img className = "w-[60px] h-[60px]" src='https://cdn-icons-png.freepik.com/256/4336/4336125.png?semt=ais_hybrid' alt="blank"/>
            </div>
            <div className="flex justify-between bg-white shadow-testShadow  border rounded px-5 w-full items-center">
                <div className=" font-inria-sans flex flex-col gap-4 pt-2">
                    <h1 className="text-3xl">Cost</h1>
                    <span className="text-green-500 text-2xl">$2</span>
                </div>
                <img className = "w-[60px] h-[60px]" src='https://cdn-icons-png.flaticon.com/512/9757/9757480.png' alt="blank"/>
            </div>
            <div className="flex justify-between bg-white shadow-testShadow  border rounded px-5 w-full items-center">
                <div className=" font-inria-sans flex flex-col gap-4 pt-2">
                    <h1 className="text-3xl">Profit</h1>
                    <span className="text-green-500 text-2xl">$2</span>
                </div>
                <img className = "w-[60px] h-[60px]" src='https://cdn-icons-png.freepik.com/256/7314/7314637.png?semt=ais_hybrid' alt="blank"/>
            </div>
            
            
            
        </div>
    );
}; export default Top;