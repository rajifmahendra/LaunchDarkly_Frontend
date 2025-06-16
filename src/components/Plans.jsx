import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://54.179.244.21:4000/api/getQuota");
        setPlans(response.data.available);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="w-full max-w-5xl space-y-6">
      <h2 className="text-xl font-semibold mb-4">Available Data Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <PlanCard key={index} quota={plan.data} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ quota }) {
  // Optional: Generate pricing logic simple
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

export default Plans;
