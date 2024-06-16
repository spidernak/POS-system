import '../../index.css';
import '../../DashB.css';

const Recent = () => {
    return (
        <div className='Board-recent-add'> 
    <h1 className='best-selling-text'>Recently add</h1> 
    <div style={{padding:'12px'}}></div>  
        <div className='recent-product'>
            <span style={{fontSize:'16px',fontWeight:'700'}}>1. lord burger</span>
            <div style={{padding:'20px'}}></div>
            <div className='pic'></div>
            <div style={{padding:'20px'}}></div>
            <p>Total sale:<span style={{fontSize:'16px',fontWeight:'700'}}>10 solds</span></p>
        </div>
    </div>  
    );
};

export default Recent;