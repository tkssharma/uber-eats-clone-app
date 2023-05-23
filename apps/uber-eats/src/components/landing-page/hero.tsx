import React from "react";

function Hero() {
  return (
    <div className ='mx-w-[1640px] mx-auto' >
      <div className= 'max-h-[500px] relative'>
        {/* overlay */}
        <div className='absolute w-full h-full text-gray-200
         max-h-[500px] bg-black/40 flex flex-col 
         justify-center'>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left'>The <span className='text-orange-500'> BEST</span></h1>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left'> <span className='text-orange-500'>Food</span> Delivered</h1>
        </div>
        <img className= 'w-full max-h-[500px] object-cover'
          src="https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
