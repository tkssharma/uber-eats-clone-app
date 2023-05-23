"use client";

import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Modal = ({ modal, setModal }: any) => {
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  useEffect(() => {
    if (!modal) {
      setSelectedImage();
    }
  }, [modal]);
  //console.log('modal modal', modal)
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Category</p>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Name</label>
            <input
              className="border-2 border-purple-600/50 w-[75%] "
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Category</label>
            <select
              className="border-2 border-purple-600/50 w-[75%] "
              type="text"
            >
              <option value="">Choose any Category</option>
              <option value="">Option One</option>
              <option value="">Option Two</option>
              <option value="">Option Three</option>
            </select>
          </div>

          <div className="flex-row justify-between">
            <label className="font-semibold pr-2">Picture</label>
            <input
              className="border-2"
              type="file"
              accept="image/*"
              name="user[image]"
              multiple={true}
              onChange={imageChange}
            />
            <div className="flex overflow-auto my-2 p-2">
              {selectedImage &&
                [...selectedImage].map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    className="w-32 h-32 mr-1 rounded-sm border-4"
                  />
                ))}
            </div>

            {selectedImage && (
              <button
                onClick={removeSelectedImage}
                className="bg-orange-400 p-2 rounded-md text-white"
              >
                Remove This Image
              </button>
            )}
          </div>
          <div className="flex justify-between">
            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">
              Submit
            </button>
          </div>
        </div>
      </PureModal>
      ;
    </>
  );
};

export default Modal;
