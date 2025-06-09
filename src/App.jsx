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
          country: user.Country,
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
    <div style={{ display: "flex", width: "100%", padding: "16px", backgroundColor: "#E5E7EB" }}>
      {["/banner", "/regist", "/transfer"].map((path) => (
        (path !== "/transfer" || paymentFlag) && (
          <div
            key={path}
            style={{
              flex: 1,
              padding: "16px",
              backgroundColor: location.pathname === path ? "#D1D5DB" : "#374151",
              color: location.pathname === path ? "black" : "white",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              if (location.pathname !== path) {
                e.currentTarget.style.backgroundColor = "#D1D5DB";
                e.currentTarget.style.color = "black";
              }
            }}
            onMouseOut={(e) => {
              if (location.pathname !== path) {
                e.currentTarget.style.backgroundColor = "#374151";
                e.currentTarget.style.color = "white";
              }
            }}
          >
            <Link to={path} style={{ color: "inherit", textDecoration: "none" }}>
              {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          </div>
        )
      ))}
    </div>

      <Routes>
        <Route 
          path="/" 
          element={
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              {user ? <h1>Hello {user.name}</h1> : <h1>Chopenteries</h1>}
            </div>
          
          } 
        />
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
