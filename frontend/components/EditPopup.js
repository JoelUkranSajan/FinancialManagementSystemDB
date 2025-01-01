import React, { useState } from "react";

const EditPopup = ({ accountDetails, closePopup, refreshAccountDetails }) => {
    const [updatedDetails, setUpdatedDetails] = useState({
        name: accountDetails.name,
        email: accountDetails.email,
        mobileNumber: accountDetails.mobileNumber,
        accountNumber: accountDetails.accountsDto.accountNumber,
        accountType: accountDetails.accountsDto.accountType,
        branchAddress: accountDetails.accountsDto.branchAddress,
    });
    const [message, setMessage] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("/api/accounts/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedDetails.name,
                    email: updatedDetails.email,
                    mobileNumber: updatedDetails.mobileNumber,
                    accountsDto: {
                        accountNumber: updatedDetails.accountNumber,
                        accountType: updatedDetails.accountType,
                        branchAddress: updatedDetails.branchAddress,
                    },
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Account updated successfully.");
                console.log("Update successful:", data);
                refreshAccountDetails(); // Refresh the account details on the parent component
                closePopup(); // Close the popup
            } else {
                setMessage(data.error || "Something went wrong.");
                console.error("Update failed:", data.error || "Unknown error");
            }
        } catch (error) {
            setMessage("Error: Unable to update account.");
            console.error("Update error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`/api/cards/delete?mobileNumber=${accountDetails.mobileNumber}`, {
                method: "DELETE",
              });
            await fetch(`/api/loans/delete?mobileNumber=${accountDetails.mobileNumber}`, {
                method: "DELETE",
              });
            const response = await fetch(`/api/accounts/delete?mobileNumber=${accountDetails.mobileNumber}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Account deleted successfully.");
                closePopup();
                window.location.href = "/"; // Redirect to homepage
            } else {
                setMessage("Failed to delete the account.");
                console.error("Delete failed.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            {showDeletePopup ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
                    <h2 className="text-xl font-bold mb-4 text-red-600">Delete Account</h2>
                    <p className="text-gray-700 mb-6">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                    <div className="flex justify-between">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                            Confirm Delete
                        </button>
                        <button
                            onClick={() => setShowDeletePopup(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">Edit Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedDetails.name}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedDetails.email}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm">Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={updatedDetails.mobileNumber}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 text-black"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm">Account Type</label>
                                <input
                                    type="text"
                                    name="accountType"
                                    value={updatedDetails.accountType}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm">Branch Address</label>
                                <input
                                    type="text"
                                    name="branchAddress"
                                    value={updatedDetails.branchAddress}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2 text-black"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4 text-center text-red-500">{message}</div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={closePopup}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowDeletePopup(true)}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
                        >
                            Delete Account
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditPopup;
