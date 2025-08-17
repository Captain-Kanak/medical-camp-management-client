import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../../components/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

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

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentError(null);

      // create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        campId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          campId,
          campName: camp.campName,
          email: user.email,
          amount,
          paymentMethod: result.paymentIntent.payment_method_types,
          transactionId: result.paymentIntent.id,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          toast.success(`Transaction ID: ${result.paymentIntent.id}`);
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-indigo-100">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Secure Payment
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Complete your payment for{" "}
          <span className="font-semibold text-indigo-600">{camp.campName}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-inner">
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

          {paymentError && (
            <p className="text-red-500 text-sm text-center">{paymentError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white shadow-lg transform transition ${
              stripe
                ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Pay ${amount}
          </button>
        </form>

        {/* Secure Info */}
        <div className="mt-6 flex items-center justify-center text-gray-400 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2H9v-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13h14v6H5z"
            />
          </svg>
          100% Secure Payment with Stripe
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
