import { useEffect, useState } from "react";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

function App() {
    const flags = useFlags(); // Ambil semua flags dari LaunchDarkly
    const ldClient = useLDClient();
    const [backendMessage, setBackendMessage] = useState("");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (ldClient) {
            ldClient.waitForInitialization().then(() => {
                setIsReady(true);
            });
        }

        fetch("http://localhost:3000/dashboard?user=browser-user")
            .then(res => res.json())
            .then(data => setBackendMessage(data.dashboard))
            .catch(err => console.error("Error fetching feature flag:", err));
    }, [ldClient]);

    console.log("Feature Flags from LaunchDarkly:", flags);
    console.log("Flags received:", Object.keys(flags));
    console.log("Value of newDashboard flag:", flags?.newDashboard);

    return (
        <div>
            <h1>Welcome to Our Platform</h1>

            {/* UI Dari Backend */}
            <p>{backendMessage}</p>

            {/* UI Dari Frontend */}
            {!isReady ? (
                <h2>🔄 Loading LaunchDarkly...</h2>
            ) : flags?.newDashboard ? (
                <h2>🚀 New Dashboard is Enabled! 🚀</h2>
            ) : (
                <h2>📌 Old Dashboard is Active 📌</h2>
            )}
        </div>
    );
}

export default App;
