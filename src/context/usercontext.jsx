import { createContext, useContext, useState } from "react";

// Buat Context
const UserContext = createContext();

// Provider untuk membungkus aplikasi
export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook untuk mengambil nilai dari Context
export function useUser() {
  return useContext(UserContext);
}
