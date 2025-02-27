import { withLDProvider } from "launchdarkly-react-client-sdk";

const LaunchDarklyProvider = withLDProvider({
  clientSideID: import.meta.env.VITE_LD_CLIENT_ID, // Ambil dari .env
  user: {
    key: "browser-user", // Sesuaikan dengan user yang digunakan di backend
    name: "Guest User",
  },
  options: { 
    streaming: true, 
    bootstrap: "localStorage", // Cache lokal untuk mempercepat
  },
})(({ children }) => children);

export default LaunchDarklyProvider;
