import { LDProvider } from 'launchdarkly-react-client-sdk';

const LaunchDarklyProvider = ({ children }) => {
  const context = {
    kind: 'user',
    key: 'browser-user',
    name: 'Guest User',
  };

  return (
    <LDProvider
      clientSideID={import.meta.env.VITE_LD_CLIENT_ID}
      context={context}
      options={{
        streaming: true,
        useCamelCaseFlagKeys: true,  // kunci stabil flag key mapping
        bootstrap: "localStorage",
      }}
    >
      {children}
    </LDProvider>
  );
};

export default LaunchDarklyProvider;