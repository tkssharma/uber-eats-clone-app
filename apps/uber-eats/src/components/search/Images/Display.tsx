import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Display({ restaurant }: any) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

  const handleNavigate = () => {
     navigate(`/restaurants/${restaurant.id}`)
  }
	return !restaurant ? null : (
		<div
			key={restaurant.id}
			className='h-56 m-5 bg-white rounded-[20px] p-8'>
			{/* <Link to={`/restaurants/${dish.restaurant[0]}`}> */}
			<div
				onClick={handleNavigate}
				className='hidden md:block'>
				<h1 className='text-lg leading-5 font-bold first-letter:capitalize'>
					{restaurant.name}
				</h1>
				<p className='text-sm mb-4'>{restaurant.description}</p>
        <img className='text-sm mb-4 rounded-md' src={restaurant.thumbnails[0]} />
			</div>

			{/* </Link> */}
		</div>
	);
}

export default Display;
