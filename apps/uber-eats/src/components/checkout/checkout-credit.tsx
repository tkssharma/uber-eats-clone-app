import { Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { ExternalApis } from '../../api';
import { resolve } from 'path';
import { UserAddressSelector, selectedUserAddressSelector } from '../../redux/user/user.slice';


export default function CheckoutCredit({ cart, address }: any) {
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { data: addresses } = useSelector(UserAddressSelector);
  const selectedAddress = useSelector(selectedUserAddressSelector);

  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    const order = await ExternalApis.createOrder({ ...cart, address_id: selectedAddress.id, address: selectedAddress });
    // create payment is same as creating payment intent
    const payment = ExternalApis.createPayment({
      cart: { ...cart, order_id: order.id, address_id: selectedAddress.id, address: selectedAddress },
    }).then((paymentRes) => {
      return new Promise((resolve, reject) => {
        stripe
          .createPaymentMethod({
            type: 'card',
            card: cardElement!,
          })
          .then((paymentMethod: any) => {
            const data = {
              clientSecret: paymentRes.client_secret,
              paymentMethodId: paymentMethod.paymentMethod?.id,
            };
            resolve(data);
          })
          .catch((err) => reject(err));
      }).then((response: any) => {
        return stripe
          ?.confirmCardPayment(response.clientSecret, {
            payment_method: response.paymentMethodId,
          })
          .then(async (res) => {

            // alert("payment successful");
            await ExternalApis.confirmOrder(order.id);
            await ExternalApis.confirmPayment(paymentRes.id);
            navigate('/eats/track')
            // success
            // update payment status to success
            // update order status to complete
          })
          .catch(async (err) => {
            alert("payment failed..");
            await ExternalApis.cancelOrder(order.id);
            await ExternalApis.cancelPayment(paymentRes.id);
            // update payment status to failed
            // update order as in progress with failed payment
          });
      });
    });
    // create order
  };

  return (
    <>
      <div className="text-xl font-semibold">
        <h1>Add new card</h1> <br />{' '}
      </div>
      <div className="grid grid-cols-5 content-center gap-1">
        <div>
          <p className="text-xs " style={{ paddingTop: '15px' }}>
            WE ACCEPT
          </p>
        </div>
        <div>
          <img
            src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-png-transparent-svg-vector-bie-supply-0.png"
            width="50px"
            height="50px"
            alt=" "
          />
        </div>
        <div>
          <img
            src="https://www.freepnglogos.com/uploads/visa-inc-png-18.png"
            height="50px"
            width="50px"
            style={{ paddingTop: '15px' }}
            alt=""
          />
        </div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png"
            height="50px"
            style={{ paddingTop: '12px' }}
            width="50px"
            alt=""
          />
        </div>
      </div>
      <hr style={{ border: '1px solid black' }} /> <br />
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <CardElement />
          <Button
            type="submit"
            fontSize={'14px'}
            colorScheme={'#fc8019'}
            fontWeight={'bold'}
            color={'white'}
            margin={'10px'}
            borderRadius={'0px'}
            w={'100%'}
            disabled={!elements}
            bg={'#fc8019'}
            padding={'15px'}
          >
            Pay
          </Button>
        </form>
      </div>
    </>
  );
}
