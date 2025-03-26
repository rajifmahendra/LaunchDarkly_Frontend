import { withLDProvider } from "launchdarkly-react-client-sdk";

const LaunchDarklyWrapper = ({ children }) => {


  const LaunchDarklyProvider = withLDProvider({
    clientSideID: import.meta.env.VITE_LD_CLIENT_ID,
    user: { anonymous: true },
    options: { streaming: true },
  })(({ children }) => children);


  return <LaunchDarklyProvider>{children}</LaunchDarklyProvider>;
};

export default LaunchDarklyWrapper;
