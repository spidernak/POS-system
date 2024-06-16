import SideButton from '../component/Homepage/sideButton';
import Bar from '../component/Dashboard/revenueBar';
import Barchart  from '../component/Dashboard/Barchart';
import '../DashB.css';
import Best from '../component/Dashboard/BestSelling';
import Recent from '../component/Dashboard/RecentAdd';
const Dashboard = () => {
    return (
<div style={{display:'flex',backgroundColor:'#F8F8F8',}}>
    <SideButton></SideButton>
    <div style={{paddingLeft:'64px',paddingTop:'34px'}}>
    <Bar></Bar>
    <div style={{padding:'20px'}}></div>
    <div className='dash-container'>    
        <div className='dash-board'>
        <div style={{width:'905px',height:'91px', paddingLeft:'20px'}}> 
            <p1 className='dash-name'>Monthly's Revenue</p1>

        </div>
        <Barchart></Barchart>
        </div>
    </div>
    <div style={{padding:'15px'}}></div>
<div style={{display:'flex'}}> 
    <Best></Best>
    <div style={{padding:'10px' }}></div>
    <Recent></Recent>
</div>
 
 
    </div>
</div>

    );
}

export default Dashboard;