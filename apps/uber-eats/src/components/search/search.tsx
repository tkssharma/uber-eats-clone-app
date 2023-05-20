import biryaniImg from "./Images/biriyani1-img.png";
import burger from "./Images/burgur-img.png";
import cakeDessert from "./Images/cakeDessert-img.png";
import iceCream from "./Images/iceCream-img.png";
import north from "./Images/northIndian-img.png";
import south from "./Images/southIndian-img.png";
import pizza from "./Images/pizza-img.png";
import roll from "./Images/rolls-img.png";
import Display from "./Images/Display";
import { Ref, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../landing-page/navbar";

const filtersApplied: any = {};
const Search = () => {
	const [dishSearch, setDishSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [filters, setFilters] = useState(filtersApplied);
	const [dishesData, setDishesData] = useState([]);
	const debounceRef: any = useRef(null);
	const [sort, setSort] = useState("");
	const [isSortBox, setIsSortBox] = useState(false);

	function handleVoiceSearch() {
	}

	function handleDishSearch(e:any) {
		setDishSearch(e.target.value);
	}

	function handleFilterApply(filter: any) {
		let newFilters: any = {};
		const key = filter.split("=")[0];
		if (filters[key]) {
			// console.log("came inside");
			for (const k in filters) {
				if (k !== key) {
					newFilters[k] = filters[k];
				}
			}
		} else {
			newFilters = { ...filters, [key]: filter.split("=")[1] };
		}
		setFilters(newFilters);
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			(async () => {
				// dispatch(filterRestaurants(dishSearch))
			})();
		}, 700);
	}, [dishSearch, filters, sort]);

	return (
		<>
			<div className='min-h-screen'>
				<div className='max-w-[1000px] mt-14 m-auto'>
					<div className='flex items-center bg-white border'>
						<input
							onChange={handleDishSearch}
							value={dishSearch}
							className='p-5 text-lg  h-14 w-full border-0 outline-none'
							type='text '
							placeholder='Search for restaurants and food...'
						/>
						{
							<svg
								onClick={handleVoiceSearch}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-6 h-6 mr-4'>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
								/>
							</svg>
						}
					</div>

					<div className='text-lg font-bold p-5'>Popular Cuisines</div>
					<div className='grid grid-cols-8 text-center w-[90%] mx-auto'>
						<div>
							<img
								src={biryaniImg}
								alt='bir'
							/>
						</div>
						<div>
							<img
								src={pizza}
								alt='bir'
							/>
						</div>
						<div>
							<img
								src={burger}
								alt='burger'
							/>
						</div>
						<div>
							<img
								src={cakeDessert}
								alt='bir'
							/>
						</div>
						<div>
							<img
								src={north}
								alt='bir'
							/>
						</div>
						<div>
							<img
								src={south}
								alt='bir'
							/>
						</div>
						<div>
							<img
								src={roll}
								alt='bir'
							/>
						</div>
						<div>
							<img
								src={iceCream}
								alt='bir'
							/>
						</div>
					</div>
					<br />
					<div className='flex gap-4'>
						<button
							onMouseEnter={(e) => setIsSortBox(true)}
							onMouseLeave={(e) => setIsSortBox(false)}
							className={` ${
								filters[""] && "bg-black text-white"
							} px-4 text-sm rounded-md relative border p-1`}>
							Sort By
							{isSortBox && (
								<AnimatePresence>
									<motion.div
										initial={{ scaleY: 0 }}
										animate={{ scaleY: 1 }}
										className='absolute flex flex-col gap-4 w-[200%] -left-1/2 top-8 p-4 border bg-white shadow-lg'>
										<div className='flex gap-2 text-sm'>
											<input
												type='radio'
												name='sort'
												id='relevance'
												onClick={(e) => setSort("")}
											/>
											<label htmlFor='relevance'>Relevance</label>
										</div>
										<div className='flex gap-2 text-sm'>
											<input
												type='radio'
												name='sort'
												id='deliverTime'
												onClick={(e) => setSort("_sort=deliverTime&_order=asc")}
											/>
											<label htmlFor='deliverTime'>Delivery Time</label>
										</div>
										<div className='flex gap-2 text-sm'>
											<input
												type='radio'
												name='sort'
												id='pricelth'
												onClick={(e) => setSort("_sort=price&_order=asc")}
											/>
											<label htmlFor='pricelth'>Price Low to High</label>
										</div>
										<div className='flex gap-2 text-sm'>
											<input
												type='radio'
												name='sort'
												id='pricelth'
												onClick={(e) => setSort("_sort=price&_order=desc")}
											/>
											<label htmlFor='pricehtl'>Price High to Low</label>
										</div>
									</motion.div>
								</AnimatePresence>
							)}
						</button>
						<button
							onClick={(e) => handleFilterApply("veg=true")}
							className={` ${
								filters["veg"]
									? "bg-black text-white"
									: "bg-[#fafafa] text-[rgba(0,0,0,0.7)]"
							} px-4 text-sm rounded-md border p-1`}>
							Veg
						</button>
						<button
							onClick={(e) => handleFilterApply("price_lte=100")}
							className={` ${
								filters["price_lte"]
									? "bg-black text-white"
									: "bg-[#fafafa] text-[rgba(0,0,0,0.7)]"
							} px-4 text-sm rounded-md   border p-1`}>
							Less Than Rs 100
						</button>
						<button
							onClick={(e) => handleFilterApply("rating_gte=4")}
							className={` ${
								filters["rating_gte"]
									? "bg-black text-white"
									: "bg-[#fafafa] text-[rgba(0,0,0,0.7)]"
							} px-4 text-sm rounded-md border p-1`}>
							Rated 4+
						</button>
					</div>
					<br />
					<div className='w-full max-w-[950px] mx-auto '>
						{dishSearch.length > 0 && (
							<div className='grid grid-cols-3 md:grid-cols-3 '>
								{[].map((dish: any) => (
									<Display
										key={dish.id}
										restaurant={dish}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Search;