import React from "react";

const AboutPane = ({ isVisible, closePane }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    <h2 className="text-2xl mb-4 text-blue-500">About EazyBank</h2>
    
    <p className="mb-4 text-sm text-black">
      EazyBank is a modern, user-friendly platform built to simplify your financial life.
      Open and manage multiple accounts, apply for loans, and track your expenses with ease.
    </p>

    <p className="mb-4 text-sm text-black">
      We also provide secure card services, enabling you to make purchases and payments quickly
      while keeping track of every transaction. Our 24/7 support ensures that help is always
      available when you need it.
    </p>

    <p className="mb-4 text-sm text-black">
      Whether you want to save for the future, handle your daily transactions, or secure a loan,
      EazyBank aims to give you the tools you need to achieve your financial goals—all in one place.
    </p>

    <button
      onClick={closePane}
      className="bg-blue-500 text-white py-2 px-4 rounded-full w-full"
    >
      Close
    </button>
  </div>
</div>

  );
};

export default AboutPane;
