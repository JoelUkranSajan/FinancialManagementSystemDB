"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Popup = ({
  type,
  closePopup,
  popupMessage = "",
  popupSuccess = false,
  cardData = null, // e.g. { mobileNumber, cardNumber, cardType, totalLimit, amountUsed, availableAmount }
  loanData = null, // e.g. { mobileNumber, loanNumber, loanType, totalLoan, amountPaid }
}) => {
  const router = useRouter();

  // Used for "register" or "sign-in" modes
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile_number: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Track whether we're currently submitting (to prevent multiple taps)
  const [isSubmitting, setIsSubmitting] = useState(false); // Declared outside conditionally rendered blocks

  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  //
  // 1) VIEW CARDS MODE
  //
  if (type === "view-cards" && cardData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Card Details
          </h2>
          <div className="text-black space-y-2">
            <p>
              <strong>Mobile Number:</strong> {cardData.mobileNumber}
            </p>
            <p>
              <strong>Card Number:</strong> {cardData.cardNumber}
            </p>
            <p>
              <strong>Card Type:</strong> {cardData.cardType}
            </p>
            <p>
              <strong>Total Limit:</strong> {cardData.totalLimit}
            </p>
            <p>
              <strong>Amount Used:</strong> {cardData.amountUsed}
            </p>
            <p>
              <strong>Available Amount:</strong> {cardData.availableAmount}
            </p>
          </div>
          <button
            onClick={closePopup}
            className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  //
  // 2) ADD CARD MODE
  //
  if (type === "add-card") {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
          <h2
            className={`text-3xl font-bold mb-6 text-center ${
              popupSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {popupSuccess ? "Success" : "Error"}
          </h2>
          <p className="mb-4 text-center text-black">{popupMessage}</p>
          <button
            onClick={closePopup}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  //
  // 3) VIEW LOAN MODE
  //
  if (type === "view-loan" && loanData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Loan Details
          </h2>
          <div className="text-black space-y-2">
            <p>
              <strong>Mobile Number:</strong> {loanData.mobileNumber}
            </p>
            <p>
              <strong>Loan Number:</strong> {loanData.loanNumber}
            </p>
            <p>
              <strong>Loan Type:</strong> {loanData.loanType}
            </p>
            <p>
              <strong>Loan Amount:</strong> {loanData.totalLoan}
            </p>
            <p>
              <strong>Paid Amount:</strong> {loanData.amountPaid}
            </p>
          </div>
          <button
            onClick={closePopup}
            className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  //
  // 4) ADD LOAN MODE
  //
  if (type === "add-loan") {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
          <h2
            className={`text-3xl font-bold mb-6 text-center ${
              popupSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {popupSuccess ? "Loan Created" : "Error Creating Loan"}
          </h2>
          <p className="mb-4 text-center text-black">{popupMessage}</p>
          <button
            onClick={closePopup}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  //
  // 5) REGISTER / SIGN-IN MODE
  //
  if (type === "register" || type === "sign-in") {
    const handleSubmit = async (e) => {
      e.preventDefault();

      // If already submitting, ignore further taps
      if (isSubmitting) return;

      setIsSubmitting(true);
      setMessage("");

      if (type === "register") {
        if (!userData.name || !userData.email || !userData.mobile_number) {
          setMessage("All fields (name, email, mobile) are required.");
          setIsSubmitting(false);
          return;
        }
      }
      if (!validateMobile(userData.mobile_number)) {
        setMessage("Please enter a valid 10-digit mobile number.");
        setIsSubmitting(false);
        return;
      }

      console.log("Sending user data: ", userData);

      if (type === "register") {
        try {
          const response = await fetch("/api/accounts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: userData.name,
              email: userData.email,
              mobile_number: userData.mobile_number,
            }),
          });

          const data = await response.json();
          if (response.ok) {
            setSuccess(true);
            setMessage("Your account has been created successfully!");
            console.log("Account registration successful");
            setTimeout(() => {
              router.push(`/account?mobileNumber=${userData.mobile_number}`);
            }, 2000);
          } else {
            setSuccess(false);
            setMessage(data.error || "Something went wrong.");
            console.log("Registration error:", data.error || "Unknown error");
          }
        } catch (error) {
          setSuccess(false);
          setMessage("Error: Unable to register.");
          console.error("Registration failed:", error);
        } finally {
          setIsSubmitting(false);
        }
      } else if (type === "sign-in") {
        try {
          const response = await fetch(
            `/api/accounts/fetch?mobileNumber=${userData.mobile_number}`,
            { method: "GET" }
          );
          const data = await response.json();

          if (response.ok) {
            setSuccess(true);
            setMessage("Login successful!");
            console.log("Login successful");
            setTimeout(() => {
              router.push(`/account?mobileNumber=${userData.mobile_number}`);
            }, 2000);
          } else {
            setSuccess(false);
            setMessage("Account not found.");
            console.log("Login error:", data.error || "Unknown error");
          }
        } catch (error) {
          setSuccess(false);
          setMessage("Error: Unable to sign in.");
          console.error("Sign-in failed:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            {type === "register" ? "Register" : "Sign In"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === "register" && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    placeholder="Name"
                    className="w-full p-3 border rounded text-black"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    placeholder="Email"
                    className="w-full p-3 border rounded text-black"
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile_number"
                value={userData.mobile_number}
                placeholder="10-digit Mobile Number"
                className="w-full p-3 border rounded text-black"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full w-full"
            >
              {isSubmitting
                ? "Loading..."
                : type === "register"
                ? "Submit"
                : "Sign In"}
            </button>
          </form>

          <div
            className={`mt-6 text-center font-medium ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>

          <button
            onClick={closePopup}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Close"}
          </button>
        </div>
      </div>
    );
  }

  //
  // 6) FALLBACK (Unrecognized type)
  //
  return null;
};

export default Popup;
