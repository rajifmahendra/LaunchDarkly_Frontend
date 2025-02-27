import { withLDProvider } from "launchdarkly-react-client-sdk";

const LaunchDarklyProvider = withLDProvider({
  clientSideID: import.meta.env.VITE_LD_CLIENT_ID, // Client-Side ID dari .env
  user: {
    key: "browser-user", // Bisa diganti dengan ID user dari auth system
    name: "Guest User",
  },
  options: { streaming: true }, // Streaming agar update real-time
})(({ children }) => children);

export default LaunchDarklyProvider;
