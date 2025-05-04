import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </UserProvider>
  );
}

export default App;
