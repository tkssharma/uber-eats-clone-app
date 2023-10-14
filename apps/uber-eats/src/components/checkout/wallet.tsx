import React from 'react'

function Wallet() {
  return (
    <div className='  w-80 '>
        <div className='gap-10 h-48 p-10 border border-zinc-400 '>
            <img style={{width:'70px',height:'30px'}} src="https://zeevector.com/wp-content/uploads/Amazon-Pay-Logo-Colour.png"  /><br/>
            <h1>Amazon Pay</h1><br/>
            <button style={{color:"white",backgroundColor:'RGB(96, 178, 70)',width:'100px',height:'35px'}}>PAY</button>
        </div><br />
        
        <div className='gap-10 h-48 p-10 border border-zinc-400 '>
            <img style={{width:'70px',height:'30px'}} src="https://seeklogo.com/images/P/paytm-logo-EC097E9287-seeklogo.com.png" alt="Paytm" /><br/>
            <h1>Paytm</h1><br/>
            <button style={{color:"red"}}>Link Account</button>
        </div><br />
        <div className='gap-10 h-48 p-10 border border-zinc-400 '>
            <img style={{width:'70px',height:'30px'}} src="	https://seeklogo.com/images/P/phonepe-logo-C4BD70AF79-seeklogo.com.png" alt="PhonePe" /><br/>
            <h1>PhonePe</h1><br/>
            <button style={{color:"red"}}>Link Account</button>
        </div><br />
        <div className='gap-10 h-48 p-10 border border-zinc-400 '>
            <img style={{width:'80px',height:'30px'}} src="	https://zeevector.com/wp-content/uploads/2021/02/Mobikwik-Logo-PNG-768x166.png" alt="Mobikwik" /><br/>
            <h1>MobiKwik</h1><br/>
            <button style={{color:"red" }}>Link Account</button>
        </div>
    </div>
  )
}

export default Wallet