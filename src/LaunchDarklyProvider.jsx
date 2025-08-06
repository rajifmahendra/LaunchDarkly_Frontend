import { useEffect, useState } from 'react';
import { LDProvider } from 'launchdarkly-react-client-sdk';
import axios from 'axios';

const LaunchDarklyProvider = ({ children }) => {
  const [context, setContext] = useState(null);

  useEffect(() => {
  const fetchContext = async () => {
    try {
      let country = 'Unknown';

      try {
        const res = await axios.get('https://api.country.is');
        country = res.data.country_name || 'Unknown';
      } catch (err) {
        console.warn('🌐 IP lookup failed, using default country.');
      }

      const ua = navigator.userAgent;
      let device = 'Unknown';
      if (ua.includes('Edg')) device = 'Edge';
      else if (ua.includes('Chrome')) device = 'Chrome';
      else if (ua.includes('Safari') && !ua.includes('Chrome')) device = 'Safari';

      const fullContext = {
        kind: 'user',
        key: 'browser-user',
        name: 'Guest User',
        country,
        custom: { device }
      };

      console.log("🧠 LaunchDarkly context:", fullContext);
      setContext(fullContext);
    } catch (err) {
      console.error('❌ Failed to detect context:', err);
    }
  };

  fetchContext();
}, []);

  if (!context) return null;

  return (
    <LDProvider
      clientSideID={import.meta.env.VITE_LD_CLIENT_ID}
      context={context}
      options={{
        streaming: true,
        bootstrap: 'none',
        useCamelCaseFlagKeys: true
      }}
    >
      {children}
    </LDProvider>
  );
};

export default LaunchDarklyProvider;
