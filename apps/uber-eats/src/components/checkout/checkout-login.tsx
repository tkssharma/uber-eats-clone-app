import React from 'react';


const CheckoutLogin = () => {
  // const data = JSON.parse(localStorage.getItem('customerData'));
  return (
    <>
      {/* <Wrapper className='container'> */}
      <div className='row'>
        {/* <Logo className='col-1'>
                        <Avatar src='Icons/avatar.svg' alt='avatar' />
                    </Logo> */}
        <div className='col-11'>
          <div className='row row-cols-1'>
            <div className='col'>
              {/* <Title> */}
              Logged in
              <img
                src='CheckOut/Images/check-mark.png'
                alt='Check'
              />
              {/* </Title> */}
            </div>
            <div className='col'>
              {/* <Info> */}
              {' '}
              {/* {data.name}{' '} */}
              Name
              <img
                src='Icons/line.svg'
                alt='line'
                height='13px'
                style={{ verticalAlign: 'inherit' }}
              />{' '}
              {/* {data.phoneNumber} */}
              PhoneNumber
              {/* </Info> */}
            </div>
          </div>
        </div>
      </div>
      {/* </Wrapper> */}
    </>
  );
};

export default CheckoutLogin;