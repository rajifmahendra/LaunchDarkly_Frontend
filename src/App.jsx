import { Routes, Route } from 'react-router-dom';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import QuotaSummary from './components/QuotaSummary';
import Plans from './components/Plans';
import FeatureDisabled from './components/FeatureDisabled';
import LoadingState from './components/LoadingState';
import FormPembelian from './components/FormPembelian';

function App() {
  const flags = useFlags();
  const ldClient = useLDClient();
  const [isReady, setIsReady] = useState(false);
  const [kuotaFlag, setKuotaFlag] = useState(false);

  useEffect(() => {
    if (ldClient) {
      ldClient.waitForInitialization().then(() => setIsReady(true));

      const handleChange = () => {
        const updatedFlags = ldClient.allFlags();
        setKuotaFlag(updatedFlags['fe-kouta-internet']);
      };

      ldClient.on('change:fe-kouta-internet', handleChange);
      handleChange();

      return () => ldClient.off('change:fe-kouta-internet', handleChange);
    }
  }, [ldClient]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      <Header />
      <Routes>
        <Route path="/" element={
          !isReady ? <LoadingState /> : kuotaFlag ? (
            <>
              <QuotaSummary />
              <Plans />
            </>
          ) : <FeatureDisabled />
        } />
        <Route path="/buy/:kuota" element={<FormPembelian />} />
      </Routes>
    </div>
  );
}

export default App;
