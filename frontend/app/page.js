"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Popup from "../components/Popup";
import AboutPane from "../components/AboutPane";
import "./globals.css";

export default function Home() {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showAboutPane, setShowAboutPane] = useState(false);

  // Loading states for each button
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const handleRegisterClick = () => {
    // Prevent multiple taps by ignoring clicks if already loading
    if (isRegisterLoading) return;
    setIsRegisterLoading(true);
    setShowRegisterPopup(true);
  };

  const handleSignInClick = () => {
    if (isSignInLoading) return;
    setIsSignInLoading(true);
    setShowSignInPopup(true);
  };

  // When the popups are closed, reset the loading states
  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
    setIsRegisterLoading(false);
  };

  const closeSignInPopup = () => {
    setShowSignInPopup(false);
    setIsSignInLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
      <div
        className="hidden sm:flex flex-1 bg-blue-800 bg-cover bg-center"
        style={{ backgroundImage: "url('/BG.jpg')" }}
      />

      <div className="flex-1 flex flex-col justify-start items-start sm:items-start p-8 sm:p-16 gap-10">
        <Header
          openRegisterPopup={handleRegisterClick}
          openSignInPopup={handleSignInClick}
          openAboutPane={() => setShowAboutPane(true)}
        />

        <main className="w-full max-w-2xl text-center sm:text-left">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4">
            Welcome to <span className="text-blue-500">EazyBank</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Manage your accounts, track expenses, and achieve your financial goals with the most
            user-friendly banking experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRegisterClick}
              disabled={isRegisterLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-3 px-6 rounded-full"
            >
              {isRegisterLoading ? "Loading..." : "Register"}
            </button>
            <button
              onClick={handleSignInClick}
              disabled={isSignInLoading}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base py-3 px-6 rounded-full"
            >
              {isSignInLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>

        <footer className="mt-12 w-full max-w-2xl text-center sm:text-left">
          <p className="text-sm text-gray-400 mb-4">
            © {new Date().getFullYear()} EazyBank. All rights reserved.
          </p>
        </footer>
      </div>

      {showRegisterPopup && (
        <Popup
          type="register"
          closePopup={closeRegisterPopup}
        />
      )}
      {showSignInPopup && (
        <Popup
          type="sign-in"
          closePopup={closeSignInPopup}
        />
      )}

      <AboutPane
        isVisible={showAboutPane}
        closePane={() => setShowAboutPane(false)}
      />
    </div>
  );
}
