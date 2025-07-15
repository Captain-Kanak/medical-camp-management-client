import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
