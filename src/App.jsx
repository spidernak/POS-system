import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const increase =()=>{
    setCount(count+1) ;
  }

  return (
    <>
     <div className='flex bg-black'>
      <div>{count}</div>
      <button onClick={increase}>click here</button>
     </div>
    </>
  )
}

export default App
