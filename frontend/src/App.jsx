import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PastSearches from "./PastSearches"
import Classify from "./Classify";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Classify />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/past-searches" element={<PastSearches />} />
        <Route path="/Classify" element={<Classify />} />
      </Routes>
    </>
  );
};

export default App;
