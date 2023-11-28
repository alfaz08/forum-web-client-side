import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';


const CheckoutForm = () => {
  const [error,setError] =useState('')
  const [clientSecret,setClientSecret] =useState('')
  const [transactionId,setTransactionId]=useState('')
  const stripe =useStripe()
  const {user} =useAuth()
  const axiosSecure =useAxiosSecure()
  const totalPrice = 1000

  useEffect(()=>{
    axiosSecure.post('/create-payment-intent',{price: totalPrice})
    .then(res=>{
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure,totalPrice])


  const elements = useElements()
  const handleSubmit =async (event)=>{
    event.preventDefault()
    if(!stripe || !elements){
      return
    }
    const card = elements.getElement(CardElement)
    if(card===null){
      return
    }
  
    const {error,paymentMethod} =await stripe.createPaymentMethod({
      type:'card',
      card
    })
    if(error){
      console.log('payment error',error);
      setError(error.message)
    }
    else{
      console.log('payment method',paymentMethod);
      setError('')
    }

   //confirm payment
  const {paymentIntent,error: confirmError} =await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
      card:card,
      billing_details:{
        email: user?.email || 'anonymous',
        name: user?.displayName ||'anonymous'
      }
    }
  })
  if(confirmError){
    console.log('confirm error',confirmError);
  }
  else{
    console.log('payment intent',paymentIntent);
    if(paymentIntent.status === 'succeeded'){
      setTransactionId(paymentIntent.id)
      Swal.fire({
        position:"top-end",
        icon:"success",
        title:`${transactionId} Payment is successful`,
        showConfirmButton:false,
        timer:1500
      })
    }
  }


  }



  return (
    <form onSubmit={handleSubmit}>
        <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-warning btn-sm my-8 hover:text-white hover:bg-black"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
       <h2 className='px-4'> Pay</h2>
      </button>
      <p className='text-red-600'>{error}</p>
      {
        transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>
      }
    </form>
  );
};

export default CheckoutForm;