"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditPopup from "@/components/EditPopup";
import Popup from "@/components/Popup";
import "../app/globals.css";

const Account = () => {
  const router = useRouter();
  const { mobileNumber } = router.query;

  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit Account Popup
  const [showEditPopup, setShowEditPopup] = useState(false);

  // Cards State
  const [showAddCardPopup, setShowAddCardPopup] = useState(false);
  const [addCardMessage, setAddCardMessage] = useState("");
  const [addCardSuccess, setAddCardSuccess] = useState(false);

  const [showViewCardPopup, setShowViewCardPopup] = useState(false);
  const [cardData, setCardData] = useState(null);

  // Loans State
  const [showAddLoanPopup, setShowAddLoanPopup] = useState(false);
  const [addLoanMessage, setAddLoanMessage] = useState("");
  const [addLoanSuccess, setAddLoanSuccess] = useState(false);

  const [showViewLoanPopup, setShowViewLoanPopup] = useState(false);
  const [loanData, setLoanData] = useState(null);

  // Action Loading (for showing loader/spinner)
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        console.log("Fetching account details...");
        setLoading(true);
        const response = await fetch(`/api/accounts/fetch?mobileNumber=${mobileNumber}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setAccountDetails(data);
        setLoading(false);
        console.log("Account details fetched successfully.");
      } catch (err) {
        console.error("Failed to fetch account details:", err);
        setError("Failed to fetch account details. Please try again later.");
        setLoading(false);
      }
    };

    if (mobileNumber) {
      fetchAccount();
    }
  }, [mobileNumber]);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      setIsActionLoading(true);
      alert("You have been logged out successfully.");
      router.push("/");
      console.log("Logout action completed.");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      return;
    }
    try {
      console.log("Deleting account (with card & loan)...");
      setIsActionLoading(true);

      await fetch(`/api/cards/delete?mobileNumber=${mobileNumber}`, {
        method: "DELETE",
      });
      await fetch(`/api/loans/delete?mobileNumber=${mobileNumber}`, {
        method: "DELETE",
      });
      const response = await fetch(`/api/accounts/delete?mobileNumber=${mobileNumber}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        router.push("/");
        console.log("Account deletion successful.");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete account.");
        console.error("Account deletion failed with error:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("An error occurred while deleting the account.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // -------------------- Cards --------------------
  const handleAddCard = async () => {
    try {
      console.log("Adding new card...");
      setIsActionLoading(true);
      const response = await fetch(`/api/cards/create?mobileNumber=${mobileNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        setAddCardMessage(data.message || "Card created successfully!");
        setAddCardSuccess(true);
        console.log("Card creation successful:", data);
      } else {
        setAddCardMessage(data.errorMessage || "Failed to create card. Please try again.");
        setAddCardSuccess(false);
        console.error("Card creation failed:", data.errorMessage || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding card:", error);
      setAddCardMessage("Something went wrong. Please try again.");
      setAddCardSuccess(false);
    } finally {
      setShowAddCardPopup(true);
      setIsActionLoading(false);
    }
  };

  const handleViewCards = async () => {
    try {
      console.log("Viewing cards...");
      setIsActionLoading(true);
      const response = await fetch(`/api/cards/get?mobileNumber=${mobileNumber}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Card details fetched:", data);
        setCardData(data);
        setShowViewCardPopup(true);
      } else if (response.status === 404) {
        alert("No cards found for the given mobile number.");
        console.error("404: No cards found.");
      } else {
        alert(data.error || "Failed to fetch card details.");
        console.error("Failed to fetch card details:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteCards = async () => {
    try {
      console.log("Deleting card...");
      setIsActionLoading(true);
      const response = await fetch(`/api/cards/delete?mobileNumber=${mobileNumber}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Card deletion successful.");
        alert("Card Deleted Successfully!");
      } else if (response.status === 404) {
        alert("No cards found for the given mobile number.");
        console.error("404: Card not found.");
      } else {
        console.error("Failed to delete card:", data.error || "Unknown error");
        alert(data.error || "Failed to delete card.");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("An error occurred while deleting the card.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // -------------------- Loans --------------------
  const handleAddLoan = async () => {
    try {
      console.log("Creating loan...");
      setIsActionLoading(true);
      const response = await fetch(`/api/loans/create?mobileNumber=${mobileNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        setAddLoanMessage(data.message || "Loan created successfully!");
        setAddLoanSuccess(true);
        console.log("Loan creation successful:", data);
      } else if (response.status === 404) {
        alert("No loans found for the given mobile number.");
        console.error("404: Loans not found.");
      } else {
        setAddLoanMessage(data.error || "Failed to create loan. Please try again.");
        setAddLoanSuccess(false);
        console.error("Loan creation failed:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error creating loan:", error);
      setAddLoanMessage("Something went wrong. Please try again.");
      setAddLoanSuccess(false);
    } finally {
      setShowAddLoanPopup(true);
      setIsActionLoading(false);
    }
  };

  const handleViewLoan = async () => {
    try {
      console.log("Viewing loan...");
      setIsActionLoading(true);
      const response = await fetch(`/api/loans/get?mobileNumber=${mobileNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "eazybank-correlation-id": "1",
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Loan details fetched:", data);
        setLoanData(data);
        setShowViewLoanPopup(true);
      } else if (response.status === 404) {
        alert("No loans found for the given mobile number.");
        console.error("404: No loans found.");
      } else {
        alert(data.error || "Failed to fetch loan details.");
        console.error("Failed to fetch loan details:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching loan details:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteLoan = async () => {
    if (!confirm("Are you sure you want to delete your loan?")) {
      return;
    }
    try {
      console.log("Deleting loan...");
      setIsActionLoading(true);
      const response = await fetch(`/api/loans/delete?mobileNumber=${mobileNumber}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Loan deleted successfully.");
        console.log("Loan deletion successful.");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete loan.");
        console.error("Loan deletion failed:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting loan:", error);
      alert("An error occurred while deleting the loan.");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading account details...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return accountDetails ? (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative">
      <header className="bg-blue-800 py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">EazyBank</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowEditPopup(true)}
            className="text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded"
            disabled={isActionLoading}
          >
            {isActionLoading ? "Processing..." : "Settings"}
          </button>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
            disabled={isActionLoading}
          >
            {isActionLoading ? "Processing..." : "Logout"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12">
        <div className="bg-gray-800 p-6 sm:p-10 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Account Details</h2>

          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-lg font-semibold">{accountDetails.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg font-semibold">{accountDetails.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Mobile Number</p>
              <p className="text-lg font-semibold">{accountDetails.mobileNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Account Number</p>
              <p className="text-lg font-semibold">
                {accountDetails.accountsDto.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Account Type</p>
              <p className="text-lg font-semibold">
                {accountDetails.accountsDto.accountType}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Branch Address</p>
              <p className="text-lg font-semibold">
                {accountDetails.accountsDto.branchAddress}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-300 mb-2">Card Actions</h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleAddCard}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full text-lg"
                disabled={isActionLoading}
              >
                {isActionLoading ? "Processing..." : "Add New Card"}
              </button>
              <button
                onClick={handleViewCards}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded w-full text-lg"
                disabled={isActionLoading}
              >
                {isActionLoading ? "Processing..." : "View Card"}
              </button>
              <button
                onClick={handleDeleteCards}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full text-lg"
                disabled={isActionLoading}
              >
                {isActionLoading ? "Processing..." : "Delete Card"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-blue-300 mb-2">Loan Actions</h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleAddLoan}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full text-lg"
                disabled={isActionLoading}
              >
                {isActionLoading ? "Processing..." : "Create Loan"}
              </button>
              <button
                onClick={handleViewLoan}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded w-full text-lg"
                disabled={isActionLoading}
              >
                {isActionLoading ? "Processing..." : "View Loan"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} EazyBank. All rights reserved.
      </footer>

      {showEditPopup && (
        <EditPopup
          accountDetails={accountDetails}
          closePopup={() => setShowEditPopup(false)}
          refreshAccountDetails={() => router.reload()}
        />
      )}

      {showAddCardPopup && (
        <Popup
          type="add-card"
          popupMessage={addCardMessage}
          popupSuccess={addCardSuccess}
          closePopup={() => {
            setShowAddCardPopup(false);
            setAddCardMessage("");
          }}
        />
      )}

      {showViewCardPopup && cardData && (
        <Popup
          type="view-cards"
          cardData={cardData}
          closePopup={() => {
            setShowViewCardPopup(false);
            setCardData(null);
          }}
        />
      )}

      {showAddLoanPopup && (
        <Popup
          type="add-loan"
          popupMessage={addLoanMessage}
          popupSuccess={addLoanSuccess}
          closePopup={() => {
            setShowAddLoanPopup(false);
            setAddLoanMessage("");
          }}
        />
      )}

      {showViewLoanPopup && loanData && (
        <Popup
          type="view-loan"
          loanData={loanData}
          closePopup={() => {
            setShowViewLoanPopup(false);
            setLoanData(null);
          }}
        />
      )}

      {isActionLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center text-gray-400 mt-10">Account not found.</div>
  );
};

export default Account;
