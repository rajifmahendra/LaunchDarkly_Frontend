import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // Pastikan file ini ada
import Banner from "./page/banner";
import Regist from "./page/regist"; // Pastikan file ini ada
import Transfer from "./page/transfer";

function App() {
  return (
    <UserProvider>
      <Router>
        <nav className="p-4 bg-gray-200">
          <Link to="/banner" className="mr-4">Banner</Link>
          <Link to="/regist">Register</Link>
          <Link to="/transfer">Transfer</Link>
        </nav>

        <Routes>
          <Route path="/banner" element={<Banner />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/regist" element={<Regist/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
