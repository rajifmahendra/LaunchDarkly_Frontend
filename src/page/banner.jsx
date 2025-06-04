import { useEffect, useState } from "react";

function Banner() {
    
const [bannerVersion, setBannerVersion] = useState("A");

// Generate user key unik untuk setiap pengguna
useEffect(() => {
    let userKey = localStorage.getItem("user-key");
    if (!userKey) {
        userKey = `user-${Math.floor(Math.random() * 10000)}`; // Buat user key acak
        localStorage.setItem("user-key", userKey);
    }

    fetch(`http://localhost:3000/promo-banner-version?user=${userKey}`)
        .then(res => res.json())
        .then(data => setBannerVersion(data.bannerVersion))
        .catch(err => console.error("Error fetching feature flag:", err));
}, []);

return (
    <div>
        <h1>Welcome to Our Website</h1>

        {/* Banner berdasarkan varian */}
        <div
            style={{
                background: bannerVersion === "B" ? "yellow" : "lightblue",
                padding: "15px",
                textAlign: "center",
                fontSize: "20px",
                color: "black",
            }}
        >
            🎉 Special Promo Version {bannerVersion} is Live Now! 🎉
        </div>
    </div>
);
}

export default Banner;
