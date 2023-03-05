"use client";

import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";

const SubCategoryTable = () => {
  //Pagination

  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return <></>;
};

export default SubCategoryTable;
