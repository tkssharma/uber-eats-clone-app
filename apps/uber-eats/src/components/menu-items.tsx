import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';
import data from '../mock';

function MainMenu() {

  const [type, setType] = useState('Breakfast');
  const [foodItem, setFoodItems] = useState([...data]);

  useEffect(() => {

    setFoodItems(() => {
      return data.filter(i => i.type === type);
    })

  }, [type])
  return (
    <>
      <section className="my-12 max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-6">
          <p onClick={() => setType('Breakfast')}
            className={` ${type === 'Breakfast' ? 'bg-primary  active_menu_tab poppins' : 'menu_tab poppins'}`}
          >Breakfast</p>
          <p onClick={() => setType('Lunch')} className={`${type === 'Lunch' ? 'bg-primary  active_menu_tab poppins' : 'menu_tab poppins'}`}>Lunch</p>
          <p onClick={() => setType('Dinner')} className={` ${type === 'Dinner' ? 'bg-primary active_menu_tab poppins' : 'menu_tab poppins'}`}>Dinner</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
          {foodItem && foodItem.map((i, index) => {
            return (
              <div key={index} className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
                <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4">{i.type}</span>
                <img className="w-64 mx-auto transform transition duration-300 hover:scale-105" src={i.image} alt="" />
                <div className="flex flex-col items-center my-3 space-y-2">
                  <h1 className="text-gray-900 poppins text-lg">{i.title}</h1>
                  <h2 className="text-gray-900 poppins text-2xl font-bold">$ {i.price}</h2>
                  <button className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105">Order Now</button>
                </div>
              </div>
            )
          })}

        </div>
      </section>

    </>
  )
}

export default MainMenu;
