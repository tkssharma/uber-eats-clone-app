/*eslint no-constant-condition: 0*/

import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import delivery_bike_icon from '../../assets/banner/2.png';
import banner_image_spags from '../../assets/banner/1.jpeg';
import { loadStripe } from '@stripe/stripe-js';
import { SearchIcon } from '@heroicons/react/outline';
import { UserContext, UserContextType } from '../../hooks/user-context';
import {
  UserAddressSelector,
  createAddress,
  fetchAddress,
  selectAddress,
  selectedUserAddressSelector,
} from '../../redux/user/user.slice';
import { CartItemsSelector, fetchCartItems } from '../../redux/cart/cart.slice';
import { AddressModel } from './addressModel';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutCredit from './checkout-credit';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY!);

export function TopSection() {
  return (
    <div className="max-w-[1400px]">
      <div className="justify-between flex-row flex mr-10">
        <p className="text-2xl mt-4 font-bold">Food is on the way ..</p>

        <div
          className="bg-white h-10 items-center justify-center 
        flex shadow-2xl align-baseline rounded-l-3xl rounded-r-3xl"
        >
          <input
            className=" appearance-none w-full ml-5 mr-8 bg-transparent h-full
     text-gray-700 leading outline-none"
            id="username"
            type="text"
            placeholder="Search food by name"
          />

          <SearchIcon className="h-8 w-8 text-gray-500 px-1 mr-5" />
        </div>
      </div>

      <div className="bg-gray-100 rounded-2xl mt-5 ml-0 mr-10 shadow-xl">
        <div className="flex flex-row justify-between mt-3">
          <img src={delivery_bike_icon} alt={delivery_bike_icon} className="w-48 h-44 rounded-l-2xl" />

          <div className="items-center justify-center flex flex-col">
            <p className="text-md font-bold">Hello Jeremy</p>

            <p className="text-center mt-2">
              <label className="text-gray-500">Get free delivery evey</label>
              <label className="text-orange-400 font-bold"> $20</label>
              <label className="text-gray-500"> purchase</label>
            </p>

            <button
              className="text-white h-10 flex  mt-3
             bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 
             rounded-3xl items-center justify-center text-center"
            >
              <label className="ml-10 mr-10">Learn More</label>
            </button>
          </div>

          <img src={banner_image_spags} alt={banner_image_spags} className="w-36 h-44 rounded-r-2xl" />
        </div>
      </div>
    </div>
  );
}

function Checkout() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(UserContext) as UserContextType;
  const { data: addresses } = useSelector(UserAddressSelector);
  const selectedAddress = useSelector(selectedUserAddressSelector);
  const { data: menuItem } = useSelector(CartItemsSelector);

  const [formData, setFormData] = useState({
    city: 'delhi',
    state: 'delhi',
    lat: '12',
    long: '11',
    country: 'INDIA',
    pincode: '6789876',
    street: 'street',
    name: '45/11 Vira Path Gurgaon',
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  const selectUserAddress = (address: any) => {
    dispatch(selectAddress(address));
  };

  const handleSubmit = () => {
    dispatch(createAddress(formData));
  };

  useEffect(() => {
    dispatch(fetchAddress());
    dispatch(fetchCartItems());
  }, [user]);

  return (
    <>
      {<TopSection />}
      <div className=" flex mx-auto bg-slate-100 ">
        <div className="w-full lg:w-[74%]  flex flex-col gap-12 items-center pt-20 ">
          {user ? (
            <div className="h-52 border w-[80%] bg-white p-8">
              <h1 className="text-xl font-semibold">Logged in</h1>
              <br />
              <div className="flex gap-6 text-lg  font-medium ">
                <h2>{user.email}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className=" w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="h-52 border w-[80%] bg-white p-8">
              <h1 className="text-2xl font-bold">Account</h1>
              <p className="text-sm text-slate-400">To place you order now, Login to your account or Signup</p>
              <div className="flex gap-4 mt-8">
                <button className="p-2 px-4 border bg-white text-xs font-medium">
                  Have an account <br />
                  <b> Login</b>
                </button>
                <button className="p-2 px-4 border bg-green-400 text-xs font-medium">
                  New to Swiggy? <br /> <b>Signup</b>
                </button>
              </div>
            </div>
          )}

          <div className=" w-[80%] bg-white p-8">
            <h1 className="text-xl font-semibold">Select delivery address</h1>
            {user && (
              <>
                <p className="text-base font-medium">You have a saved address in this location</p>
                <br />
                <div className=" flex  w-full  p-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>{' '}
                  <div className="grid grid-cols-4 gap-3">
                    {addresses &&
                      addresses.length > 0 &&
                      addresses.map((i: any) => {
                        return (
                          <div className={selectedAddress?.id === i.id ? 'border-2 bg-green-300' : ''}>
                            <div className="w-[100%] flex justify-center flex-col p-2">
                              <h1 className="text-xl font-semibold">{i.name}</h1>
                              <h4 className="text-base font-small">
                                {' '}
                                {i.street}
                                {i.city} {i.state} {i.pincode} {i.country}
                              </h4>
                              <button
                                onClick={() => selectUserAddress(i)}
                                className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              >
                                DELIVER HERE
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>{' '}
                  &nbsp; &nbsp;
                  <div className=" w-[50%]">
                    <h1 className=" text-xl font-semibold "> Add New Address</h1>
                    <p className="py-5 text-base font-medium "> Click on Add new to add new Address</p>
                    <button
                      onClick={() => setShowModal(!showModal)}
                      className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Add New Address
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className=" border w-[80%] bg-white p-5">
            <h1 className="text-xl font-semibold">Choose payment method</h1>
            {user && (
              <div className="flex ">
                <div className="mt-5  w-[40%] bg-slate-200 p-8  text-start font-bold  ">
                  <button
                    className={`h-12 text-left w-52 pl-2 hover:bg-white 
                      }`}
                  >
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                          />
                        </svg>
                      </div>
                      <div>&nbsp;Wallets</div>
                    </div>
                  </button>
                  <br />
                  <br />
                  <button className={`h-12 pl-2 text-left w-52 hover:bg-white `}>
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>&nbsp; UPI</div>
                    </div>
                  </button>
                  <br />
                  <br />
                  {/* <button  className='h-12 w-32 hover:bg-white '> Sodexo</button><br /><br /> */}
                  <button className={`h-12 pl-2 text-left w-52 hover:bg-white`}>
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                          />
                        </svg>
                      </div>
                      <div>&nbsp; NetBanking</div>
                    </div>
                  </button>
                  <br />
                  <br />

                  <button className={`h-12 pl-2 text-left w-52 bg:white hover:bg-white `}>
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                      </div>
                      <div>&nbsp; Credit $ Debit Cards</div>
                    </div>
                  </button>
                  <br />
                  <br />
                  <button className={`h-12 pl-2 text-left w-52 hover:bg-white`}>
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div>&nbsp; Pay on Delivery</div>
                    </div>{' '}
                  </button>
                  <br />
                  <br />
                </div>
                <div className="  w-[60%]  p-8">
                  <Elements stripe={stripePromise}>
                    <CheckoutCredit address={selectedAddress} cart={menuItem} />
                  </Elements>
                </div>
              </div>
            )}
          </div>
        </div>

        <br />
      </div>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-1xl font-semibold">Add Address</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative w-full max-w-md max-h-ful p-6 flex-auto">
                <form onSubmit={() => handleSubmit} className="space-y-6 w-full" action="#">
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="city"
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="city"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="state"
                      id="state"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="state"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="3020"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="address lines"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="street"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Add Address
                  </button>
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
