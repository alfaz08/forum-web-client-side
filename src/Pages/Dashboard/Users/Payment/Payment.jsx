import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


const Payment = () => {

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center">Pay Please</h2>
      <div>
        <Elements stripe={stripePromise}>
         <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;