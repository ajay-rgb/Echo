

import React, { createContext, useState, useEffect } from 'react';
const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseApi = (apiUrl || '').replace(/\/+$|\/$/g, '').replace(/\/+$/, '');

  // This effect runs once when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`${baseApi}/api/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      };
      fetchUserProfile();
    }
  }, [baseApi]);

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
