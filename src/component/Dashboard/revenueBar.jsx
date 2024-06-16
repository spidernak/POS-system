import '../../index.css';
import '../../DashB.css';
const Bar = () => {
    return(
    <div style={{display:'flex'}}>    
        <div className="box-border">
            <div className='Bar-text'>Revenue</div>
        <div className='Value'>1000$</div>
        </div>
        <div style={{padding:'20px'}}></div>
        <div className="box-border">
            <div className='Bar-text'>Revenue</div>
        <div className='Value'>1000$</div>
        </div>
        <div style={{padding:'20px'}}></div>
        <div className="box-border">
            <div className='Bar-text'>Revenue</div>
        <div className='Value'>1000$</div>
        </div>
    </div>    
    );

};
export default Bar;