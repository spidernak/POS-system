import '../../index.css';
import '../../DashB.css';
const Best = () => {


    return(
    <div className='Board-best-selling'> 
    <h1 className='best-selling-text'>Best Selling</h1> 
    <div style={{padding:'12px'}}></div>  
        <div className='Best-product'>
            <span style={{fontSize:'16px',fontWeight:'700'}}>1. lord burger</span>
            <div style={{padding:'40px'}}></div>
            <div className='pic'></div>
            <div style={{padding:'40px'}}></div>
            <p>Total sale:<span style={{fontSize:'16px',fontWeight:'700'}}>10 solds</span></p>
        </div>
    </div>    
    );

};
export default Best;

