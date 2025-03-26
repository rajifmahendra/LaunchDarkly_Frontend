import { createContext, useContext, useState } from "react";

// Buat Context
const UserContext = createContext();

// Provider untuk membungkus aplikasi
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook untuk mengambil nilai dari Context
export function useUser() {
  return useContext(UserContext);
}
