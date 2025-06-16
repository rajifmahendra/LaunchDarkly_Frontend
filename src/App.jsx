import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect, useState } from 'react';

function App() {
  const flags = useFlags();
  const ldClient = useLDClient();
  const [isReady, setIsReady] = useState(false);
  const [kuotaFlag, setKuotaFlag] = useState(false);

  useEffect(() => {
    if (ldClient) {
      ldClient.waitForInitialization().then(() => {
        setIsReady(true);
      });

      const handleChange = () => {
        const updatedFlags = ldClient.allFlags();
        setKuotaFlag(updatedFlags['fe-kouta-internet']);
      };

      ldClient.on('change:fe-kouta-internet', handleChange);
      handleChange();

      return () => {
        ldClient.off('change:fe-kouta-internet', handleChange);
      };
    }
  }, [ldClient]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
      <Header />
      {isReady ? (
        kuotaFlag ? <DataPlansUI /> : <FeatureDisabled />
      ) : (
        <LoadingState />
      )}
    </div>
  );
}

const Header = () => (
  <div className="w-full max-w-5xl mb-6">
    <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-lg shadow">
      <h1 className="text-xl font-bold">ConnectOn</h1>
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-full w-3 h-3 animate-pulse"></div>
        <span>Connected</span>
      </div>
    </div>
  </div>
);

const DataPlansUI = () => (
  <div className="w-full max-w-5xl space-y-6">

    {/* Quota */}
    <div className="flex justify-between bg-white p-6 rounded-lg shadow items-center">
      <div>
        <h2 className="text-lg font-semibold mb-1">Data Quota</h2>
        <div className="text-3xl font-bold">15.5 GB <span className="text-lg font-normal">/ 30 GB</span></div>
        <div className="w-full bg-gray-200 h-3 rounded mt-2">
          <div className="h-3 bg-blue-500 rounded" style={{ width: "50%" }}></div>
        </div>
      </div>
    </div>

    {/* Plans */}
    <h2 className="text-xl font-semibold">Available Data Plans</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PlanCard title="Daily Spark" desc="Perfect for a day of light browsing." quota="1 GB" price="$2" duration="24 Hours" />
      <PlanCard title="Weekly Connect" desc="Stay connected through the week." quota="7 GB" price="$10" duration="7 Days" />
      <PlanCard title="Monthly Max" desc="Heavy usage? This is for you." quota="30 GB" price="$30" duration="30 Days" />
    </div>

  </div>
);

const PlanCard = ({ title, desc, quota, price, duration }) => (
  <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{desc}</p>
      <div className="text-blue-600 font-bold text-2xl mb-1">{quota}</div>
      <p className="text-sm text-gray-500 mb-3">/ {duration}</p>
      <div className="font-semibold mb-3">{price}</div>
    </div>
    <button className="bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition">Buy Plan</button>
  </div>
);

const FeatureDisabled = () => (
  <div className="flex flex-col justify-center items-center mt-32">
    <h2 className="text-red-500 text-3xl font-bold">🚫 Kuota Internet Feature DISABLED</h2>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col justify-center items-center mt-32">
    <h2 className="text-blue-500 text-2xl font-bold">Loading LaunchDarkly...</h2>
  </div>
);

export default App;
