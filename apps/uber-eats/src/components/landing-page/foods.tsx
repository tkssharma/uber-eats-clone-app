import { data} from "../../data/data";

import React, { useEffect, useState } from "react";

const initialState: any = [];
function Foods() {

  const [foods,setFoods]=useState(initialState)
  
  useEffect(()=>{ 
    setFoods(data)
  },[])

  //filter by category 
  const filterType = (category: any)=>{
    setFoods(
      data.filter((item: any)=>{
        return item.category === category
      })
    )
  }

  const filterPrice = (price: any)=>{
    setFoods(
      data.filter((item)=>{
        return item.price === price
      })
    )
  }


 
  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>Top Rated Menu</h1>
      {/* filter row */}
      <div className='flex flex-col lg:flex-row justify-between'>
        {/* filter type */}
        <div>
          <p className='font-bold text-gray-700'>Filter Type</p>
          <div className='flex justify-between flex-wrap'>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>setFoods(data)}>All</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterType('burger')}>Burgers</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterType('pizza')}>pizza</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterType('salad')}>salad</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterType('chicken')}>Chicken</button>
          </div>
        </div>
        {/* filter price */}
        <div>
          <p className='font-bold text-gray-700'>filter price</p>
          <div className= 'flex justify-between max-w-[390px] w-full' >
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterPrice('$')}>$</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterPrice('$$')}>$$</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterPrice('$$$')}>$$$</button>
            <button className='m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600' onClick={()=>filterPrice('$$$$')}>$$$$</button>
          </div>
        </div>
      </div>

      {/* display foods */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 '>
        {foods.map((item: any)=>(
           <div className='border shadow-lg hover:scale-105 duration-300 rounded-lg' key={item.id}> 
           <img src={item.image} alt={item.name}
             className='w-full h-[200px] object-cover rounded-lg'/>
           <div className='flex justify-between px-2 py-4' >
            <p className="font-bold">{item.name}</p>
            <p>
              <span className='bg-orange-500 text-white p-1 rounded-full'> {item.price}</span>
            </p>
            </div>
           </div>
           
        ))}
      </div>
    </div>
  );
}

export default Foods;
