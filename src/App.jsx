import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Banner from "./page/banner";
import Regist from "./page/regist";
import Transfer from "./page/transfer";
import { UserProvider, useUser } from "./context/usercontext";
import LaunchDarklyWrapper from "./LaunchDarklyProvider";
import { useState, useEffect } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";

function AppContent() {
  const { user } = useUser();
  const ldClient = useLDClient();
  const [paymentFlag, setPaymentFlag] = useState(false);

  useEffect(() => {
    async function setContext() {
      if (ldClient && user) {
        await ldClient.identify({
          key: user.ID,
          email: user.email,
        });

        await ldClient.waitUntilReady();
        const flagValue = ldClient.variation("payment-flag", false);
        setPaymentFlag(flagValue);
      }
    }
    setContext();
  }, [user, ldClient]);

  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/banner" className="mr-4">Banner</Link>
        <Link to="/regist">Register</Link>
        {paymentFlag && <Link to="/transfer">Transfer</Link>}
      </nav>

      <Routes>
        <Route path="/banner" element={<Banner />} />
        {paymentFlag && <Route path="/transfer" element={<Transfer />} />}
        <Route path="/regist" element={<Regist />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <LaunchDarklyWrapper>
        <AppContent />
      </LaunchDarklyWrapper>
    </UserProvider>
  );
}

export default App;
