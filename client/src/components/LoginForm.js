// src/components/LoginForm.js

import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 실제 Firebase 인증 로직을 구현하거나 모의 로그인을 수행하세요.
    onLogin(); // 성공적인 로그인 후에 호출
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm p-4 mx-auto mt-10 border rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
