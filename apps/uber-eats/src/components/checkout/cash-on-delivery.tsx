import React from "react";
// import { TextField, Grid, Button } from "@material-ui/core";

function CashOnDelivery() {
	return (
		<div className='p-10 mt-10 '>
			<img  style={{width:'70px',height:'50px'}}
				src='https://cdn-icons-png.flaticon.com/512/6491/6491623.png'
				alt='Cash'
			/>
			<br />
			<h1 className='text-xl font-semibold'>Cash/Pay on Delivery</h1>
			<br />
			<p className='text-sm font-light'>
				Pay cash at time of delivery. You can also pay online anytime after
				placing order.
			</p>
			<br />
			<button
				style={{
					color: "white",
					backgroundColor: "green",
					borderRadius: "3px",
					padding: "8px",
				}}>
				Pay On Delivery
			</button>
		</div>
	);
}

export default CashOnDelivery;
