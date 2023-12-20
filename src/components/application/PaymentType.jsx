import React from 'react';

const PaymentType = ({paymentType}) => {
  return (
    <div style={{marginBottom:'10px', padding:'7px 30px 7px'}} >
      <p style={{fontSize:'1rem', fontWeight:'600'}} >Оплата: {paymentType}</p>
    </div>
  );
};

export default PaymentType;