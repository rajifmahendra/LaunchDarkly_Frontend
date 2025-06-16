function Plans() {
  return (
    <div className="w-full max-w-5xl space-y-6">
      <h2 className="text-xl font-semibold mb-4">Available Data Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlanCard title="Daily Spark" desc="Perfect for a day of light browsing." quota="1 GB" price="$2" duration="24 Hours" />
        <PlanCard title="Weekly Connect" desc="Stay connected through the week." quota="7 GB" price="$10" duration="7 Days" />
        <PlanCard title="Monthly Max" desc="Heavy usage? This is for you." quota="30 GB" price="$30" duration="30 Days" />
      </div>
    </div>
  );
}

function PlanCard({ title, desc, quota, price, duration }) {
  return (
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
}
export default Plans;
