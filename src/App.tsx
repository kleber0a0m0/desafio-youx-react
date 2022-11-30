import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Menu from "./components/Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientsList from "./pages/ClientsList";
import SalesList from "./pages/SalesList";
import Reports from "./pages/Reports";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <ToastContainer />
      <Menu />
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
}

export default App;
