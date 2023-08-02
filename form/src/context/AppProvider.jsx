import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  return (
    <AppContext.Provider value={{ blogs, setBlogs, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
