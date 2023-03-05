"use client"

import Table from 'rc-table';
import React, { useState } from 'react';
import Pagination from "react-js-pagination";


const CategoryTable = () => {

      
      const data = [
        { id:'01', name: 'Jack', subCount: 28, productCount: 'some where' },
        { id:'02', name: 'Rose', subCount: 36, productCount: 'some where' },
      ];

      //Pagination
      const [activePage, setActivePage] = useState(15)
      const handlePageChange = (pageNumber)=>{
        setActivePage(pageNumber)
      }

    return (
        <>
       
        </>
        
    );
};

export default CategoryTable;