import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../../../components/Spinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const { campId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: camp = {}, isLoading } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camp/${campId}`);
      return res.data;
    },
  });

  const amount = camp.fees;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setPaymentError(error.message);
    } else {
      setPaymentError(null);
      console.log(paymentMethod);

      // create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        campId,
      });

      const clientSecret = res.data.clientSecret;

      // proceed to confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          console.log(result);

          // mark camp as paid and also create payment history
          const paymentData = {
            campId,
            email: user.email,
            amount,
            paymentMethod: result.paymentIntent.payment_method_types,
            transactionId: result.paymentIntent.id,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);

          if (paymentRes.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        }
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Enter Payment Info
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="border border-gray-300 p-4 rounded-md bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>

        {paymentError && <p className="text-red-500 text-sm">{paymentError}</p>}

        <button
          type="submit"
          disabled={!stripe}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white cursor-pointer ${
            stripe
              ? "bg-indigo-600 hover:bg-indigo-700 transition"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Pay Now ${amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
