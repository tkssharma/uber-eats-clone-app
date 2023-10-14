import React from 'react'

function UPL() {
  return (
    <div>
         <div className='p-5 mt-10'>
        
        <h1 className='text-xl font-semibold'>Pay via New VPA</h1><br /><hr style={{border:'1px solid black'}}/><br />
        <p className='text-sm font-light'>You must have a Virtual Payment Address</p><br />
        <input type="text" style={{border:'1px solid black',padding:'20px',width:'300px' }} placeholder='Enter VPA' /><br /><br />
        <input type="checkbox"   />
  <label className='text-sm font-light'> Securely save this VPA for a faster checkout next time.</label><br /><br />
        <button style={{color:'white',backgroundColor:'green',borderRadius:'3px',padding:'8px'}}>VERIFY AND PAY</button>
    </div>
    </div>
  )
}

export default UPL