// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Payment.css";

// const stripePromise = loadStripe(
//   "pk_test_51R3VesIW9dYCKtEBM5jSJbRTQtS0QNW39oxriypsZid5ylfygobTO3bi7fLPJI6v1I6uPItjhowowZzrCuE6kWMk00pHZHOcVb"
// );

// const CheckoutForm = ({ totalAmount, items }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.error("Payment error:", error);
//       alert("Payment failed. Please try again.");
//     } else {
//       console.log("Payment successful!", paymentMethod);
//       console.log("Items in payment:", items);

//       try {
//         await axios.post("http://localhost:8080/api/payment", {
//           amount: totalAmount * 100,
//           paymentMethodId: paymentMethod.id,
//           items: items,
//         });

//         alert("Payment successful!");
//         navigate("/order-success", { state: { items } });
//       } catch (backendError) {
//         console.error("Backend Payment Error:", backendError);
//         alert("Payment processing failed.");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <div className="card-element-wrapper">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 color: "#000",
//                 fontSize: "16px",
//                 "::placeholder": { color: "#999" },
//               },
//               invalid: { color: "#ff4d4d" },
//             },
//           }}
//           className="stripe-card-element"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || totalAmount <= 0}
//         className="submit-payment-btn"
//       >
//         Pay ₹{(totalAmount || 0).toFixed(2)}
//       </button>
//     </form>
//   );
// };

// const PaymentButton = ({ totalAmount, items }) => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm totalAmount={totalAmount} items={items} />
//   </Elements>
// );

// export default PaymentButton;
