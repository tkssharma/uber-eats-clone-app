import React, { useContext, useEffect } from 'react';
import MapboxMap from './map';
import delivery_bike_icon from '../../assets/banner/2.png';
import banner_image_spags from '../../assets/banner/1.jpeg';
import { SearchIcon } from '@heroicons/react/outline';
import { UserContext, UserContextType } from '../../hooks/user-context';
import { TopSection } from '../checkout/homeComp';
import { OrderItemsSelector, fetchOrderItems } from '../../redux/order/order.slice';
import { useDispatch, useSelector } from 'react-redux';

const TrackOrderPage = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderItems());
  }, []);
  const { data: orderData } = useSelector(OrderItemsSelector);
  console.log(orderData);

  return (
    <>
      {<TopSection />}
      <div className="flex mx-auto bg-slate-100 ">
        <div className=" w-[20%] bg-white p-8">
          {user && (
            <>
              <br />
              <div className="m-5 h-90 bg-white rounded-[20px]">
              <h2 className=" text-2xl pb-8 font-medium">Order Details</h2>

                <div className="hidden md:block">
                <h2 className="text-2xl font-medium">Restaurant Details</h2>

                  <img
                    className="text-sm mb-4 w-full rounded-md"
                    src="https://www.thecookierookie.com/wp-content/uploads/2023/04/stovetop-burgers-recipe-2-768x960.jpg"
                  />
                  <h1 className="text-lg leading-5 font-bold first-letter:capitalize">{orderData?.restaurant?.name}</h1>
                  <h6 className="text-sm mb-4">{orderData?.restaurant?.description}</h6>
                </div>
                <h2 className="text-2xl font-medium">Address Details</h2>

                <div className="hidden md:block">
                 
                  <h1 className="text-lg leading-5 font-bold first-letter:capitalize">{orderData?.address?.city}</h1>
                  <h6 className="text-sm mb-4">{orderData?.address?.state}</h6>
                  <h6 className="text-sm mb-4">{orderData?.address?.name}</h6>

                </div>
              </div>
            </>
          )}
        </div>
        <div className=" w-[80%] bg-white p-8">
          <MapboxMap lat={Number(orderData.restaurant?.latitude)}  lon={Number(orderData.restaurant?.longitude)} ></MapboxMap>
        </div>
      </div>
    </>
  );
};

export default TrackOrderPage;
