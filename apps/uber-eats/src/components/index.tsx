import React from 'react'
import Hero from './Hero'
import Foods from './Foods'
import HeadlineCards from './HeadlineCards';
import Catogery from './Catogery';

function App() {
  return <>
   
    <div className="App ml-10 mr-10 mb-10 mr">
    <Hero/>
    <HeadlineCards/>
    <Foods/>
    <Catogery/>
    </div>
    </>
}

export default App;
