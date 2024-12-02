// src/App.js

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import LoanGrid from './components/LoanGrid';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar />
      <main className="container p-4 mx-auto">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
            >
              Logout
            </button>
            <LoanGrid />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
