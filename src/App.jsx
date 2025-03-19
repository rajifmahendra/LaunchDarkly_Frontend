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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome to Our Platform
                </h1>

                {/* UI Dari Backend */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700">{backendMessage}</p>
                </div>

                {/* UI Dari Frontend */}
                {!isReady ? (
                    <div className="text-center p-6 bg-yellow-50 rounded-lg">
                        <h2 className="text-2xl text-yellow-600 flex items-center justify-center gap-2">
                            <span className="animate-spin">🔄</span> 
                            Loading LaunchDarkly...
                        </h2>
                    </div>
                ) : flags?.newDashboard ? (
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                        <h2 className="text-2xl text-green-600 flex items-center justify-center gap-2">
                            🚀 New Dashboard is Enabled! 🚀
                        </h2>
                    </div>
                ) : (
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <h2 className="text-2xl text-blue-600 flex items-center justify-center gap-2">
                            📌 Old Dashboard is Active 📌
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
