import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

function Plans() {
  const [plans, setPlans] = useState([]);
  const flags = useFlags();
  const ldClient = useLDClient();

  const disable100GB = flags?.disable100gbPlan;
  const globalKuotaFlag = flags?.feKoutaInternet;
  const showMalaysiaPremium = flags?.flagPremiumMalaysia;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://13.229.82.178:4000/api/getQuota");
        let availablePlans = response.data.available;

        if (globalKuotaFlag === false) {
          availablePlans = [];
        } else if (disable100GB === true) {
          availablePlans = availablePlans.filter(plan => plan.data !== "100GB");
        }

        setPlans(availablePlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };

    fetchPlans();
  }, [disable100GB, globalKuotaFlag]);

  return (
    <div className="w-full max-w-5xl space-y-10">
      {/* Malaysia Promo Section */}
      {showMalaysiaPremium && (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">🇲🇾 Malaysia Promo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PromoCard
              title="Unlimited Plan"
              subtitle="Special Access"
              data="∞ GB"
              path="unlimited"
            />
            <PromoCard
              title="Promo 150GB"
              subtitle="Promo Spesial Malaysia"
              data="150 GB"
              path="150gb"
            />
          </div>
        </div>
      )}

      {/* Available Data Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Data Plans</h2>
        {plans.length === 0 ? (
          <div className="text-center text-red-500 font-semibold text-lg">
            Tidak ada data plan tersedia
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans
              .filter(plan => plan.data !== "150GB")
              .map((plan, index) => (
                <PlanCard key={index} quota={plan.data} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlanCard({ quota }) {
  const priceMap = {
    "2GB": "$3",
    "5GB": "$5",
    "10GB": "$10",
    "30GB": "$20",
    "50GB": "$30",
    "100GB": "$50"
  };
  const price = priceMap[quota] || "$0";

  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold mb-3">{quota} Package</h3>
        <div className="text-blue-600 font-bold text-2xl mb-1">{quota}</div>
        <div className="font-semibold mb-3">{price}</div>
      </div>
      <Link to={`/buy/${quota}`}>
        <button className="bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition w-full">
          Buy Plan
        </button>
      </Link>
    </div>
  );
}

function PromoCard({ title, subtitle, data, path }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold text-green-600">{title}</h4>
        <p className="mt-2 text-2xl font-semibold">{data}</p>
        <p className="text-gray-500 mb-3">{subtitle}</p>
      </div>
      <Link to={`/buy/${path}`}>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Beli Promo
        </button>
      </Link>
    </div>
  );
}

export default Plans;
