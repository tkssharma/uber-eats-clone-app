import React from 'react'
import Hero from './landing-page/hero'
import Foods from './landing-page/foods'
import HeadlineCards from './landing-page/headeline-cards';
import Catogery from './landing-page/category';

function App() {
  return <>
    <div className="mb-10">
      <Hero />
      <div className='App ml-10 mr-10 '>
        <HeadlineCards />
        <Foods />
        <Catogery />
      </div>
    </div>
  </>
}

export default App;
