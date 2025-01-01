"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import Popup from '../components/Popup';
import AboutPane from '../components/AboutPane';
import "./globals.css";


export default function Home() {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showAboutPane, setShowAboutPane] = useState(false);

  return (
      <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
        <div className="hidden sm:flex flex-1 bg-blue-800 bg-cover bg-center"
             style={{backgroundImage: "url('/BG.jpg')"}}>
        </div>

        <div className="flex-1 flex flex-col justify-start items-start sm:items-start p-8 sm:p-16 gap-10">
          <Header
              openRegisterPopup={() => setShowRegisterPopup(true)}
              openSignInPopup={() => setShowSignInPopup(true)}
              openAboutPane={() => setShowAboutPane(true)}
          />

          <main className="w-full max-w-2xl text-center sm:text-left">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4">
              Welcome to <span className="text-blue-500">EazyBank</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              Manage your accounts, track expenses, and achieve your financial goals with the most user-friendly banking
              experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                  onClick={() => setShowRegisterPopup(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-3 px-6 rounded-full"
              >
                Register
              </button>
              <button
                  onClick={() => setShowSignInPopup(true)}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base py-3 px-6 rounded-full"
              >
                Sign In
              </button>
            </div>
          </main>

          <footer className="mt-12 w-full max-w-2xl text-center sm:text-left">
            <p className="text-sm text-gray-400 mb-4">
              © {new Date().getFullYear()} EazyBank. All rights reserved.
            </p>
          </footer>
        </div>

        {/* Popups */}
        {showRegisterPopup && <Popup type="register" closePopup={() => setShowRegisterPopup(false)}/>}
        {showSignInPopup && <Popup type="sign-in" closePopup={() => setShowSignInPopup(false)}/>}

        {/* About Pane */}
        <AboutPane isVisible={showAboutPane} closePane={() => setShowAboutPane(false)}/>
      </div>
  );
}
