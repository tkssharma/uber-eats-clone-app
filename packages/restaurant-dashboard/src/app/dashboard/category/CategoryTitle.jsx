"use client"

import React, { useState } from "react";
import Modal from "../../components/common/Modal";

const CategoryTitle = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">Category</h1>
        <h2 className="text-gray-600 ml-0.5">List, view and edit</h2>
      </div>
    </>
  );
};

export default CategoryTitle;
