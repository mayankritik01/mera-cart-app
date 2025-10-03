import React, { createContext, useState } from 'react'; // useEffect hata diya gaya

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const localData = localStorage.getItem('userInfo');
    return localData ? JSON.parse(localData) : null;
  });

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    setUserInfo(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;