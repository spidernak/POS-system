import Homepage from './view/Homepage'
import SideButton from './component/sideButton'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='ab'>
     <div className='flex-grow'>
      <Outlet/>
     </div>
    </div>
  )
}

export default App
