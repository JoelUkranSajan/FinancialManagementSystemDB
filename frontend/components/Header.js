import React from 'react';

const Header = ({ openRegisterPopup, openSignInPopup, openAboutPane }) => {
    return (
        <header className="flex items-start justify-between w-full max-w-6xl mb-6">
            <h1 className="text-3xl font-bold tracking-wide text-white sm:text-4xl">
                Eazy<span className="text-blue-500">Bank</span>
            </h1>
            <nav className="flex gap-4">
                <button
                    onClick={openAboutPane}
                    className="text-sm sm:text-base text-white p-2 hover:underline underline-offset-4"
                >
                    About
                </button>
            </nav>
        </header>
    );
};
export default Header;
