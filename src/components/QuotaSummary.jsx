function QuotaSummary() {
  return (
    <div className="w-full max-w-5xl mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Data Quota</h2>
        <div className="text-3xl font-bold">15.5 GB <span className="text-lg font-normal">/ 30 GB</span></div>
        <div className="w-full bg-gray-200 h-3 rounded mt-2">
          <div className="h-3 bg-blue-500 rounded" style={{ width: "50%" }}></div>
        </div>
      </div>
    </div>
  );
}
export default QuotaSummary;
