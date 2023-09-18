// CookieManager.js

import React, { useState } from 'react';
import { Cookies } from 'universal-cookie';

const CookieManager = () => {
  const [cookieName, setCookieName] = useState('');
  const [cookieValue, setCookieValue] = useState('');
  const cookies = new Cookies();

  const handleSetCookie = () => {
    // Set a new cookie
    cookies.set(cookieName, cookieValue, { path: '/' });
  };

  const handleRemoveCookie = (name) => {
    // Remove a cookie
    cookies.remove(name, { path: '/' });
  };

  return (
    <div>
      <h2>Cookie Management</h2>
      <div>
        <input
          type="text"
          placeholder="Cookie Name"
          value={cookieName}
          onChange={(e) => setCookieName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cookie Value"
          value={cookieValue}
          onChange={(e) => setCookieValue(e.target.value)}
        />
        <button onClick={handleSetCookie}>Set Cookie</button>
      </div>
      <div>
        <h3>Active Cookies</h3>
        <ul>
          {Object.keys(cookies.getAll()).map((name) => (
            <li key={name}>
              {name}: {cookies.get(name)}
              <button onClick={() => handleRemoveCookie(name)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CookieManager;
