import React from 'react'

function HeadlineCards() {
  return (
    <div className='max-w-[1640px] mx-auto ml-5 mr-5 py-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Card */}
        <div className='rounded-xl relative'>
            {/* overlay */}
            <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>Sun's out , BOGO's Out</p>
                <p className='px-2'>Through 8/26</p>
                <button className='bg-orange-500 text-white p-1 m-1 rounded-full flex justify-center center absolute bottom-4'>Order Now</button>
            </div>
            <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' 
            src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
        </div>

         {/* Card */}
         <div className='rounded-xl relative'>
            {/* overlay */}
            <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>Sun's out , BOGO's Out</p>
                <p className='px-2'>Through 8/26</p>
                <button className="bg-orange-500 text-white p-1 m-1 rounded-full flex justify-center center absolute bottom-4">Order Now</button>
            </div>
            <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' 
            src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
        </div>

         {/* Card */}
         <div className='rounded-xl relative'>
            {/* overlay */}
            <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
                <p className='font-bold text-2xl px-2 pt-4'>Sun's out , BOGO's Out</p>
                <p className='px-2'>Through 8/26</p>
                <button className= "bg-orange-500 text-white p-1 m-1 rounded-full flex justify-center center absolute bottom-4">Order Now</button>
            </div>
            <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' 
            src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
        </div>

         
         
        
    </div>
  )
}

export default HeadlineCards