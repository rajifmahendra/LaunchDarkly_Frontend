function Header() {
  return (
    <div className="w-full max-w-5xl mb-6">
      <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold">ConnectOn</h1>
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full w-3 h-3 animate-pulse"></div>
          <span>rajif</span>
        </div>
      </div>
    </div>
  );
}
export default Header;
